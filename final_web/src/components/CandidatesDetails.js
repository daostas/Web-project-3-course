import { useParams, useHistory } from "react-router-dom";
import useGetFetch from "./useGetFetch";
import useValidate from "./useValidate";
import { useState } from "react";

const CandidatesDetails = () => {
    useValidate();

    const { candidate_id } = useParams();
    let { data, isPending, err } = useGetFetch('http://localhost:8080/candidates/' + candidate_id, localStorage.getItem("token"));
    const [deleting, setDeleting] = useState(false);

    const history = useHistory()

    const handleClick = () => {
        setDeleting(true)
        fetch('http://localhost:8080/candidates/' + candidate_id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "Token": localStorage.getItem("token")}
        }).then(() =>{
            console.log("candidate deleted")
            isPending = false;

            window.location.href = "/candidates"
        })
        .catch((error) => {
            isPending = true;
            err = error;
        })
    };
    return (
    
        <div className="CandidateDetails">
            <h1>Candidate Details: </h1>
            <div className="content">
                { isPending && <div>Loading...</div> }
                { err && <div>{ err }</div> }
                { data && 
                    <div>
                        <text><b>Id:</b> { data.candidate.candidate_id}</text><br />
                        <text><b>Full name:</b> {data.candidate.fio}</text><br />  
                        <text><b>Description:</b> {data.candidate.description} </text><br />
                    </div>                
                }

                {!deleting && <button onClick={handleClick}>Delete</button>}
                {deleting && <button>Deleting...</button>}
            </div>
        
        </div>
    );
}
 
export default CandidatesDetails;