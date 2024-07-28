import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate()

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/login",
      requestOptions
    );
    const data = await response.json();
    if(response.ok){
      localStorage.setItem("token",data.access_token);
      setErrorMessage("")
      setSuccessMessage("Login successful");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 5000);

    }
    else{
      setErrorMessage(data.detail)
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-page-left">
        <div>
          <img src="Assests/movie_logo.png" alt="logo" />
        </div>
      </div>
      <div className="login-page-right">
        <div className="close" onClick={()=>navigate('/')} >
          <img
            src="Assests/back-arrow-direction-down-right-left-up-2-svgrepo-com.png"
            alt=""
          />
        </div>
        <div className="login-page-structure">
          <div className="auth-heading">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          {successMessage && (
            <div className="login-success-message">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="login-error-message">
              {errorMessage}
            </div>
          )}
          <form>
            
            <div className="input">
              <img src="Assests/email.png" alt="" />
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <img src="Assests/password.png" alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="submit-auth">
              <div className="submit" onClick={submitLogin}>Login</div>
              <div className="submit gray" onClick={()=>navigate('/signUp')}>Sign Up</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}