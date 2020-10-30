BEGIN TRANSACTION;

CREATE TYPE tipo_genero AS ENUM (
    'Masculino',
    'Feminino',
    'Outro'
);

CREATE TYPE tipo_diversidade AS ENUM (
    'Sim',
    'Não'
);

CREATE TYPE tipo_status_aluno AS ENUM (
    'Pré Matriculado',
    'Matriculado',
    'Cancelado',
    'Suspenso',
    'Transferido',
    'Concluído'
);


CREATE TYPE tipo_status_prof AS ENUM (
    'Habilitado',
    'Inativo'
);

CREATE TYPE tipo_semestre AS ENUM (
    '1',
    '2'
);


CREATE TABLE IF NOT EXISTS pessoa (
    id_pessoa serial NOT NULL,
    cpf char(11) NOT NULL,
    rg char(9) NOT NULL,
    nome varchar(60) NOT NULL,
    nome_social varchar(60) NOT NULL,
    foto varchar(60) NOT NULL,
    genero tipo_genero NOT NULL,
    dt_nascimento date NOT NULL,
    naturalidade varchar(40) NOT NULL,
    nacionalidade varchar(40) NOT NULL,
    d_funcional tipo_diversidade NOT NULL,
	PRIMARY KEY ("id_pessoa"),
	UNIQUE ("cpf")
);


CREATE TABLE IF NOT EXISTS pessoa_endereco (
    id_end serial NOT NULL,
    id_pessoa int NOT NULL,
    cep char(8) NOT NULL,
    logradouro varchar(40) NOT NULL,
    numero int DEFAULT NULL,
    complemento varchar(40) DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS pessoa_email (
    id_email serial NOT NULL,
    id_pessoa int NOT NULL,
    email varchar(60) NOT NULL,
	PRIMARY KEY ("id_email"),
	UNIQUE ("email")
);


CREATE TABLE IF NOT EXISTS pessoa_telefone (
    id_telefone serial NOT NULL,
    id_pessoa int NOT NULL,
    telefone varchar(11) NOT NULL,
	PRIMARY KEY ("id_telefone")
);


CREATE TABLE IF NOT EXISTS aluno (
    matricula char(4) NOT NULL,
    id_pessoa int NOT NULL,
    id_turma int NOT NULL,
    id_responsavel int DEFAULT NULL,
    nome_mae varchar(60) NULL,
    nome_pai varchar(60) NULL,
    ano_ingresso char(4) NOT NULL,
    ano_conclusao char(4) NOT NULL,
    turno varchar(20) NOT NULL,
    status tipo_status_aluno NOT NULL,
    UNIQUE ("matricula")
);


CREATE TABLE IF NOT EXISTS professor (
    matricula char(4) NOT NULL,
    id_pessoa int NOT NULL,
    status tipo_status_prof NOT NULL,
    UNIQUE ("matricula")
);


CREATE TABLE IF NOT EXISTS turma (
    id_turma serial NOT NULL,
    id_curso int NOT NULL,
    nome varchar(20) NOT NULL,
    ano char(4) NOT NULL,
    semestre tipo_semestre NOT NULL,
    min_inscricao char(2) NOT NULL,
    max_inscricao char(2) NOT NULL,
    PRIMARY KEY ("id_turma")
);


CREATE TABLE IF NOT EXISTS curso (
    id_curso serial NOT NULL,
    nome varchar(60) NOT NULL,
    PRIMARY KEY ("id_curso")
);


CREATE TABLE IF NOT EXISTS disciplina (
    id_disciplina serial NOT NULL,
    matricula_prof char(4) NOT NULL,
    id_turma int NOT NULL,
    nome varchar(20) NOT NULL,
    carga_horaria varchar(3),
    PRIMARY KEY ("id_disciplina")
);


ALTER TABLE "pessoa_endereco"
ADD FOREIGN KEY ("id_pessoa") REFERENCES "pessoa" ("id_pessoa") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "pessoa_email"
ADD FOREIGN KEY ("id_pessoa") REFERENCES "pessoa" ("id_pessoa") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "pessoa_telefone"
ADD FOREIGN KEY ("id_pessoa") REFERENCES "pessoa" ("id_pessoa") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "aluno"
ADD FOREIGN KEY ("id_pessoa") REFERENCES "pessoa" ("id_pessoa") ON UPDATE CASCADE ON DELETE CASCADE,
ADD FOREIGN KEY ("id_turma") REFERENCES "turma" ("id_turma") ON UPDATE NO ACTION ON DELETE NO ACTION,
ADD FOREIGN KEY ("id_responsavel") REFERENCES "pessoa" ("id_pessoa") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "professor"
ADD FOREIGN KEY ("id_pessoa") REFERENCES "pessoa" ("id_pessoa") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "turma"
ADD FOREIGN KEY ("id_curso") REFERENCES "curso" ("id_curso") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "disciplina"
ADD FOREIGN KEY ("id_turma") REFERENCES "turma" ("id_turma") ON UPDATE NO ACTION ON DELETE NO ACTION;


COMMIT;