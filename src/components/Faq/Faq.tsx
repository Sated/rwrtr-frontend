import { Accordion } from '@mantine/core'
import s from './Faq.module.scss'
import { useTranslation } from 'next-i18next'

export function Faq() {
  const { t } = useTranslation('common')
  const questions: Array<{ title: string; text: string }> = t('faq.items', { returnObjects: true })

  return (
    <Accordion variant="separated">
      {questions.map((item) => (
        <Accordion.Item className={s.item} key={item.title} value={item.title}>
          <Accordion.Control>{item.title}</Accordion.Control>
          <Accordion.Panel>{item.text}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
