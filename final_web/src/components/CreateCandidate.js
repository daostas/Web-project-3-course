import { useState } from "react";
import useValidate from "./useValidate";

const CreateCandidate = () => {
    useValidate();

    const [fio, setFio] = useState("");
    const [description, setDescription] = useState("");

    const [rows, setRows] = useState(2);
    const [isPending, setIsPending] = useState(false);

    const handleClick = () => {
        setIsPending(true)

        fetch("http://localhost:8080/candidates", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Token": localStorage.getItem("token")},
            body: JSON.stringify({fio: fio, description: description})
        }).then(() => {
            window.location.href = "/candidates"
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
    return ( 
        <div className="CreateCandidate">
            <h1>Create new Candidate:</h1>
            <div className="content">
                <form action="">
                    <label>Full Name:</label>
                    <input type="text" required value={fio} onChange={(e) => {setFio(e.target.value)}}/>
                    <label >Description:</label>
                    <textarea rows={rows}
                    required value={description} onChange={(e) => {hanleTextArea(e)}}></textarea>
                </form>
                {!isPending && <button onClick={handleClick}>Create</button>}
                {isPending && <button>Creating...</button>}
            </div>
        </div>
     );
}
 
export default CreateCandidate;