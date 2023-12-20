import { useState } from "react";
import useValidate from "./useValidate";
import useGetFetch from "./useGetFetch";

const CreateVote = () => {
    useValidate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [rows, setRows] = useState(2);
    const {data, isPend, err} = useGetFetch("http://localhost:8080/candidates", localStorage.getItem("token"));

    const [isPending, setIsPending] = useState(isPend);

    const [selected, setSelected] = useState([]);

    const handleClick = () => {
        setIsPending(true)

        fetch("http://localhost:8080/votes", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Token": localStorage.getItem("token")},
            body: JSON.stringify({title: title, description: description, candidates: selected})
        }).then(() => {
            window.location.href = "/votes"
        }).catch((err) => {
            console.error(err)
        })
    }

    const hanleTextArea = (e) => {
        setDescription(e.target.value); 

        const temp = description.length/40;
        if(temp > 2){
            setRows(temp)
        } else {
            setRows(2)
        }
    }

    const handleChange = (candidate) =>{
        if (selected.includes(candidate.candidate_id)){
            setSelected(selected.filter((selected) => selected !== candidate.candidate_id))
        } else {
            setSelected([...selected, candidate.candidate_id])
        }
    }
    return ( 
        <div className="CreateVote">
            <h1>Create new Vote: </h1>
            <div className="content">
                <form>
                    <label>Title:</label>
                    <input className="voteInput" type="text" required value={title} onChange={(e) => {setTitle(e.target.value)}}/>

                    <label >Description:</label>
                    <textarea rows={rows}
                    required value={description} onChange={(e) => {hanleTextArea(e)}}></textarea>
                </form>

                <div className="choose">
                    <h4>Choose candidates:</h4>
                    {isPending && <text>Loading...</text>}
                    {data && 
                    <div className="choose2">
                        {data.candidates.map((candidate) => (
                            <div className="chooseBlock">
                                <input type="checkbox" 
                                    checked={selected.includes(candidate.candidate_id)}
                                    onChange={() => {handleChange(candidate)}}
                                    id={candidate.candidate_id}/>
                                <label htmlFor={candidate.candidate_id}>&nbsp;{candidate.candidate_id}&#41;&nbsp;{candidate.fio}</label>
                            </div>
                        ))}    
                    </div>}
                </div>

                {!isPending && <button onClick={handleClick}>Create</button>}
                {isPending && <button>Creating...</button>}
            </div>
        </div>
     );
}
 
export default CreateVote;