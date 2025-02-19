export const decodeCursor = (cursor: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  JSON.parse(Buffer.from(cursor, 'base64').toString('ascii'));
