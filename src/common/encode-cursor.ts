export const encodeCursor = (cursor: unknown) =>
  Buffer.from(JSON.stringify(cursor)).toString('base64');
