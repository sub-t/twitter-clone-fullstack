type WithCreatedAt = {
  createdAt: Date;
};

export const sortByCreatedAt = (a: WithCreatedAt, b: WithCreatedAt) =>
  b.createdAt > a.createdAt ? 1 : -1;
