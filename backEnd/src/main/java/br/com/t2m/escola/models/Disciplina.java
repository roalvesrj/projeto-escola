package br.com.t2m.escola.models;

import br.com.t2m.escola.DTOs.DisciplinaDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class Disciplina {

    @Id
    private String idDisciplina;
    private String matriculaProfessor;
    private String nome;
    private String cargaHoraria;
    private List<String> turmasIds;

    public Disciplina() {
    }

    public DisciplinaDTO transformaParaDisciplinaDTO() {
        return new DisciplinaDTO(idDisciplina, nome, cargaHoraria, matriculaProfessor, turmasIds);
    }

    public Disciplina(String idDisciplina, String nome, String cargaHoraria, String matriculaProfessor,
                      List<String> turmasIds) {
        this.idDisciplina = idDisciplina;
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.matriculaProfessor = matriculaProfessor;
        this.turmasIds = turmasIds;

    }

    public List<String> getTurmasIds() {
        return turmasIds;
    }

    public void setTurmasIds(List<String> turmasIds) {
        this.turmasIds = turmasIds;
    }

    public String getIdDisciplina() {
        return idDisciplina;
    }

    public void setIdDisciplina(String idDisciplina) {
        this.idDisciplina = idDisciplina;
    }

    public String getMatriculaProfessor() {
        return matriculaProfessor;
    }

    public void setMatriculaProfessor(String matriculaProfessor) {
        this.matriculaProfessor = matriculaProfessor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(String cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }
}
