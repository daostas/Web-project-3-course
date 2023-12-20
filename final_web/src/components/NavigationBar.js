const NavigationBar = () => {
    const handleClick = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    return ( 
        <nav className="navigationBar">
            <h1>Online Voting</h1>
            <div className="links">
                <a href="/votes">Votes</a>
                <a href="/create_votes">New vote</a>
                <a href="/candidates">Candidates</a>
                <a href="/create_candidates">New candidate</a>
                <a style={{
                    color: "white",
                    backgroundColor: "#f1356d", 
                    borderRadius: "8px", 
                    cursor: "pointer"
                }} onClick={handleClick}>Log out</a>
            </div>
        </nav>

     );
}
 
export default NavigationBar;