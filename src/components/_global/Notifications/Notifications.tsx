import { Notifications as MantineNotifications  } from '@mantine/notifications'
import s from './Notifications.module.scss'

export function Notifications() {
  return <MantineNotifications classNames={{ description: s.description }} />
}