package finalweb.controllers.votes;

import finalweb.database.Votes;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetVoteRes {
    Votes vote;
}
