package finalweb.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "candidates")
public class Candidates {
    @Id
    @GeneratedValue
    Integer candidate_id;
    String fio;
    @Column(columnDefinition = "text")
    String description;
}
