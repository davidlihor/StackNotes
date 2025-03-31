import { useRef, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { PulseLoader } from "react-spinners";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if(userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({
        username,
        password,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (error: any) {
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.data?.message);
      }
      
      if(errRef.current) errRef.current.focus();
    }
  };
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleToggle = () => setPersist((value) => !value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass}>
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />

          <div className="login__section">
            <label htmlFor="persist" className="form__persist">
              <input
                type="checkbox"
                className="form__checkbox"
                id="persist"
                onChange={handleToggle}
                checked={!!persist}
              />
              Trust This Device
            </label>

            <button className="form__submit-button">Sign In</button>
          </div>
        </form>
      </main>
      <footer>
        <Link className="home__button" to="/">
          Back to Home
        </Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
