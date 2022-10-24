const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username, password
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input type='text' value={username} name='Username' onChange={handleUsernameChange}></input>
                </div>
                <div>
                    password
                    <input type='password' value={password} name='Password' onChange={handlePasswordChange}>
                    </input>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
export default LoginForm