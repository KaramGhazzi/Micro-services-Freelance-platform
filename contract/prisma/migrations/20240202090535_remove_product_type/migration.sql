/*
  Warnings:

  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_type_key` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `type`;
