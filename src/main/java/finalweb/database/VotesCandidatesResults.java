package finalweb.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "votes_candidates_results")
public class VotesCandidatesResults {
    @Id
    Integer id;
    Integer vote_id;
    Integer candidate_id;
}
