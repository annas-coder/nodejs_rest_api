-- CreateTable
CREATE TABLE "user_register" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "user_register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_login" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "user_login_pkey" PRIMARY KEY ("id")
);
