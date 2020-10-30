package br.com.t2m.escola.DTOs;

import br.com.t2m.escola.models.Curso;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

public class CursoDTO {

    private String idCurso;
    @NotBlank(message = "O campo 'nome' não pode ser vazio ou nulo")
    private String nome;

    public Curso transformaParaCurso() {
        return new Curso(nome);
    }

    public Curso AtualizaParaCurso() {
        return new Curso(idCurso, nome);
    }

    public CursoDTO(Curso curso) {
        this.idCurso = curso.getIdCurso();
        this.nome = curso.getNome();
    }

    public CursoDTO() {
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
