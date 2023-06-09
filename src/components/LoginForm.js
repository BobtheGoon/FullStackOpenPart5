const LoginForm = ({username, setUserName, password, setPassword, handleLogin}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input 
          type='text'
          value={username}
          name='Username'
          onChange={({target}) => setUserName(target.value)}
        />
      </div>

      <div>
        Password
        <input 
          type='password'
          value={password}
          name='Password'
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Log in</button>
    </form>
  </div>
)

export default LoginForm