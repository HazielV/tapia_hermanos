-- CreateTable
CREATE TABLE "cotizacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "telefono_movil" INTEGER,
    "estacion_id" INTEGER NOT NULL,
    "estacion_id_2" INTEGER NOT NULL,
    "tipo" TEXT,
    "valor" INTEGER,
    "volumen" TEXT,
    "altura" TEXT,
    "longitud" TEXT,
    "ancho" TEXT,
    "peso" TEXT,
    "formaPago" TEXT,
    "comentario" TEXT,

    CONSTRAINT "cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persona" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT NOT NULL,
    "nroDocumento" INTEGER NOT NULL,
    "email" TEXT,

    CONSTRAINT "persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "persona_id" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT,
    "tipoEstacionId" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "estacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipoEstacion" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "tipoEstacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parada" (
    "id" SERIAL NOT NULL,
    "orden" INTEGER NOT NULL,
    "estacion_id" INTEGER NOT NULL,
    "rutaId" INTEGER,

    CONSTRAINT "parada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ruta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "fecha_partida" TIMESTAMP(3) NOT NULL,
    "fecha_pedido" TIMESTAMP(3) NOT NULL,
    "fecha_entrega" TIMESTAMP(3) NOT NULL,
    "nombre_cliente" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" INTEGER,
    "precio" INTEGER,
    "tipo" TEXT,
    "volumen" INTEGER,
    "altura" INTEGER,
    "longitud" INTEGER,
    "ancho" INTEGER,
    "peso" INTEGER,
    "formaPago" TEXT,
    "codigo" TEXT NOT NULL,
    "ruta_id" INTEGER NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seguimiento" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "parada_id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seguimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placa" (
    "id" SERIAL NOT NULL,
    "nroPlaca" TEXT NOT NULL,
    "pedidoId" INTEGER,

    CONSTRAINT "placa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_roles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "persona_nroDocumento_key" ON "persona"("nroDocumento");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_persona_id_key" ON "user"("persona_id");

-- CreateIndex
CREATE UNIQUE INDEX "pedido_codigo_key" ON "pedido"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "placa_nroPlaca_key" ON "placa"("nroPlaca");

-- CreateIndex
CREATE UNIQUE INDEX "_user_roles_AB_unique" ON "_user_roles"("A", "B");

-- CreateIndex
CREATE INDEX "_user_roles_B_index" ON "_user_roles"("B");

-- AddForeignKey
ALTER TABLE "cotizacion" ADD CONSTRAINT "cotizacion_estacion_id_fkey" FOREIGN KEY ("estacion_id") REFERENCES "estacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotizacion" ADD CONSTRAINT "cotizacion_estacion_id_2_fkey" FOREIGN KEY ("estacion_id_2") REFERENCES "estacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estacion" ADD CONSTRAINT "estacion_tipoEstacionId_fkey" FOREIGN KEY ("tipoEstacionId") REFERENCES "tipoEstacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parada" ADD CONSTRAINT "parada_estacion_id_fkey" FOREIGN KEY ("estacion_id") REFERENCES "estacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parada" ADD CONSTRAINT "parada_rutaId_fkey" FOREIGN KEY ("rutaId") REFERENCES "ruta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "ruta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguimiento" ADD CONSTRAINT "seguimiento_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguimiento" ADD CONSTRAINT "seguimiento_parada_id_fkey" FOREIGN KEY ("parada_id") REFERENCES "parada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placa" ADD CONSTRAINT "placa_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_roles" ADD CONSTRAINT "_user_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_roles" ADD CONSTRAINT "_user_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
