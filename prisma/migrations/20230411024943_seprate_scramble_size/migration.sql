/*
  Warnings:

  - You are about to drop the column `scrambleSize` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `timerSize` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "scrambleSize",
DROP COLUMN "timerSize",
ADD COLUMN     "desktopScrambleSize" INTEGER NOT NULL DEFAULT 48,
ADD COLUMN     "desktopTimerSize" INTEGER NOT NULL DEFAULT 150,
ADD COLUMN     "mobileScrambleSize" INTEGER NOT NULL DEFAULT 24,
ADD COLUMN     "mobileTimerSize" INTEGER NOT NULL DEFAULT 72;
