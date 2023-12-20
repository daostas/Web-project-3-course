import VotesList from "./VotesList";
import useGetFetch from "./useGetFetch";
import useValidate from "./useValidate";

const Votes = () => {

    useValidate();
    const { data, isPending, err} = useGetFetch("http://localhost:8080/votes", localStorage.getItem("token"))

    return ( 
        <div className="Votes">
            <h1>Votes Page: </h1>
            <div className="VotesContent">
               
                {err && <div></div>}
                {isPending && <div>Loading...</div>}
                {data && <VotesList votes={data.votes}></VotesList>}
            </div>
        </div>
     );
}
 
export default Votes;