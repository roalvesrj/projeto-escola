package br.com.t2m.escola.repositorys;

import br.com.t2m.escola.models.Professor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProfessorRepository extends MongoRepository<Professor, String> {

    Optional<Professor> findByCpf(String cpf);
}
