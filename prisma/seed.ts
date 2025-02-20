import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$transaction(async (tx) => {
    await tx.order.deleteMany();
    await tx.customer.deleteMany();
    await tx.inventory.deleteMany();
    // inventory
    const coffee = await tx.inventory.create({
      data: {
        name: 'コーヒー豆 100g',
        quantity: 100,
        description: 'コーヒー豆 100g',
      },
    });
    const tea = await tx.inventory.create({
      data: {
        name: '紅茶パック 50個入り',
        quantity: 50,
        description: '紅茶パック 50個入り',
      },
    });
    const harbTea = await tx.inventory.create({
      data: {
        name: 'ハーブティー 30個入り',
        quantity: 75,
        description: 'ハーブティー 30個入り',
      },
    });
    const greenTea = await tx.inventory.create({
      data: {
        name: '緑茶パック 20個入り',
        quantity: 40,
        description: '緑茶パック 20個入り',
      },
    });
    const espresso = await tx.inventory.create({
      data: {
        name: 'エスプレッソ 200g',
        quantity: 80,
        description: 'エスプレッソ 200g',
      },
    });
    const chaiTea = await tx.inventory.create({
      data: {
        name: 'チャイティー 25個入り',
        quantity: 60,
        description: 'チャイティー 25個入り',
      },
    });
    // customer
    const taro = await tx.customer.create({
      data: {
        name: '山田太郎',
        description: '山田太郎',
      },
    });
    const hanako = await tx.customer.create({
      data: {
        name: '鈴木花子',
        description: '鈴木花子',
      },
    });
    const tanaka = await tx.customer.create({
      data: {
        name: '田中一郎',
        description: '田中一郎',
      },
    });
    // order
    await tx.order.createMany({
      data: Array.from({ length: 200 }, (_, index) => ({
        customerId: [taro.id, hanako.id, tanaka.id][index % 3],
        description: '通常購入',
        inventoryId: [
          coffee.id,
          tea.id,
          harbTea.id,
          greenTea.id,
          espresso.id,
          chaiTea.id,
        ][index % 6],
        quantity: [10, 100, 15][index % 3],
      })),
    });
  });
};

main()
  .then(() => {
    console.log('finished');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
