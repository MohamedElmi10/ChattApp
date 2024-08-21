import { useState } from "react"

const Login = () => {
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")

    const handleUsernameChange = (event) => {
        SetUsername(event.target.value)

    }
    const handlePasswordChange = (event) => {
        SetPassword(event.target.value)

    }
    return (
        <>
            <label htmlFor="UserName">Username:</label>
            <input
                type="text"
                id="UserName"
                value={username}
                onChange={handleUsernameChange} />
            <br />
            <label htmlFor="PassWord">PassWord:</label>
            <input
                type="password"
                id="PassWord"
                value={password}
                onChange={handlePasswordChange} />
            <br />
            <button type="submit">Login</button>
        </>

    )
}

export default Login;