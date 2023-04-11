/*
  Warnings:

  - You are about to drop the column `desktopScrambleSize` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `desktopTimerSize` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `mobileScrambleSize` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `mobileTimerSize` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "desktopScrambleSize",
DROP COLUMN "desktopTimerSize",
DROP COLUMN "mobileScrambleSize",
DROP COLUMN "mobileTimerSize",
ADD COLUMN     "scrambleSize" INTEGER NOT NULL DEFAULT 24,
ADD COLUMN     "timerSize" INTEGER NOT NULL DEFAULT 72;
