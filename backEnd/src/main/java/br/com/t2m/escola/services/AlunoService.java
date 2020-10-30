package br.com.t2m.escola.services;

import br.com.t2m.escola.DTOs.AlunoDTO;
import br.com.t2m.escola.DTOs.DTOMapper;
import br.com.t2m.escola.DTOs.TurmaDTO;
import br.com.t2m.escola.models.Aluno;
import br.com.t2m.escola.repositorys.AlunoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
public class AlunoService {

    private AlunoRepository alunoRepository;
    private DTOMapper dtoMapper;
    private TurmaService turmaService;

    public AlunoService(AlunoRepository alunoRepository, DTOMapper dtoMapper,
                        TurmaService turmaService) {
        this.alunoRepository = alunoRepository;
        this.dtoMapper = dtoMapper;
        this.turmaService = turmaService;
    }

    public Page<AlunoDTO> getAll(Pageable p) {
        log.info("Buscando página de alunosDTO");
        try{
            Page<Aluno> alunoPage = alunoRepository.findAll(p);
            Page<AlunoDTO> alunoDTOPage = dtoMapper.mapPage(alunoPage, AlunoDTO.class);
            alunoDTOPage.map(alunoDTO -> {
            if (alunoDTO.getIdTurma() != null) {
                log.info("Buscando as turmas dos alunos");
                Optional<TurmaDTO> turmaDTO =
                        turmaService.findById(alunoDTO.getIdTurma());
                if (turmaDTO.isPresent()) {
                    log.info("Adicionando Objeto TurmaDTO no Objeto AlunoTDO");
                    alunoDTO.setTurma(turmaDTO.get());
                }
            }
            log.info("Buscando AlunoDTO");
            return alunoDTO;
        });
            log.info("Página de alunosDTO retornada com sucesso !");
            return alunoDTOPage;
        }catch (Exception e){
            log.error("Erro ao recuperar página de alunosDTO");
            return Page.empty();
        }
    }

    public Optional<AlunoDTO> findById(String id) {
        log.info("Buscando um AlunoDTO por matrícula");
        try {
            Optional<Aluno> alunoOptional = alunoRepository.findById(id);
            log.info("transformando um alunoOptional em alunoDTO");
            AlunoDTO alunoDTO = alunoOptional.get().transformaParaAlunoDTO();
            if (alunoOptional.get().getIdTurma() != null){
                log.info("Buscando uma turma por id");
                Optional<TurmaDTO> turmaDTO = turmaService.findById(alunoOptional.get().getIdTurma());
                if(turmaDTO.isPresent()){
                    log.info("AlunoDTO encontrado com sucesso !");
                    alunoDTO.setTurma(turmaDTO.get());
                    return Optional.of(alunoDTO);
                }
            }
            Aluno aluno = alunoOptional.get();
            return Optional.of(new AlunoDTO(aluno));
        } catch (NoSuchElementException exception) {
            log.error("Erro ao buscar um alunoDTO por matrícula");
            return Optional.empty();
        }
    }

    public Optional<AlunoDTO> findByCpf(String cpf) {
        log.info("Buscando um alunoDTO por CPF");
        try {
            Optional<Aluno> alunoOptional = alunoRepository.findByCpf(cpf);
            Aluno aluno = alunoOptional.get();
            log.info("AlunoDTO encontrado com sucesso !");
            return Optional.of(new AlunoDTO(aluno));
        } catch (NoSuchElementException exception) {
            log.error("AlunoDTO não encontrado pelo cpf informado");
            return Optional.empty();
        }
    }


    public AlunoDTO create(AlunoDTO dto) {
        Aluno aluno = dto.transformaParaAluno();
        Aluno alunoPersistido = alunoRepository.save(aluno);
        log.info("AlunoDTO criado com sucesso !");
        return new AlunoDTO(alunoPersistido);
    }

    public AlunoDTO update(AlunoDTO dto) {
        Aluno aluno = dto.transformaParaAluno();
        Aluno alunoPersistido = alunoRepository.save(aluno);
        log.info("AlunoDTO Atualizado com sucesso !");
        return new AlunoDTO(alunoPersistido);
    }

    public void deleteById(String id) {
        alunoRepository.deleteById(id);
        log.info("AlunoDTO deletado com sucesso !");
    }

}
