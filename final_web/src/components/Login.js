import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState("");
    const [err, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const req = {email, password}
        setIsPending(true);

        fetch("http://localhost:8080/login",{
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
            console.log(data.token);
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
        window.location.href = "/register"
    }

    useEffect(() => {
        setEmail(localStorage.getItem("email", email))
        setPassword(localStorage.getItem("password", password))
    }, [])

    return ( 
        <div className="login">
            
            <div>
                <h1>Login</h1>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <label>Email:</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <label>Password:</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

                    {!isPending && <button type="submit">Login</button>}
                    {isPending && <button disabled>Signing in...</button>}
                    
                    <a onClick={handleLink}>Don't have an account?</a>
                    {/* <Link to="/register" onSubmit></Link> */}
                    
                </form>
            </div>
           
        </div>
     );
}
 
export default Login;