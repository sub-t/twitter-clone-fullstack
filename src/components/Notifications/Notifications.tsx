import { Provider, Viewport } from '@radix-ui/react-toast';
import { useNotificationStore } from '@/stores/notifications';
import { Notification } from './Notification';

export const Notifications = () => {
  const { notifications } = useNotificationStore();

  return (
    <Provider>
      <Viewport className="z-50 fixed bottom-0 flex flex-col items-center gap-4 w-full mb-8">
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </Viewport>
    </Provider>
  );
};
