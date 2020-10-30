package br.com.t2m.escola.controllers;

import br.com.t2m.escola.DTOs.TurmaDTO;
import br.com.t2m.escola.services.TurmaService;
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
@RequestMapping("/turmas")
@Api(tags = {"Turma"}, description = " API Rest Turma")
@CrossOrigin(origins = "*")
public class TurmaController {

    private TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @GetMapping
    @ApiOperation(value = "Retorna uma página com determinado número de turmas")
    public ResponseEntity<Page<TurmaDTO>> getAll(Pageable p) {
        log.info("Buscando página de turmaDTO");
        try{
            return ResponseEntity.ok(turmaService.getAll(p));
        }catch (Exception e){
            log.error("Erro ao buscar página de turmaDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Retorna uma unica turma por id")
    public ResponseEntity<TurmaDTO> getById(@PathVariable String id) {
        log.info("Buscando turmaDTO por id");
        try{
            log.info("Buscando turmaDTO no sistema");
            Optional<TurmaDTO> optionalTurmaDTO = turmaService.findById(id);
            if (optionalTurmaDTO.isPresent()) {
                log.info("turmaDTO encontrada com o id informado");
                return ResponseEntity.ok(optionalTurmaDTO.get());
            }
            log.warn("TurmaDTO não encontrada com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao buscar turmaDTO por id");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    @ApiOperation(value = "Adiciona uma nova turma")
    public ResponseEntity<TurmaDTO> create(@RequestBody @Valid TurmaDTO dto) {
        log.info("Criando turmaDTO");
        try {
            return ResponseEntity.ok(turmaService.create(dto));
        }catch (Exception e){
            log.error("Erro ao criar turmaDTO");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping(value = "/{id}")
    @ApiOperation(value = "modifica os valores de uma turma")
    public ResponseEntity update(@RequestBody @Valid TurmaDTO dto, @PathVariable String id) {
        log.info("Atualizando turmaDTO");
        try{
            log.info("Buscando turmaDTO no sistema");
            Optional<TurmaDTO> optionalTurmaDTO = turmaService.findById(id);
            if (optionalTurmaDTO.isPresent()) {
                log.info("TurmaDTO encontrada com o id informado");
                dto.setIdTurma(id);
                turmaService.update(dto);
                return ResponseEntity.ok().build();
            }
            log.warn("TurmaDTO não encontrada com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao atualizar turmaDTO");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Deleta uma turma por id")
    public ResponseEntity delete(@PathVariable String id) {
        log.info("Deletando turmaDTO");
        try{
            log.info("Buscando turmaDTO no sistema");
            Optional<TurmaDTO> optionalTurmaDTO = turmaService.findById(id);
            if (optionalTurmaDTO.isPresent()) {
                log.info("TurmaDTO encontrado com o id informado");
                turmaService.deleteById(id);
                return ResponseEntity.ok().build();
            }
            log.warn("TurmaDTO não encontrado com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao deletar turmaDTO");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
