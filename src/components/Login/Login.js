import React, { useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_EMAIL_INPUT":
      return {
        value: action.val,
        isValid: action.val.includes("@"),
      };
    case "EMAIL_BLUR":
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    default:
      return {
        value: "",
        isValid: false,
      };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_PASSWORD_INPUT":
      return {
        value: action.val,
        isValid: action.val.trim().length > 6,
      };
    case "PASSWORD_BLUR":
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    default:
      return {
        value: "",
        isValid: false,
      };
  }
};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: true,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: true,
  });
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("useEffect run");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_EMAIL_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASSWORD_INPUT", val: event.target.value });

    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" });
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          label={"E-Mail"}
          isValid={emailState.isValid}
        />
        <Input
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label={"Password"}
          isValid={passwordState.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
