-- CreateTable
CREATE TABLE "Register" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("id")
);
