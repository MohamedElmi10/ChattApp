//imports
import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"
import { Card, Header, Label, FormGroup, Input, Button } from "./styles/StyledComponents"

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [csrfToken, setCsrfToken] = useState("");
    const [jwtToken, setJwtToken] = useState("")
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    // CSRF token
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
    //Fetch all user when JWT is set
    useEffect(() => {
        if (jwtToken) {
            fetchAllUsers(jwtToken)
        }
    }, [jwtToken]);

    // Submit button
    const handleSubmit = (event) => {
        event.preventDefault();

        //check if your name exists
        const existingUser = users.find(user => user.username === username)
        if (existingUser) {
            setError("Username already exists");
            setSuccess("")
            return;
        }
        fetch("https://chatify-api.up.railway.app/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                avatar: null, // TODO: ändra till URL för bild, typ: https://i.pravatar.cc/100?img=12 
                csrfToken: csrfToken
            }),

        })
            .then(res => res.json())
            .then(data => {

                if (data.error) {
                    setError(data.error)
                    setSuccess("")
                }
                else {
                    setSuccess("Registration successful")
                    console.log("Registration successful", data)
                    navigate("/Login")
                }
                if (data.token) {
                    setJwtToken(data.token)
                    fetchAllUsers(data.token)
                }
            })

            .catch((error) => {
                console.error("Error during registration:", error)
            })

    }
    //Fetching the users
    const fetchAllUsers = (token) => {
        fetch("https://chatify-api.up.railway.app/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                console.log("Fetched users:", data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error)
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Header>Sign up</Header>
                <Card>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email..."
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="UserName">Username</Label>
                        <Input
                            type="text"
                            id="UserName"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username..."
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="PassWord">Password</Label>
                        <Input
                            type="password"
                            id="PassWord"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your Password..."
                        />
                    </FormGroup>
                    <Button type="submit" >Register</Button>
                </Card>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "Green" }}>{success}</p>}
        </>

    )

}
export default Register