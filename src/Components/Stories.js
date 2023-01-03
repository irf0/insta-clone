import { Avatar, Box } from "@chakra-ui/react";
import React from "react";

function Stories() {
  return (
    <div>
      <Box
        maxWidth="500px"
        borderRadius="10px"
        marginLeft="20%"
        mb="15px"
        marginTop="5%"
        border="1px solid lightGrey"
        alignItems="center"
        padding="15px"
        display="flex"
        flexDirection="row"
      >
        <Avatar
          border="3px solid #E1306C"
          src="https://www.supercars.net/blog/wp-content/uploads/2022/02/Ferrari-SF90-Stradale-1.jpg"
          width="70px"
          height="70px"
        />
      </Box>
    </div>
  );
}

export default Stories;
