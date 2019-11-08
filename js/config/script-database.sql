CREATE DATABASE "Convenios";

CREATE TABLE "public"."convenio"
(
    "id" serial,
    "nombre" varchar,
    "descripcion" text,
    "universidades" text,
    "documentos" jasonb,
    "json" jsonb,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."comentario"
(
    "id" serial,
    "nombre" varchar,
    "apellido" varchar,
    "correo" text,
    "mensaje" text,
    "json" jsonb,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."usuarios"
(
    "id" serial,
    "nombre" varchar,
    "apellidos" varchar,
    "nombre_usuario" varchar,
    "clave" varchar,
    "email" text,
    "sexo" boolean,
    PRIMARY KEY ("id")
);

