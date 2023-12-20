package finalweb.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserR extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);


}
