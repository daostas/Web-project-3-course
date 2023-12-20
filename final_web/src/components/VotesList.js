import { Link } from 'react-router-dom';

const VotesList = ({votes}) => {
    
  return (
    <div className="VotesList">
      { votes.map((vote) => (
        <div className="VotesListBlock" key={vote.vote_id}>
            <h3>{ vote.title }</h3>
            <text>Started at: {vote.start_time}</text>
            <text>End at: {vote.end_time}</text>
            
            <div><Link to={`/votes/${vote.vote_id}`}>Click to see details -&gt;</Link></div>
        </div>
      )) }
    </div>
  );
}
 
export default VotesList;