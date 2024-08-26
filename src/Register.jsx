//imports
import { useState, useEffect } from "react"
import styled from "styled-components";
import { useNavigate } from "react-router-dom"

const Card = styled.div`

    width: 330px;
    height: 490px;
    background-color: #000000;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    overflow: hidden;
    padding: 26px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 5px;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
    `;
const Header = styled.p`
    font-weight: 700;
    line-height: 68px;
    font-size: 46px;
    color: #F2F3F4;
`

const Label = styled.label`
    font-size: 20px;
    font-weight: 500;
    color: #ffff;
    margin-bottom: 8px;
    width: 50%;
    
 
`
const FormGroup = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap:10px;
    margin-bottom: 15px;
`
const Input = styled.input`
  padding: 8px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width:100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;


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
                <Header>Register</Header>
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