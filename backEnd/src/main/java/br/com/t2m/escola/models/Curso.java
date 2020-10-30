package br.com.t2m.escola.models;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Slf4j
@Document
public class Curso {

    @Id
    private String idCurso;
    private String nome;

    public Curso() {
    }

    public Curso(String idCurso, String nome) {
        this.nome = nome;
        this.idCurso = idCurso;
    }

    public Curso(String nome, List<String> turmaIds) {
        this.nome = nome;
    }

    public Curso(String nome) {
        this.nome = nome;
    }

    public String getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(String idCurso) {
        this.idCurso = idCurso;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
