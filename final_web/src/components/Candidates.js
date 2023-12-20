import useGetFetch from "./useGetFetch";
import CandidatesList from "./CandidatesList";
import useValidate from "./useValidate";

const Votes = () => {
    useValidate();
    const { data, isPending, err} = useGetFetch("http://localhost:8080/candidates", localStorage.getItem("token"))

    return ( 
        <div className="Candidates">
            <h1>Candidates Page: </h1>
            <div className="CandidatesContent">
                {err && <div></div>}
                {isPending && <div>Loading...</div>}
                {data && <CandidatesList candidates={data.candidates}></CandidatesList>}
            </div>
        </div>
     );
}
 
export default Votes;