import React,{ useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate=useNavigate()

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/register",
      requestOptions
    );
    const data = await response.json();
    if(response.ok){
      setErrorMessage("");
      setSuccessMessage(data.detail);
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, 5000);
    }
    else{
      setErrorMessage(data.detail)
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-page-left">
        <div>
          <img src="Assests/movie_logo.png" alt="logo" />
        </div>
      </div>
      <div className="sign-up-page-right">
        <div className="close" onClick={()=>navigate('/')}>
          <img
            src="Assests/back-arrow-direction-down-right-left-up-2-svgrepo-com.png"
            alt=""
          />
        </div>
        <div className="sign-up-page-structure">
          <div className="auth-heading">
            <div className="text">SignUp</div>
            <div className="underline"></div>
            {successMessage && (
            <div className="sign-up-success-message">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="sign-up-error-message">
              {errorMessage}
            </div>
          )}
          </div>
          
          <form>
            <div className="input">
              <img src="Assests/person.png" alt="" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
              <div className="submit gray" onClick={()=>navigate('/login')}>Login</div>
              <div className="submit" onClick={submitRegistration}>Sign Up</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
