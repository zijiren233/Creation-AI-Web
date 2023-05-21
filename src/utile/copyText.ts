import useClipboard from 'vue-clipboard3'
import { useNotificationStore } from '@/stores/notification'

const { toClipboard } = useClipboard()
const NotificationStore = useNotificationStore()

export default async (info: string) => {
    try {
        await toClipboard(info)
        NotificationStore.success("Copy To Clipboard Success!", 3000)
    } catch (e) {
        NotificationStore.error("Copy To Clipboard Error!" + e, 3000)
    }
}