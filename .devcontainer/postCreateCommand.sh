pnpm i
cp .env.develop .env
pnpm prisma db push
pnpm prisma db seed