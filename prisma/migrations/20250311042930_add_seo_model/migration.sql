/*
  Warnings:

  - You are about to drop the `SeoSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Brand_name_key";

-- DropTable
DROP TABLE "SeoSettings";

-- CreateTable
CREATE TABLE "SEO" (
    "id" SERIAL NOT NULL,
    "pageType" TEXT NOT NULL,
    "entityId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "canonical" TEXT,
    "structuredData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SEO_pkey" PRIMARY KEY ("id")
);
