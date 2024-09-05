/*
  Warnings:

  - You are about to drop the column `password` on the `user_login` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user_login` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user_register` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `user_login` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `user_register` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_login" DROP COLUMN "password",
ALTER COLUMN "username" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_register" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(150);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_username_key" ON "user_login"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_register_username_key" ON "user_register"("username");

-- AddForeignKey
ALTER TABLE "user_login" ADD CONSTRAINT "user_login_username_fkey" FOREIGN KEY ("username") REFERENCES "user_register"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
