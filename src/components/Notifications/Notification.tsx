import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { Close, Description, Root, Title } from '@radix-ui/react-toast';

const icons = {
  info: (
    <InformationCircleIcon
      className="h-6 w-6 text-blue-500"
      aria-hidden="true"
    />
  ),
  success: (
    <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
  ),
  warning: (
    <ExclamationCircleIcon
      className="h-6 w-6 text-yellow-500"
      aria-hidden="true"
    />
  ),
  error: <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />,
};

export type Props = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: Props) => (
  <Root className="w-full flex flex-col items-center space-y-4 sm:items-end">
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4" role="alert">
        <div className="flex items-start">
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <Title className="text-sm font-medium text-gray-900">{title}</Title>
            <Description className="mt-1 text-sm text-gray-500">
              {message}
            </Description>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <Close
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                onDismiss(id);
              }}
            >
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </Close>
          </div>
        </div>
      </div>
    </div>
  </Root>
);
