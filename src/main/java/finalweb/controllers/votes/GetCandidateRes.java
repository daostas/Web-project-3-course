package finalweb.controllers.votes;

import finalweb.database.Candidates;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetCandidateRes {
    Candidates candidate;
}
