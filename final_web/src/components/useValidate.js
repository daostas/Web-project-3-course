import { useState } from "react";

const useValidate = () =>{

    const [token, setToken] = useState(localStorage.getItem("token"));

    if (token === null || token === ""){
        window.location.href = "/login";
    }
}

export default useValidate;