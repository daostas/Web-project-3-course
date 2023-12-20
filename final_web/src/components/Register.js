import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState("");
    const [err, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const req = {email, password}
        setIsPending(true);

        fetch("http://localhost:8080/register",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(req)
        })
        .then(res => {
            if (res.statusCode === 200) {
                throw Error(res.body)
            } 
            return res.json();
        })
        .then(data => {
            console.log(data);
            setToken(data.token);
            setError(null);
            setIsPending(false);

            localStorage.setItem("token", data.token);
            localStorage.setItem("email", email)
            localStorage.removeItem("password")

            window.location.href = "/votes"
        })
        .catch(err => {
            console.error(err.message);
            setError(err.message);
            setIsPending(true);
        })

    };

    const handleLink = () => {
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)
        window.location.href = "/login"
    }

    useEffect(() => {
        setEmail(localStorage.getItem("email", email))
        setPassword(localStorage.getItem("password", password))
    }, [])

    return ( 
        <div className="Register">
            
            <div>
                <h1>Register</h1>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <label>Email:</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <label>Password:</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

                    {!isPending && <button type="submit">Sign Up</button>}
                    {isPending && <button disabled>Createting an account...</button>}
                    
                    <a onClick={handleLink}>Already have an accout?</a>
                    {/* <Link to="/login">Already have an accout?</Link> */}
                    
                </form>
            </div>
           
        </div>
     );
}
 
export default Register;