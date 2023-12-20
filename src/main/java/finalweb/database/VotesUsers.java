package finalweb.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "votes_users")
public class VotesUsers {
    @EmbeddedId
    private CompositeKey compositeKey;
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompositeKey implements Serializable {
        private Integer user_id;
        private Integer vote_id;
    }
}
