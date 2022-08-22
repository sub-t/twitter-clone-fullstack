import { hash } from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (plainPassword: string | number) => {
  const hashedPassword = await hash(String(plainPassword), saltRounds);

  return hashedPassword;
};
