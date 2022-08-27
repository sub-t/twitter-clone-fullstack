import { Root, Title } from '@radix-ui/react-toast';

export type Props = {
  notification: {
    title: string;
  };
};

export const Notification = ({ notification: { title } }: Props) => (
  <Root className="p-3 bg-sky-500 rounded-md">
    <Title className="px-3 text-sm font-medium text-white">{title}</Title>
  </Root>
);
