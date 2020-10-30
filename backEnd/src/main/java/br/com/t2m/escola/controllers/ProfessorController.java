package br.com.t2m.escola.controllers;

import br.com.t2m.escola.DTOs.ProfessorDTO;
import br.com.t2m.escola.services.ProfessorService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/professores")
@Api(tags = {"Professor"}, description = " API Rest Professor")
@CrossOrigin(origins = "*")
public class ProfessorController {

    private ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @GetMapping
    @ApiOperation(value = "Retorna uma página com determinado número de professores")
    public ResponseEntity<Page<ProfessorDTO>> getAll(Pageable p) {
        log.info("Buscando página de professorDTO");
        try{
            return ResponseEntity.ok(professorService.getAll(p));
        } catch (Exception e){
            log.error("Erro ao buscar página de professorDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Retorna uma unico professor pelo id")
    public ResponseEntity<ProfessorDTO> getById(@PathVariable String id) {
        log.info("Buscando professorDTO por matricula");
        try {
            Optional<ProfessorDTO> optionalProfessorDTO = professorService.findById(id);
            if (optionalProfessorDTO.isPresent()) {
                log.info("ProfessorDTO encontrado com a matrícula informada");
                return ResponseEntity.ok(optionalProfessorDTO.get());
            }
            log.warn("ProfessorDTO não encontrado com a matrícula informada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e){
            log.error("Erro ao buscar professorDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/cpf/{cpf}")
    @ApiOperation(value = "Retorna um professor específico através do seu cpf")
    public ResponseEntity<ProfessorDTO> getByCpf(@PathVariable String cpf) {
        log.info("Buscando um professorDTO por cpf");
        try {
            Optional<ProfessorDTO> optionalProfessorDTO = professorService.findByCpf(cpf);
            if (optionalProfessorDTO.isPresent()) {
                log.info("ProfessorDTO encontrado com o CPF informado");
                return ResponseEntity.ok(optionalProfessorDTO.get());
            }
            log.warn("ProfessorDTO não encontrado com o CPF informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao buscar um professorDTO por CPF");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping
    @ApiOperation(value = "Adiciona um novo professor")
    public ResponseEntity<ProfessorDTO> create(@RequestBody @Valid ProfessorDTO dto) {
        log.info("Tentando criar um professor");
        try{
            Optional<ProfessorDTO> optionalProfessorDTO = professorService.findByCpf(dto.getCpf());
            if (optionalProfessorDTO.isPresent()){
                log.warn("CPF já cadastrado");
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            log.info("CPF não encontrado, Cadastrando novo professorDTO");
            return ResponseEntity.ok(professorService.create(dto));
        } catch (Exception e){
            log.error("Erro ao criar um professorDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{id}")
    @ApiOperation(value = "Modifica os valores de um professor")
    public ResponseEntity update(@RequestBody @Valid ProfessorDTO dto, @PathVariable String id) {
        log.info("Tentando atualizar um professorDTO");
        try{
            log.info("Buscando professorDTO no sistema");
            Optional<ProfessorDTO> optionalProfessorDTO = professorService.findById(id);
            if (optionalProfessorDTO.isPresent()) {
                log.info("ProfessorDTO encontrado com sucesso !");
                dto.setMatricula(id);
                dto.setCpf(optionalProfessorDTO.get().getCpf());
                professorService.update(dto);
                return ResponseEntity.ok().build();
            }
            log.warn("ProfessorDTO não encontrado !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao atualizar professorDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Deleta um professor por id")
    public ResponseEntity delete(@PathVariable String id) {
        log.info("Tentando deletar um professorDTO");
        try{
            log.info("Procurando professorDTO no sistema");
            Optional<ProfessorDTO> optionalProfessorDTO = professorService.findById(id);
            if (optionalProfessorDTO.isPresent()) {
                log.info("ProfessorDTO encontrado, tentando deletar");
                professorService.deleteById(id);
                return ResponseEntity.ok().build();
            }
            log.warn("ProfessorDTO não encontrado com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao deletar um professorDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
