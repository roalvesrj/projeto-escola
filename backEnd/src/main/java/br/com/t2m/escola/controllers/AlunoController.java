package br.com.t2m.escola.controllers;

import br.com.t2m.escola.DTOs.AlunoDTO;
import br.com.t2m.escola.services.AlunoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "*")
@Api(tags = {"Aluno"}, description = " API Rest Aluno")
public class AlunoController {

    private AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @GetMapping
    @ApiOperation(value = "Retorna uma página com determinado número de alunos")
    public ResponseEntity<Page<AlunoDTO>> getAll(Pageable p) {
        log.info("Buscando página de alunos");
        try{
            return ResponseEntity.ok(alunoService.getAll(p));
        } catch (Exception e){
            log.error("Erro ao buscar página de alunos");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Retorna um aluno específico através do seu id")
    public ResponseEntity<AlunoDTO> getById(@PathVariable String id) {
        log.info("Buscando um aluno por matrícula");
        try{
            Optional<AlunoDTO> optionalAlunoDTO = alunoService.findById(id);
            if (optionalAlunoDTO.isPresent()) {
                log.info("Aluno encontrado com sucesso !");
                return ResponseEntity.ok(optionalAlunoDTO.get());
            }
            log.warn("Aluno não encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Erro ao buscar aluno por matrícula");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/cpf/{cpf}")
    @ApiOperation(value = "Retorna um aluno específico através do seu cpf")
    public ResponseEntity<AlunoDTO> getByCpf(@PathVariable String cpf) {
        log.info("Buscando aluno por cpf");
        try{
            Optional<AlunoDTO> optionalAlunoDTO = alunoService.findByCpf(cpf);
            if (optionalAlunoDTO.isPresent()) {
                log.info("Aluno encontrado com sucesso !");
                return ResponseEntity.ok(optionalAlunoDTO.get());
            }
            log.warn("Aluno não encontrado !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e){
            log.error("Erro ao buscar aluno por CPF");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping
    @ApiOperation(value = "Adiciona um novo aluno")
    public ResponseEntity<AlunoDTO> create(@RequestBody @Valid AlunoDTO dto) {
        log.info("Tentando criar um aluno");
        try{
            Optional<AlunoDTO> optionalAlunoDTO = alunoService.findByCpf(dto.getCpf());
            if (optionalAlunoDTO.isPresent()){
                log.warn("cpf já cadastrado");
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            log.info("Aluno criado com sucesso !");
            return ResponseEntity.ok(alunoService.create(dto));
        } catch (Exception e){
            log.error("Erro ao criar um aluno");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{id}")
    @ApiOperation(value = "Modifica os valores de um aluno")
    public ResponseEntity update(@RequestBody AlunoDTO dto, @PathVariable String id) {
        log.info("Tentando atualizar aluno");
        try {
            Optional<AlunoDTO> optionalAlunoDTO = alunoService.findById(id);
            if (optionalAlunoDTO.isPresent()) {
                dto.setMatricula(id);
                dto.setCpf(optionalAlunoDTO.get().getCpf());
                log.info("Aluno atualizado com sucesso !");
                alunoService.update(dto);
                return ResponseEntity.ok().build();
            }
            log.warn("Aluno Não encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e){
            log.error("Erro ao tentar atualizar o aluno");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Deleta um aluno por id")
    public ResponseEntity delete(@PathVariable String id) {
        log.info("Tentando Deletar um aluno");
        try{
            Optional<AlunoDTO> optionalAlunoDTO = alunoService.findById(id);
            if (optionalAlunoDTO.isPresent()) {
                log.info("Deletando aluno");
                alunoService.deleteById(id);
                return ResponseEntity.ok().build();
            }
            log.warn("Aluno não encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e){
            log.error("Erro ao deletar um aluno");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
