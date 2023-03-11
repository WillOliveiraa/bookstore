-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_authors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "deleted_at" DATETIME,
    "book_id" TEXT,
    CONSTRAINT "authors_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_authors" ("book_id", "created_at", "deleted_at", "first_name", "id", "last_name", "updated_at") SELECT "book_id", "created_at", "deleted_at", "first_name", "id", "last_name", "updated_at" FROM "authors";
DROP TABLE "authors";
ALTER TABLE "new_authors" RENAME TO "authors";
CREATE TABLE "new_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "deleted_at" DATETIME,
    "book_id" TEXT,
    CONSTRAINT "categories_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_categories" ("book_id", "created_at", "deleted_at", "description", "id", "title", "updated_at") SELECT "book_id", "created_at", "deleted_at", "description", "id", "title", "updated_at" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
