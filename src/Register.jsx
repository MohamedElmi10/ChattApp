import { useState, useEffect } from "react"

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [csrfToken, setCsrfToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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
    const handleSubmit = (event) => {
        event.preventDefault();
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
                }

            })
            .catch((error) => {
                console.error("Error during registration:", error)
            })

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>register</h2>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="UserName">Username</label>
                <input
                    type="text"
                    id="UserName"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="PassWord">Password</label>
                <input
                    type="password"
                    id="PassWord"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit" >Register</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "Green" }}>{success}</p>}
        </>

    )

}
export default Register