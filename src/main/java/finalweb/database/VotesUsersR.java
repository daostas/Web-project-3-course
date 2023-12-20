package finalweb.database;

import org.hibernate.query.criteria.JpaSearchedCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VotesUsersR extends JpaRepository<VotesUsers, VotesUsers.CompositeKey> {
}
