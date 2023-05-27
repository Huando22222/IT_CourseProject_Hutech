import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { AiFillGoogleCircle, AiFillCheckCircle } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";


function Login() {
  let [searchParams] = useSearchParams();
  const [user, setUser] = useState({});
  
  const email = searchParams.get("email");
  const fullname = searchParams.get("fullname");
  const secret = searchParams.get("secret");
  const googleId = searchParams.get("googleId");
  useEffect(() => {
    if (email && fullname && secret) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          fullname,
          secret,
          googleId,
        })
      );
    }
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };
  
  return (
    <div>
    {/* <div   style={{ background: "url('/background.jpg')", height: "100vh" }} margin */}
      {/* <Container maxW={"2xl"} centerContent> */}
        {/* <Box w={"100%"} mt="4" bg={"white"} p="4" rounded={"md"}> */}
          {user && (
            <>
              <Alert status="success">
                <AlertIcon />
                <AlertTitle> welcome {user.googleId}</AlertTitle>
              </Alert>
              <button onClick={logOut}>Logout</button>
              <br />
              <Home />
            </>
          )}
          {!user && (
            <form action="http://localhost:5000/auth/google">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                <Button
                  leftIcon={<AiFillCheckCircle />}
                  colorScheme="blue"
                  variant="solid"
                  w={"100%"}
                >
                  Submit
                </Button>
                <Button
                  leftIcon={<AiFillGoogleCircle />}
                  colorScheme="red"
                  variant="solid"
                  w={"100%"}
                  type="submit"
                >
                  Google
                </Button>
            </form>
          )}
        {/* </Box> */}
      {/* </Container> */}
    </div>
  );
}

export default Login;
