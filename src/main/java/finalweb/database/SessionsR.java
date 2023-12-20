package finalweb.database;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionsR extends JpaRepository<Sessions, Integer> {
    Optional<Sessions> findByToken(String token);

}
