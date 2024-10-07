import {PrismaClient} from '@prisma/client'
import {ApiLogMessage} from '@configs/logs/logMessages';

const prisma = new PrismaClient();

async function ConnectPrismaDb() {
	ApiLogMessage('[PRISMA_DATABASE]', 'Try to connect to Prisma');
	// @ts-ignore
	
	await prisma.$connect();
	ApiLogMessage('[PRISMA_DATABASE]', 'Connected successfully');
}

export {
	ConnectPrismaDb,
	prisma
}

