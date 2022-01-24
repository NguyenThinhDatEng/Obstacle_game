import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { handleSignUpAPI } from "../../services/studentServices";
import "./signup.css";

const SignUp = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    errMessage: "",
  });

  const history = useHistory();
  // useEffect(() => {
  //   if (localStorage.getItem("username")) {
  //     history.push("/ready");
  //   }
  // });

  const handleUsername = (e) => {
    setState((previousState) => {
      return { ...previousState, errMessage: "" };
    });
    setState((previousState) => {
      return { ...previousState, username: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setState((previousState) => {
      return { ...previousState, errMessage: "" };
    });
    setState((previousState) => {
      return { ...previousState, password: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((previousState) => {
      return { ...previousState, errMessage: "" };
    });
    // check input
    if (!state.username || !state.password) {
      setState((previousState) => {
        return { ...previousState, errMessage: "Missing required parameter!" };
      });
      return;
    }
    console.info(state.password);
    if (state.password != "seeenglish2022") {
      setState((previousState) => {
        return { ...previousState, errMessage: "Wrong password" };
      });
      return;
    }
    // call api
    try {
      setState((previousState) => {
        return {
          ...previousState,
          errMessage: "Creating...",
        };
      });
      await handleSignUpAPI(state).then((response) => {
        console.log(JSON.stringify(response));
        if (response.data) {
          localStorage.setItem("username", JSON.stringify(response.data));
          history.push("/ready");
        }
      });
    } catch (error) {
      setState((previousState) => {
        return {
          ...previousState,
          errMessage: error.response.data.msg,
        };
      });
    }
  };

  return (
    <div>
      <div className="container-fluid bg login-container">
        <main className="signup-form">
          <form onSubmit={handleSubmit}>
            <h1 className="login-title mb-4" style={{ color: "green" }}>
              create username
            </h1>
            {/* username */}
            <div className="form-group row mb-3">
              <div className="col-sm-2 col-form-label">
                <label htmlFor="username" style={{ fontSize: "18px" }}>
                  Username
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={handleUsername}
                />
              </div>
            </div>
            {/* password */}
            <div className="form-group row mb-3">
              <div className="col-sm-2 col-form-label">
                <label htmlFor="password" style={{ fontSize: "18px" }}>
                  Password
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  placeholder="password provided by the organizer"
                  onChange={handlePassword}
                />
              </div>
            </div>
            <div className="form-group row mb-3 text-center">
              <div className="col-sm-12">
                <div
                  style={
                    state.errMessage.charAt(0) === "C"
                      ? { color: "yellow" }
                      : { color: "red" }
                  }
                  className="errMessage"
                >
                  {state.errMessage}
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
export default SignUp;
