-- AlterTable
ALTER TABLE "User" ALTER COLUMN "is_deleted" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;
