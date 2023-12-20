package finalweb.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VotesCandidatesR extends JpaRepository<VotesCandidates, VotesCandidates.CompositeKey> {
}
