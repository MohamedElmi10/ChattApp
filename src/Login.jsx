import { useState, useEffect } from "react"

const Login = () => {
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")

    const handleUsernameChange = (event) => {
        SetUsername(event.target.value)

    }
    const handlePasswordChange = (event) => {
        SetPassword(event.target.value)

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Username:", username)
        console.log("password:", password)
    }
    useEffect(() => {
        fetch('https://chatify-api.up.railway.app/csrf', {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => console.log(data.csrfToken))
    }, []);
    return (
        <>
            <label htmlFor="UserName">Username</label>
            <input
                type="text"
                id="UserName"
                value={username}
                onChange={handleUsernameChange} />
            <br />
            <label htmlFor="PassWord">Password</label>
            <input
                type="password"
                id="PassWord"
                value={password}
                onChange={handlePasswordChange} />
            <br />
            <button type="submit" onClick={handleSubmit}>Login</button>
        </>

    )
}

export default Login;