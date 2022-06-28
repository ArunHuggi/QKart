import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import  "../ipConfig.json"
import { useHistory } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword:""
  });

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const textData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values=>({...values,[name]:value}))
  }
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    // return await fetch("http://13.234.229.86:8082/auth/register", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
  };


  const submitButton = async (formData) => {
     //formData.preventDefault();
    if (validateInput(formData)) {
      setLoading(true);
      try {
        let response = await axios.post(`${config.endpoint}/auth/register`,
          {
            username: formData.username,
            password: formData.password
          });
        setLoading(false);
        setFormData({
          username: "",
          password: "",
          confirmpassword: ""
        });
        if (response.status === 201) {
          enqueueSnackbar("Registered successfully", { variant: "success" });
          history.push("/login");
        } else {
          enqueueSnackbar("something went wrong", { variant: "error" });
          return false;
        }
      
      } catch (e) {
        enqueueSnackbar(e.response.data.message,{variant:"error"})
      }
    }
  }

  //console.log(history);
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("username is a required field", { variant: "warning" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("username should not be less than 6 characters", { variant: "warning" });
      return false;
    }
    if (data.password.length === 0) {
      enqueueSnackbar("password is a required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("password should not be less than 6 characters", { variant: "warning" });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("do not match", { variant: "error" });
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            value={formData.username}
            onChange={textData}
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={textData}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={textData}
            type="password"
            fullWidth
          />
           <Button className="button" variant="contained" onClick={()=>submitButton(formData)}>
            Register Now
           </Button>
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
