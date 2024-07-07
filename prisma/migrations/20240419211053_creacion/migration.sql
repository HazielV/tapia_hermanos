-- CreateTable
CREATE TABLE "persona" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT NOT NULL,
    "nroDocumento" INTEGER NOT NULL,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "persona_id" INTEGER NOT NULL,
    CONSTRAINT "user_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "persona" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "rol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "estado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT
);

-- CreateTable
CREATE TABLE "parada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orden" INTEGER NOT NULL,
    "estacion_id" INTEGER NOT NULL,
    "rutaId" INTEGER,
    CONSTRAINT "parada_estacion_id_fkey" FOREIGN KEY ("estacion_id") REFERENCES "estacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "parada_rutaId_fkey" FOREIGN KEY ("rutaId") REFERENCES "ruta" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ruta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "ruta_id" INTEGER NOT NULL,
    CONSTRAINT "pedido_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "ruta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_user_roles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_user_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "rol" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_user_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "persona_nroDocumento_key" ON "persona"("nroDocumento");

-- CreateIndex
CREATE UNIQUE INDEX "user_persona_id_key" ON "user"("persona_id");

-- CreateIndex
CREATE UNIQUE INDEX "parada_estacion_id_key" ON "parada"("estacion_id");

-- CreateIndex
CREATE UNIQUE INDEX "pedido_codigo_key" ON "pedido"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "_user_roles_AB_unique" ON "_user_roles"("A", "B");

-- CreateIndex
CREATE INDEX "_user_roles_B_index" ON "_user_roles"("B");
