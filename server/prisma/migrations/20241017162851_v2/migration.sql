-- CreateTable
CREATE TABLE "OrderHistory" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "OrderHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderHistory_email_key" ON "OrderHistory"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OrderHistory_sessionId_key" ON "OrderHistory"("sessionId");
