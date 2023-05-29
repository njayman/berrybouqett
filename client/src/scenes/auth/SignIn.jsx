import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const SignIn = ({ toggleAuth, role }) => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const signIn = useSignIn();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setAuth((a) => ({ ...a, [e.target.id]: e.target.value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/auth/login/${role}`,
      {
        method: "POST",
        body: JSON.stringify(auth),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (
      signIn({
        token: data.accessToken, //Just a random token
        tokenType: "Bearer", // Token type set as Bearer
        authState: jwt_decode(data.accessToken), // Dummy auth user state
        expiresIn: 14, // Token Expriration time, in minutes
        // refreshToken: data.refreshToken,
        // refreshTokenExpireIn: 43200,
      })
    ) {
      // If Login Successfull, then Redirect the user to secure route
      navigate("/dashboard");
    } else {
      alert("Error Occoured. Try Again");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "500px",
      }}
    >
      <Stack
        component="form"
        onSubmit={onSubmit}
        spacing={2}
        sx={{ width: "400px" }}
      >
        <Typography variant="h2">Sign In</Typography>
        <TextField
          value={auth["email"]}
          placeholder="Email"
          label="Email"
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
        />
        <TextField
          value={auth["password"]}
          placeholder="Password"
          label="Password"
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <Button type="submit" color="primary" variant="contained">
          Sign In
        </Button>
        <Typography>
          Don't have an account?{" "}
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => {
              toggleAuth("signup");
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignIn;
