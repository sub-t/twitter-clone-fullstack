import { default as dayjs } from 'dayjs';

export const formatDate = (date: number | string | Date, detailed = false) => {
  const template = detailed ? 'h:mm A･MMMM D, YYYY' : 'MMMM D';
  return dayjs(date).format(template);
};
