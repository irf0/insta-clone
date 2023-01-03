import React, { useState } from "react";
import "./Header.css";
import instalogo from "../assets/instagram.png";
import pic from "../assets/irfan pic.png";
import "./ImageUpload.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { db, storage } from "../Firebase";
import { useAuth } from "../context/AuthContext";
import Signup from "./Signup";
import { useBetween } from "use-between";

//Modal for uploading

function Header({ username, likesCount }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const toast = useToast();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`image/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgressBar(progress);
      },
      (error) => {
        toast({
          title: "Some error happened during image upload.",
          status: "error",
          description: error.payload,
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      },

      () => {
        storage
          .ref("image/")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageURL: url,
              username: username,
              // likesCount: likesCount,
            });
            console.log(url);
            toast({
              title: "Successfully Uploaded",
              status: "success",
              duration: 3000,
              position: "top",
              isClosable: true,
            });
            setProgressBar(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <FormLabel htmlFor="upload-input" marginTop="40%"></FormLabel>
            <Input type="file" id="upload-input" onChange={handleChange} />
            <Button colorScheme="blue" onClick={handleUpload} marginLeft="10%">
              Upload
            </Button>
          </ModalBody>
          <Input
            type="text"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            placeholder="Enter Caption"
            width="80%"
            marginLeft="10%"
          />

          <span style={{ visibility: "hidden" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure totam
            cum, delectus mollitia saepe quasi. Maiores totam quam neque
            exercitationem incidunt hic dicta? Ea, eius voluptate laborum
            perspiciatis est officiis?
          </span>

          <Progress
            value={progressBar}
            width="80%"
            marginLeft="10%"
            max="100"
          />

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* Header begins⤵ */}
      <div className="header">
        <div className="header-items">
          <Box>
            <Link to="/">
              <img
                src={instalogo}
                alt="instagram-logo"
                style={{
                  maxHeight: "50px",
                  maxWidth: "150px",
                  padding: "3px",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>
          <Box width="20%">
            <InputGroup>
              <Input
                className="header-input"
                placeholder="Search"
                display={{ base: "none", md: "flex" }}
                marginLeft="110%"
                marginRight="-110%"
                bgColor="#e9e9e9"
                border="none"
              />
            </InputGroup>
          </Box>

          <div className="header-icons">
            <Link to="/">
              <i
                className="fa-solid fa-house"
                id="i1"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </Link>
            <i
              className="fa-brands fa-facebook-messenger"
              id="id2"
              style={{ marginLeft: "20px", fontSize: "1.5rem" }}
            ></i>
            <i
              className="fa-regular fa-square-plus"
              id="i3"
              onClick={onOpen}
            ></i>
            <i className="fa-regular fa-compass" id="i4"></i>
            <i
              className="fa-regular fa-heart"
              id="i6"
              style={{ marginLeft: "20px", fontSize: "1.5rem" }}
            ></i>
            <Avatar
              height="5%"
              width="5%"
              className="avatar-img"
              alt="This man is a super coder!"
              src={image}
            />
          </div>
        </div>

        {/* <Logout /> */}
      </div>
    </>
  );
}

export default Header;
