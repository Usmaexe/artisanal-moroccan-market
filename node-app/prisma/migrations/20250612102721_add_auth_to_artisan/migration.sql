/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Artisan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Artisan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `Artisan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artisan" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Artisan_email_key" ON "Artisan"("email");
