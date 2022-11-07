/*
  Warnings:
  - A unique constraint covering the columns `[googlId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "googlId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_googlId_key" ON "User"("googlId");