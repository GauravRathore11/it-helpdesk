/*
  Warnings:

  - Added the required column `reason` to the `AssetRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetRequest" ADD COLUMN     "reason" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Other',
ADD COLUMN     "resolvedAt" TIMESTAMP(3),
ADD COLUMN     "slaDeadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "slaHours" SET DEFAULT 24;

-- AlterTable
ALTER TABLE "TicketComment" ADD COLUMN     "authorId" INTEGER,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "isInternal" BOOLEAN NOT NULL DEFAULT false;
