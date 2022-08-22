import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (plainPassword: string | number) => {
  const hash = await bcrypt.hash(String(plainPassword), saltRounds);

  return hash;
};

export const comparePasswords = async (
  plainPassword: string | number,
  hashedPassword: string,
) => {
  const isMatch = await bcrypt.compare(String(plainPassword), hashedPassword);

  return isMatch;
};
