import { TextInput, Tooltip, Checkbox, Group, ActionIcon, Tabs, Popover, Button, Select, rem } from '@mantine/core'
import { IconMeteor } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { api } from '@/utils/api'
import { useContentStore } from '@/store/use-content-store'
import { showError } from '@/utils/notifications'
import { useDidUpdate, useLocalStorage, usePrevious, useSetState } from '@mantine/hooks'

interface FormValues {
  url: string
  withMobileDevice: boolean
  withProxy: boolean
  withJSRendering: boolean
  source: string
  target: string
}

const languagesOptions = [
  { value: 'ru', label: 'Russian' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'French' },
  { value: 'it', label: 'Italian' },
]

export function ContentForm() {
  const { t } = useTranslation('common')
  const contentStore = useContentStore()
  const [formLanguagesStored, setFormLanguagesStored] = useLocalStorage<Pick<FormValues, 'source' | 'target'>>({
    key: 'content-form-languages',
    defaultValue: {
      source: 'en',
      target: 'ru',
    },
  })
  const [formValues, setFormValues] = useSetState<FormValues>({
    url: '',
    withMobileDevice: false,
    withProxy: false,
    withJSRendering: false,
    source: 'en',
    target: 'ru',
  })
  const previousFormValues = usePrevious(formValues)

  /**
   * If the source and target language are the same, switch them
   */
  useDidUpdate(() => {
    if (previousFormValues?.source !== formValues.source && formValues.source === formValues.target) {
      setFormValues({ target: previousFormValues?.source })
    } else if (previousFormValues?.target !== formValues.target && formValues.source === formValues.target) {
      setFormValues({ source: previousFormValues?.target })
    }

    if (formValues.source !== formValues.target) {
      setFormLanguagesStored({
        source: formValues.source,
        target: formValues.target,
      })
    }
  }, [formValues.source, formValues.target])

  useDidUpdate(() => {
    if (formLanguagesStored.source !== formValues.source || formLanguagesStored.target !== formValues.target) {
      setFormValues({
        source: formLanguagesStored.source,
        target: formLanguagesStored.target,
      })
    }
  }, [formLanguagesStored])

  const mutation = api.content.fetchContent.useMutation({
    onSuccess(data) {
      contentStore.setContentWithTranslation({
        ...data,
        sourceLanguage: formValues.source,
        targetLanguage: formValues.target,
      })
    },
    onError(err) {
      const zodFieldErrors = err?.data?.zodError?.fieldErrors

      if (typeof zodFieldErrors === 'object') {
        for (const fieldName in zodFieldErrors) {
          showError(zodFieldErrors[fieldName]?.[0] ?? t('status.unknownError'))
        }
      }
    },
  })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutation.mutate({
      url: formData.get('url') as string,
    } as FormValues)
  }

  return (
    <Tabs variant="outline" defaultValue="simple">
      {/*<Tabs.List>*/}
      {/*  <Tabs.Tab value="simple">{t('contentForm.tabs.simple')}</Tabs.Tab>*/}
      {/*  <Tabs.Tab value="smart">{t('contentForm.tabs.smart')}</Tabs.Tab>*/}
      {/*</Tabs.List>*/}

      <Tabs.Panel value="simple">
        <form onSubmit={onSubmit}>
          <TextInput
            name="url"
            size="xl"
            placeholder={`https://...`}
            rightSection={
              <ActionIcon
                type="submit"
                size="xl"
                loaderProps={{ type: 'dots' }}
                loading={mutation.isLoading}
                disabled={mutation.isLoading}
              >
                <IconMeteor stroke={1.5} />
              </ActionIcon>
            }
            onChange={(event) => setFormValues({ url: event.currentTarget.value })}
          />
          <Group mt={rem(4)}>
            <Popover width={300} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button variant="transparent" color="gray" style={{ fontFamily: 'monospace, monospace' }}>
                  {formValues.source} → {formValues.target}
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Group grow>
                  <Select
                    label={t('contentForm.sourceLanguageLabel')}
                    placeholder={t('forms.selectPlaceholder')}
                    data={languagesOptions}
                    comboboxProps={{ withinPortal: false }}
                    value={formValues.source ? formValues.source : null}
                    onChange={(_value, option) => setFormValues({ source: option.value })}
                  />
                  <Select
                    label={t('contentForm.targetLanguageLabel')}
                    placeholder={t('forms.selectPlaceholder')}
                    data={languagesOptions}
                    comboboxProps={{ withinPortal: false }}
                    value={formValues.target ? formValues.target : null}
                    onChange={(_value, option) => setFormValues({ target: option.value })}
                  />
                </Group>
              </Popover.Dropdown>
            </Popover>

            <Tooltip label={t('contentForm.options.withJSRendering')} refProp="rootRef">
              <Checkbox
                label={t('contentForm.options.withJSRenderingLabel')}
                name="withJSRendering"
                checked={formValues.withJSRendering}
                onChange={(event) => setFormValues({ withJSRendering: event.currentTarget.checked })}
              />
            </Tooltip>
            <Tooltip label={t('contentForm.options.withProxy')} refProp="rootRef">
              <Checkbox
                label={t('contentForm.options.withProxyLabel')}
                name="withProxy"
                checked={formValues.withProxy}
                onChange={(event) => setFormValues({ withProxy: event.currentTarget.checked })}
              />
            </Tooltip>
            <Tooltip label={t('contentForm.options.withMobileDevice')} refProp="rootRef">
              <Checkbox
                label={t('contentForm.options.withMobileDeviceLabel')}
                name="withMobileDevice"
                checked={formValues.withMobileDevice}
                onChange={(event) => setFormValues({ withMobileDevice: event.currentTarget.checked })}
              />
            </Tooltip>
          </Group>
        </form>
      </Tabs.Panel>

      <Tabs.Panel value="smart">Messages tab content</Tabs.Panel>
    </Tabs>
  )
}
