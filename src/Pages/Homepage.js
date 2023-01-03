import { Avatar, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { collection, getDocs } from "firebase/firestore";
import Posts from "../Components/Posts";
import Stories from "../Components/Stories";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import Signup from "../Components/Signup";

function Home() {
  const { currentUser } = useAuth();
  // const { user } = Signup();
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, "posts")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(newData);
      console.log(posts, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div style={{ objectFit: "contain" }}>
      <Stories />
      <Header />

      {/* <MobileFooter /> */}
      {/* <ImageUpload /> */}

      {posts.map((post) => (
        <Posts
          username={post.username}
          caption={post.caption}
          imageURL={post.imageURL}
          // likesCount={post.likesCount}
          key={post.id}
        />
      ))}
    </div>
  );
}

export default Home;
