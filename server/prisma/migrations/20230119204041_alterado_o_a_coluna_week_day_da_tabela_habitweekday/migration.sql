/*
  Warnings:

  - You are about to alter the column `week_day` on the `habit_week_day` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habit_week_day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "habit_week_day_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habit_week_day" ("habit_id", "id", "week_day") SELECT "habit_id", "id", "week_day" FROM "habit_week_day";
DROP TABLE "habit_week_day";
ALTER TABLE "new_habit_week_day" RENAME TO "habit_week_day";
CREATE UNIQUE INDEX "habit_week_day_habit_id_week_day_key" ON "habit_week_day"("habit_id", "week_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
