/*
  Warnings:

  - You are about to drop the `Register` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Register";

-- CreateTable
CREATE TABLE "user_register" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "user_register_pkey" PRIMARY KEY ("id")
);
