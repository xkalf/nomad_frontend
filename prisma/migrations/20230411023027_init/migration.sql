-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Font" AS ENUM ('Mono', 'Montserat', 'Arial', 'Inter');

-- CreateEnum
CREATE TYPE "UnitWhenEnteringInteger" AS ENUM ('Full');

-- CreateEnum
CREATE TYPE "UseWcaInspection" AS ENUM ('Always', 'ExceptBLD', 'Never');

-- CreateEnum
CREATE TYPE "VoiceAlert" AS ENUM ('None', 'Male', 'Female', 'Aliya', 'Mygmardorj');

-- CreateEnum
CREATE TYPE "EnteringTimes" AS ENUM ('Timer', 'Typing', 'Stackmat', 'Bluetooth');

-- CreateEnum
CREATE TYPE "TimerUpdate" AS ENUM ('Default', 'Update', 'Inspection', 'Seconds', 'Point', 'None');

-- CreateEnum
CREATE TYPE "AlignArea" AS ENUM ('Center', 'Left', 'Right');

-- CreateEnum
CREATE TYPE "SolveStatus" AS ENUM ('Ok', 'Dnf', 'Plus2');

-- CreateEnum
CREATE TYPE "CubeType" AS ENUM ('N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'Megaminx', 'Pyraminx', 'Clock', 'Sq1', 'Bld3', 'Bld4', 'Bld5', 'Skewb');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT false,
    "cube" "CubeType" NOT NULL DEFAULT 'N3',

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solve" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scramble" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "description" VARCHAR,
    "sessionId" INTEGER NOT NULL,
    "status" "SolveStatus" NOT NULL DEFAULT 'Ok',

    CONSTRAINT "Solve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoLookSolve" (
    "id" SERIAL NOT NULL,
    "cross" TEXT,
    "firstLayer" TEXT,
    "edge1" TEXT,
    "edge2" TEXT,
    "edge3" TEXT,
    "edge4" TEXT,
    "oll1" TEXT,
    "oll2" TEXT,
    "pll1" TEXT,
    "pll2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "solveId" INTEGER NOT NULL,

    CONSTRAINT "TwoLookSolve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoLookSolveDeleted" (
    "id" SERIAL NOT NULL,
    "cross" TEXT,
    "firstLayer" TEXT,
    "edge1" TEXT,
    "edge2" TEXT,
    "edge3" TEXT,
    "edge4" TEXT,
    "oll1" TEXT,
    "oll2" TEXT,
    "pll1" TEXT,
    "pll2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twoLookSolveId" INTEGER NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "solveId" INTEGER NOT NULL,

    CONSTRAINT "TwoLookSolveDeleted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CfopSolve" (
    "id" SERIAL NOT NULL,
    "cross" TEXT,
    "f2l1" TEXT,
    "f2l2" TEXT,
    "f2l3" TEXT,
    "f2l4" TEXT,
    "oll" TEXT,
    "pll" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "solveId" INTEGER NOT NULL,

    CONSTRAINT "CfopSolve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CfopSolveDeleted" (
    "id" SERIAL NOT NULL,
    "cross" TEXT,
    "f2l1" TEXT,
    "f2l2" TEXT,
    "f2l3" TEXT,
    "f2l4" TEXT,
    "oll" TEXT,
    "pll" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "solveId" INTEGER NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cfopSolveId" INTEGER NOT NULL,

    CONSTRAINT "CfopSolveDeleted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender",
    "phone" VARCHAR(8),
    "settingsId" INTEGER,
    "authId" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'User',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "zoom" INTEGER NOT NULL DEFAULT 100,
    "font" "Font" NOT NULL DEFAULT 'Mono',
    "backgroundImageOpacity" INTEGER NOT NULL DEFAULT 25,
    "timerSize" INTEGER NOT NULL DEFAULT 25,
    "backgroundImage" TEXT,
    "freezeTime" INTEGER NOT NULL DEFAULT 0,
    "useMouseTimer" BOOLEAN NOT NULL DEFAULT false,
    "useWcaInspection" "UseWcaInspection" NOT NULL DEFAULT 'Never',
    "voiceAlert" "VoiceAlert" NOT NULL DEFAULT 'None',
    "voiceVolume" INTEGER NOT NULL DEFAULT 100,
    "enteringTimes" "EnteringTimes" NOT NULL DEFAULT 'Timer',
    "unitWhenEnteringInteger" "UnitWhenEnteringInteger" NOT NULL DEFAULT 'Full',
    "multiPhase" INTEGER NOT NULL DEFAULT 1,
    "timerUpdate" "TimerUpdate" NOT NULL DEFAULT 'Default',
    "limitHeight" BOOLEAN NOT NULL DEFAULT false,
    "scrambleSize" INTEGER NOT NULL DEFAULT 25,
    "monospaced" BOOLEAN NOT NULL DEFAULT false,
    "alignArea" "AlignArea" NOT NULL DEFAULT 'Center',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionDeleted" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT false,
    "deleted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cube" "CubeType" NOT NULL DEFAULT 'N3',
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "SessionDeleted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolveDeleted" (
    "id" SERIAL NOT NULL,
    "solveId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scramble" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "description" VARCHAR,
    "sessionId" INTEGER NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SolveStatus" NOT NULL DEFAULT 'Ok',

    CONSTRAINT "SolveDeleted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerStatus" (
    "id" SERIAL NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ServerStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_userId_cube_main_idx" ON "Session"("userId", "cube", "main");

-- CreateIndex
CREATE INDEX "Solve_sessionId_idx" ON "Solve"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "TwoLookSolve_solveId_key" ON "TwoLookSolve"("solveId");

-- CreateIndex
CREATE INDEX "TwoLookSolve_solveId_idx" ON "TwoLookSolve"("solveId");

-- CreateIndex
CREATE UNIQUE INDEX "CfopSolve_solveId_key" ON "CfopSolve"("solveId");

-- CreateIndex
CREATE INDEX "CfopSolve_solveId_idx" ON "CfopSolve"("solveId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- CreateIndex
CREATE INDEX "Settings_userId_idx" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solve" ADD CONSTRAINT "Solve_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoLookSolve" ADD CONSTRAINT "TwoLookSolve_solveId_fkey" FOREIGN KEY ("solveId") REFERENCES "Solve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CfopSolve" ADD CONSTRAINT "CfopSolve_solveId_fkey" FOREIGN KEY ("solveId") REFERENCES "Solve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
