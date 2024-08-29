import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


import { Card, Header, Label, FormGroup, Input, Button, Hr, SignUp } from "./styles/StyledComponents"
const Login = () => {
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [jwtToken, setJwtToken] = useState("")
    const [csrfToken, setCsrfToken] = useState("")
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();

    const HandleUsernameChange = (event) => {
        SetUsername(event.target.value)

    }
    const HandlePasswordChange = (event) => {
        SetPassword(event.target.value)

    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        try {
            const tokenResponse = await fetch("https://chatify-api.up.railway.app/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    csrfToken: csrfToken
                }),
            });

            if (!tokenResponse.ok) {
                console.error(`Error fetching token: ${tokenResponse.status} ${tokenResponse.statusText}`);
                throw new Error("Error fetching token");
            }

            const tokenData = await tokenResponse.json();
            const token = tokenData.token;

            if (token) {
                setJwtToken(token);


                Navigate("/Dashboard");
            } else {
                setError("Failed to retrieve token");
            }
        } catch (error) {
            console.error("Error During Login:", error);
            setError("Invalid credentials");
        }
    };
    const HandleSignUpClick = () => {
        Navigate("/register")
    }
    useEffect(() => {
        fetch('https://chatify-api.up.railway.app/csrf', {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                setCsrfToken(data.csrfToken)
                console.log("CSRF Token fetched:", data.csrfToken)
            })
            .catch((error) => {
                console.error("Error Fetching CSRF token:", error)
            })

    }, []);

    return (
        <>
            <Header>Login</Header>
            <Card>
                <FormGroup>
                    <Label htmlFor="UserName">Username</Label>
                    <Input
                        type="text"
                        id="UserName"
                        value={username}
                        onChange={HandleUsernameChange}
                        placeholder="Enter your username..." />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="PassWord">Password</Label>
                    <Input
                        type="password"
                        id="PassWord"
                        value={password}
                        onChange={HandlePasswordChange}
                        placeholder="Enter your password..." />
                </FormGroup>
                <Button type="submit" onClick={HandleSubmit}>Login</Button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Hr />
                <SignUp onClick={HandleSignUpClick}>Sign up</SignUp>
            </Card>
        </>

    )
}

export default Login;