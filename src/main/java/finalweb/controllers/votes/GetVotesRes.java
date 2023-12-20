package finalweb.controllers.votes;

import finalweb.database.Votes;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetVotesRes {

   List<Votes> votes;
}
