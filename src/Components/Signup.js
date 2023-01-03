import {
  Box,
  Button,
  FormControl,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import instalogo from "../assets/instagram.png";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, firebaseApp } from "../Firebase";
import Header from "./Header";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { user, setUser } = useState();
  // const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
        navigate("/");
        console.log(newUser);
      } else {
        setUser(null);
        navigate("/signup");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast({
        title: "Please enter all fields.",
        status: "warning",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((newUser) => {
          return newUser.user.updateProfile({
            displayName: username,
          });
        });
      toast({
        title: "Account Created Successfully.",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Failed to create account.",
        description: error.message,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
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
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              className="signup-input"
              type="text"
              placeholder="Fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormControl>
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
            onClick={handleSignUp}
          >
            Signup
          </Button>

          <p>Have an account?</p>
          <Link to="/login">
            <Button
              type="submit"
              style={{ marginTop: 15, cursor: "pointer" }}
              colorScheme="blue"
              paddingTop="0px"
              paddingBottom="0px"
              height="30px"
              width="100%"
            >
              Log In
            </Button>
          </Link>
        </VStack>
      </Box>
    </div>
  );
}

export default Signup;
