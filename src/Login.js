import React from "react"

const Login = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props

    return(
        <div className="recipe">
            <h1>login</h1>
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p>{emailError}</p>
                    <label>Password</label>
                    <input
                        type="password"
                        autoFocus
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>{passwordError}</p>
                    <div className="form-buttons">
                        {hasAccount ? (
                            <>
                                <button onClick={handleLogin}>Sign in</button>
                                <p>Don't have an account? 
                                    <span onClick={() => setHasAccount(!hasAccount)}>
                                        Sign up
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <button onClick={handleSignup}>Sign up</button>
                                <p>Have an account?
                                    <span onClick={() => setHasAccount(!hasAccount)}>
                                        Sign up
                                    </span>
                                </p>
                            </>
                        )}
                        
                        
                    </div>
                </div>
                
            </form>
            
        </div>
    )
}

export default Login;