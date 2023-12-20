import { useState, useEffect } from "react"

const useGetFetch = (url, token) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() =>{
        const abortController = new AbortController();

        fetch(url, {
            signal: abortController.signal, 
            method: "GET", 
            headers: {"Content-Type": "application/json", "Token": token},
            // body: JSON.stringify({token: token})
        })
        .then(res => {
            if (res.status !== 200){
                throw Error(res.body)
            }
            return res.json();
        })
        .then(data => {

            setData(data);
            setIsPending(false);
            setError(null);
        
        })
        .catch(err => {
            if (err.name === 'AbortError'){
                console.error(err.message);
            } else {
                setIsPending(true);
                setError(err);
            }
        })

        // return () => abortController.abort();
    }, 
    [url])

    // console.log("data: " + JSON.stringify(data))
    console.log(data)
    console.log("error: " + error)
    console.log("isPending: " + isPending)

    return {data, isPending, error};
}

export default useGetFetch;