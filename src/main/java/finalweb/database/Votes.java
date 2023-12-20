package finalweb.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "votes")
public class Votes {
    @Id
    @GeneratedValue
    Integer vote_id;
    String title;
    String description;
    @Column(columnDefinition = "timestamp default now()", nullable = false)
    Timestamp start_time;
    @Column(columnDefinition = "timestamp default now()", nullable = false)
    Timestamp end_time;
}
