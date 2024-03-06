import { notifications } from '@mantine/notifications'

export function showError(message: string, autoClose = 8000) {
  notifications.show({
    title: 'Error',
    message,
    color: 'red',
    withBorder: true,
    withCloseButton: true,
    autoClose,
  })
}