package br.com.t2m.escola.services;

import br.com.t2m.escola.DTOs.DTOMapper;
import br.com.t2m.escola.DTOs.ProfessorDTO;
import br.com.t2m.escola.models.Professor;
import br.com.t2m.escola.repositorys.ProfessorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
public class ProfessorService {

    private ProfessorRepository professorRepository;
    private DTOMapper dtoMapper;

    public ProfessorService(ProfessorRepository professorRepository, DTOMapper dtoMapper) {
        this.professorRepository = professorRepository;
        this.dtoMapper = dtoMapper;
    }

    public Page<ProfessorDTO> getAll(Pageable p) {
        log.info("Buscando página de professorDTO");
        try{
            Page<Professor> professorPage = professorRepository.findAll(p);
            Page<ProfessorDTO> professorDTOPage = dtoMapper.mapPage(professorPage, ProfessorDTO.class);
            log.info("Página de professorDTO encontrada com sucesso !");
            return professorDTOPage;
        }catch (Exception e){
            log.error("Página não encontrada");
            return Page.empty();
        }
    }

    public Optional<ProfessorDTO> findById(String id) {
        log.info("Buscando um ProfessorDTO por matricula");
        try {
            Optional<Professor> professorOptional = professorRepository.findById(id);
            Professor professor = professorOptional.get();
            log.info("ProfessorDTO encontrado com sucesso !");
            return Optional.of(new ProfessorDTO(professor));
        } catch (NoSuchElementException exception) {
            log.error("Erro ao buscar um professorDTO por matrícula");
            return Optional.empty();
        }
    }

    public Optional<ProfessorDTO> findByCpf(String cpf) {
        log.info("Buscando um professorDTO por CPF");
        try {
            Optional<Professor> professorOptional = professorRepository.findByCpf(cpf);
            Professor professor = professorOptional.get();
            log.info("ProfessorDTO encontrado com sucesso !");
            return Optional.of(new ProfessorDTO(professor));
        } catch (NoSuchElementException exception) {
            log.error("Erro ao buscar um professorDTO por CPF");
            return Optional.empty();
        }
    }

    public ProfessorDTO create(ProfessorDTO dto) {
        log.info("Tentando criar um professorDTO");
            Professor professor = dto.transformaParaProfessor();
            Professor professorPersistido = professorRepository.save(professor);
            log.info("ProfessorDTO criado com sucesso !");
            return new ProfessorDTO(professorPersistido);
    }

    public ProfessorDTO update(ProfessorDTO dto) {
        log.info("Tentando atualizar um professorDTO");
        Professor professor = dto.transformaParaProfessor();
        Professor professorPersistido = professorRepository.save(professor);
        log.info("ProfessorDTO atualizado com sucesso !");
        return new ProfessorDTO(professorPersistido);
    }

    public void deleteById(String id) {
        log.info("ProfessorDTO deletado com sucesso !");
        professorRepository.deleteById(id);
    }
}
