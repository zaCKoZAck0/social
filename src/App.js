import React, {useState} from "react";
import LoginForm from "./components/loginForm";
import axios from "axios";


function App() {
    const [error, setError] = useState("");
    const [token, setToken] = useState({accessToken:sessionStorage.getItem("accessToken"),refreshToken:sessionStorage.getItem("refreshToken")});

    const Login = details => {
        axios.post(
            "http://localhost:4001/api/login",
            {
              username: details.username,
              password: details.password,
            },
            {
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
              },
              mode: "cors",
            }
          )
        .then(
            respose => {
                console.log(respose);
                sessionStorage.setItem("accessToken",respose.accessToken);
                sessionStorage.setItem("refreshToken",respose.refreshToken);
                setToken({
                    accessToken:sessionStorage.getItem("accessToken"),
                    refreshToken:sessionStorage.getItem("refreshToken")
                });
                console.log("Login");
            }
        )
        .catch(
            error => {
                console.log(error);
                setError(error);
            }
        )

    }

    const Logout = details =>{
        sessionStorage.setItem("accessToken","");
        sessionStorage.setItem("refreshToken","");
        setToken({
            accessToken:"",
            refreshToken:""
        });
        console.log("Logout");
    }

return(
    <div className="App">
        {(token.accessToken) ? (
            <div className="welcome">
            <h2>Welcome, <span></span></h2>
            <button onClick={Logout}>logout</button>
            </div>
        ) : (<LoginForm Login={Login} error={error} />)}
    </div>
)
}

export default App;