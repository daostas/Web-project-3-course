import { Link } from 'react-router-dom';
import useGetFetch from "./useGetFetch";


const VotesCandidatesList = ({vote_id}) => {
    const url = 'http://localhost:8080/votes/' + vote_id + "/candidates"
    console.log("url:" + url);
    const { data, isPending, err } = useGetFetch(url, localStorage.getItem("token"));
    return (
        <div className="VotesCandidatesList">
            {console.log("data:" + JSON.stringify(data))}
        { data && data.candidates.map((candidate) => (
            <div className="VotesCandidatesListBlock" key={candidate.candidate_id}>
                <h3>{ candidate.fio }</h3>
                <div><Link to={`/candidates/${candidate.candidate_id}`}>Click to see details -&gt;</Link></div>
            </div>
        )) }
        </div>
    );
}
 
export default VotesCandidatesList;