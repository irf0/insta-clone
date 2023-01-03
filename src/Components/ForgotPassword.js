import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import instalogo from "../assets/instagram.png";
import { useAuth } from "../context/AuthContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const toast = useToast();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast({
        title: "Check Your Inbox",
        status: "info",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to Reset Password.",
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleReset}
          >
            Reset Password
          </Button>
        </VStack>
      </Box>
    </div>
  );
}

export default ForgotPassword;
