/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'MANAGER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';

-- UpdateTable
UPDATE "User" SET "role" = 'ADMIN' WHERE "isAdmin" = true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin";