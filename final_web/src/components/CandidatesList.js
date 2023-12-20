import { Link } from 'react-router-dom';

const CandidatesList = ({candidates}) => {
    
  return (
    <div className="CandidatesList">
      { candidates.map((candidate) => (
        <div className="CandidatesListBlock" key={candidate.candidate_id}>
            <h3>{ candidate.fio }</h3>
            <div><Link to={`/candidates/${candidate.candidate_id}`}>Click to see details -&gt;</Link></div>
        </div>
      )) }
    </div>
  );
}
 
export default CandidatesList;