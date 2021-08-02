import { useState } from "react";
import { Button, Input } from "../../components";
import "./Login.css";
import { FaLock, FaUserAlt } from 'react-icons/fa'
import { useDispatch } from "react-redux";
import * as actions from '../../store/actions'
import { bindActionCreators } from "redux";

function Login() {
  const [email, setEmail] = useState("admin@admin.com")
  const [password, setPassword] = useState("123456")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState(false)
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("")
  const dispatch = useDispatch()
  const action = bindActionCreators(actions, dispatch)


  const submit = () => {
    if (!email || !password) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, [3000])
    } else {
      setLoading(true)
      action.login(email.trim(), password.trim()).then((res) => {
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        setFirebaseError(true)
        setTimeout(() => {
          setFirebaseError(false)
        }, [3000])
        setFirebaseErrorMessage(err)
      })
    }
  }
  const handleKeypress = e => {
    if (e.keyCode === 13) {
      submit();
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="login-card">
              <div style={{ textAlign: 'center' }}>
                <h1 className="color">Login</h1>
              </div>

              {error && <div class="alert alert-danger" role="alert">
                Invalid Email or Password
              </div>}
              {firebaseError && <div class="alert alert-danger" role="alert">
                {firebaseErrorMessage}
              </div>}

              <div className="mt-20">
                <Input
                  onKeyDown={handleKeypress}
                  value={email}
                  onChange={setEmail}
                  Component={<FaUserAlt size="25" color={"var(--bg)"} />}
                  placeholder="Username"
                />
              </div>

              <div className="mt-20">
                <Input
                  onKeyDown={handleKeypress}
                  value={password}
                  onChange={setPassword}
                  Component={<FaLock size="25" color={"var(--bg)"} />}
                  type="password" placeholder="Password" />
              </div>

              <div className="mt-20">
                <Button
                  onClick={submit}
                  paddingLeft={5} paddingRight={5} paddingTop={5} paddingBotttom={5}
                  fontSize={20}
                  children="Log In"
                  loader={loading}
                />
              </div>

              <div className="mt-10 login__forgotPassword">
                <span style={{ color: 'var(--bg)' }}>Forgot Password?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


