CREATE DATABASE "Convenios";

CREATE TABLE "public"."convenio"
(
    "id" serial,
    "nombre" varchar,
    "descripcion" text,
    "universidades" boolean,
    "documentos" jasonb,
    "json" jsonb,
    PRIMARY KEY ("id")
);
