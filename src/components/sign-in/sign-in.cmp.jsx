import React from "react";
import "./sign-in.scss";
import {
  authFB,
  signInWithGoogle,
  signInWithFacebook,
} from "../../firebase/firebase.config";
import { Button, Input, Form } from "antd";
import { MdMailOutline } from "react-icons/md";
import { FaGoogle, FaFacebook } from "react-icons/fa";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await authFB.signInWithEmailAndPassword(email, password);
      // this.setState({ email: '', password: '' });
    } catch (error) {
      console.error(`wtf ${error}`);
    }
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in-up flex-c-c">
        <h1>Sign In</h1>
        <Form className="sign-in-up flex-c">
          <label htmlFor="email1" style={{ display: "none" }}>
            Email
          </label>
          <Input
            id="email1"
            name="email"
            value={this.state.email}
            className="input-style input-signin border-purple"
            type="email"
            label="Email"
            size="large"
            placeholder="Email"
            suffix={<MdMailOutline style={{ color: "rgba(0,0,0,.25)" }} />}
            autoComplete="true"
            onChange={this.handleChange}
          />
          <label htmlFor="password1" style={{ display: "none" }}>
            Password
          </label>
          <Input.Password
            id="password1"
            name="password"
            value={this.state.password}
            className="input-style input-signin border-purple"
            type="password"
            label="Password"
            size="large"
            placeholder="Password"
            autoComplete="true"
            onChange={this.handleChange}
          />
          <button
            className="button-defauth  g-signin mt-20"
            onClick={this.handleSubmit}
          >
          <span>Sign In</span>
          </button>
          <button
            className="button-defauth  g-signin mt-10"
            onClick={signInWithGoogle}
          >
          <span><FaGoogle />&nbsp;  Google Log In</span>
          </button>
          <button
            className="button-defauth f-signin mt-10"
            onClick={signInWithFacebook}
          >
          <span><FaFacebook />&nbsp; Facebook Log In</span>
          </button>

          <div
            className="signup-sub input-style"
            onClick={this.props.showSignUp}
          >
            New here? Sign Up
          </div>
        </Form>
      </div>
    );
  }
}

export default SignIn;
