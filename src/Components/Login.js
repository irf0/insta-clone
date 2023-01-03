import {
  Box,
  Button,
  FormControl,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import instalogo from "../assets/instagram.png";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const { login, currentUser } = useAuth();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      toast({
        title: "Successfully logged-in.",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to Login.",
        description: error.message,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      return;
    }
  };

  return (
    <div className="signup-div">
      <Box border="1px" borderColor="chakra-border-color" padding={10}>
        <VStack spacing="5px" color="black">
          <img
            src={instalogo}
            alt="insta logo"
            className="word-logo"
            style={{ maxHeight: "50px", maxWidth: "150px" }}
          />
          <FormControl>
            <Input
              isRequired
              className="signup-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              isRequired
              className="signup-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            style={{ marginTop: 15, cursor: "pointer" }}
            colorScheme="blue"
            paddingTop="0px"
            paddingBottom="0px"
            height="30px"
            width="100%"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link to="/forgotpassword" style={{ color: "blue" }}>
            Forgot Password
          </Link>

          <p>Don't have an account?</p>
          <Link to="/signup">
            <Button
              type="submit"
              style={{ marginTop: 15, cursor: "pointer" }}
              colorScheme="blue"
              paddingTop="0px"
              paddingBottom="0px"
              height="30px"
              width="100%"
            >
              Sign Up
            </Button>
          </Link>
        </VStack>
      </Box>
    </div>
  );
}

export default Login;
