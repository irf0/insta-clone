import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Logout() {
  const { logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      toast({
        title: "Cannot logout.",
        description: error.message,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Button
        type="submit"
        style={{ marginTop: 15, cursor: "pointer" }}
        colorScheme="red"
        paddingTop="0px"
        paddingBottom="0px"
        height="30px"
        // width="100%"
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </div>
  );
}

export default Logout;
