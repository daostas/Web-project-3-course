package finalweb.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "sessions"
)
public class Sessions {
    @Id
    Integer user_id;
    String token;
    @Column(columnDefinition = "timestamp default now()", nullable = false)
    Timestamp datetime;
}
