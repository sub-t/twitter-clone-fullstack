export const sample = <T>(list: T[]): T => {
  const size = list.length;
  const random = Math.floor(Math.random() * size);
  return list[random];
};
