/*
  Warnings:

  - You are about to drop the column `customerCpf` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customerNif` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerCpf",
ADD COLUMN     "customerNif" TEXT NOT NULL;
