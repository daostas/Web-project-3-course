import { useParams } from "react-router-dom";
import useGetFetch from "./useGetFetch";
import useValidate from "./useValidate";
import { useState } from "react";
import VotesCandidatesList from "./VotesCandidatesList";

const VoutesDetails = () => {
    useValidate();

    const { vote_id } = useParams();
    let { data, isPending, err } = useGetFetch('http://localhost:8080/votes/' + vote_id, localStorage.getItem("token"));
    const [ deleting, setDeleting] = useState(false);

    const handleClick = () => {
        setDeleting(true)
        fetch('http://localhost:8080/votes/' + vote_id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "Token": localStorage.getItem("token")}
        }).then(() =>{
            console.log("vote deleted")
            isPending = false;

            window.location.href = "/votes"
        })
        .catch((error) => {
            isPending = true;
            err = error;
        })
    };
    return (
    
        <div className="CandidateDetails">
            <h1>Vote Details: </h1>
            <div className="content">
                { isPending && <div>Loading...</div> }
                { err && <div>{ err }</div> }
                { data && 
                    <div>
                        <text><b>Id:</b> { data.vote.vote_id}</text><br />
                        <text><b>Title:</b> {data.vote.title}</text><br />  
                        <text><b>Description:</b> {data.vote.description} </text><br />
                    </div>                
                }
                { data && <VotesCandidatesList vote_id={data.vote.vote_id}></VotesCandidatesList>}
                
                {!deleting && <button onClick={handleClick}>Delete</button>}
                {deleting && <button>Deleting...</button>}
            </div>
        
        </div>
    );
}
 
export default VoutesDetails;