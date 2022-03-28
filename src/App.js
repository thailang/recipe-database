import { fireEvent } from "@testing-library/react";
import {useState, useEffect} from "react";
import fire from "./firebase.config"
import Login from "./Login";
import RecipeApp from "./recipeApp";

const App = () => {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [hasAccount, setHasAccount] = useState("")

    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }

    const clearErrors = () => {
        setEmailError('')
        setPasswordError('')
    }

    const handleLogin = () => {
        clearErrors()
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                    case "auth/wrong-password":
                        setPassword(err.message);
                    break;
                }
            })
    }

    const handleSignup = () => {
        clearErrors()
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                    case "auth/weak-password":
                        setPassword(err.message);
                    break;
                }
            })
    }

    const handleLogout = () => fire.auth().signout()

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs()
                setUser(user)
            } else {
                setUser("")
            }
        })
    }

    useEffect(() => { authListener()}, [] )

    return(
        <div className="recipes">
            {console.log(user)}
            
            {/* {user ? ( */}
                <RecipeApp />
            {/* ) : ( */}
                {/* <Login 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError} */}
                />
            {/* )} */}
        </div>
    )
}

export default App;