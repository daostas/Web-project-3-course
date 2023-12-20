package finalweb.controllers.votes;

import finalweb.database.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VotesController {

    private final SessionsR sessionsR;
    private final VotesR votesR;
    private final VotesCandidatesR votesCandidatesR;
    private final CandidatesR candidatesR;

    public void Validate(String token){
        var session = sessionsR.findByToken(token).orElseThrow();
        var time = new Timestamp(System.currentTimeMillis());

        int comparisonResult = session.getDatetime().compareTo(time);

        // Проверка, превышает ли разница 24 часа
        boolean isDifferenceGreaterThan24Hours = Math.abs(session.getDatetime().getTime() - time.getTime()) > (24 * 60 * 60 * 1000);

        if (isDifferenceGreaterThan24Hours && comparisonResult<0){
            throw new SecurityException("token expired");
        }
    }

    private static Timestamp addDaysToTimestamp(Timestamp timestamp, int daysToAdd) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(timestamp);
        calendar.add(Calendar.DAY_OF_MONTH, daysToAdd);

        return new Timestamp(calendar.getTimeInMillis());
    }

    @GetMapping("/votes")
    public GetVotesRes GetVotes(@RequestHeader("Token") String token){
        Validate(token);

        var votes = votesR.findAll();

        return new GetVotesRes(votes);
    }

    @GetMapping("/votes/{vote_id}")
    public GetVoteRes GetVotes(@RequestHeader("Token") String token, @PathVariable Integer vote_id){
        Validate(token);

        var vote = votesR.findById(vote_id).orElseThrow();

        return new GetVoteRes(vote);
    }

    @PostMapping("/votes")
    public void AddVote(@RequestHeader("Token") String token, @RequestBody AddVoteReq req){
        Validate(token);

        var time = new Timestamp(System.currentTimeMillis());
        var time2 = addDaysToTimestamp(time, 2);
        var vote = new Votes(null, req.title, req.description, time, time2);
        votesR.save(vote);

        for (var candidate: req.getCandidates()){
            var key = new VotesCandidates.CompositeKey(candidate, vote.getVote_id());
            var temp = new VotesCandidates(key);
            votesCandidatesR.save(temp  );
        }
    }

    @DeleteMapping("/votes/{vote_id}")
    public void DeleteVotes(@RequestHeader("Token") String token, @PathVariable Integer vote_id){
        Validate(token);

        votesR.deleteById(vote_id);
    }

    @GetMapping("/votes/{vote_id}/candidates")
    public GetVoteCandidatesRes GetVotesCandidates(@RequestHeader("Token") String token, @PathVariable Integer vote_id){
        Validate(token);

        var vote = votesR.findById(vote_id).orElseThrow();

        var votesCandidates = votesCandidatesR.findAll();

        List<Candidates> candidates = new ArrayList<>(List.of());

        for (var votesCandidate: votesCandidates) {
            if (Objects.equals(votesCandidate.getCompositeKey().getVote_id(), vote.getVote_id())){
                candidates.add(candidatesR.findById(votesCandidate.getCompositeKey().getCandidate_id()).orElseThrow());
            }
        }
        return new GetVoteCandidatesRes(candidates);
    }

    @GetMapping("/candidates")
    public GetCandidatesRes GetCandidates(@RequestHeader("Token") String token){
        Validate(token);

        var candidates = candidatesR.findAll();

        return new GetCandidatesRes(candidates);
    }

    @GetMapping("/candidates/{candidate_id}")
    public GetCandidateRes GetCandidates(@RequestHeader("Token") String token, @PathVariable Integer candidate_id){
        Validate(token);

        var candidate = candidatesR.findById(candidate_id).orElseThrow();

        return new GetCandidateRes(candidate);
    }

    @PostMapping("/candidates")
    public void AddCandidates(@RequestHeader("Token") String token, @RequestBody AddCandidatesReq req){
        Validate(token);

        var candidate = new Candidates(null, req.fio, req.description);
        candidatesR.save(candidate);

    }

    @DeleteMapping("/candidates/{candidate_id}")
    public void DeleteCandidates(@RequestHeader("Token") String token, @PathVariable Integer candidate_id){
        Validate(token);

        candidatesR.deleteById(candidate_id);
    }
}
