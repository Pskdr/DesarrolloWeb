CREATE DATABASE "Convenios";

CREATE TABLE "public"."convenio"
(
    "id" serial,
    "nombre" varchar,
    "descripcion" text,
    "universidades" boolean,
    "json" jsonb,
    PRIMARY KEY ("id")
);
