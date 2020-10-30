package br.com.t2m.escola.repositorys;

import br.com.t2m.escola.models.Aluno;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AlunoRepository extends MongoRepository<Aluno, String> {

    Optional<Aluno> findByCpf(String cpf);
}
