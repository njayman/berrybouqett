import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
} from "@mui/material";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import authimg from "../../assets/auth.jpg";

const ImageBox = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box component="img" src={authimg} alt="auth" style={{ height: "250px" }} />
  </Box>
);

const Auth = () => {
  const isAuthenticated = useIsAuthenticated();
  const [auth, setAuth] = useState("signin");
  const [role, setRole] = useState("admin");
  const toggleAuth = (a) => {
    setAuth(a);
  };

  if (isAuthenticated()) {
    // If authenticated user, then redirect to secure dashboard

    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <Container sx={{ mt: 8 }}>
      <Card sx={{ bgcolor: "primary" }}>
        <CardHeader
          sx={{ bgcolor: "primary" }}
          action={
            <ToggleButtonGroup
              color="primary"
              value={role}
              exclusive
              onChange={(_, val) => {
                if (val !== null) {
                  setRole(val);
                }
              }}
              aria-label="role toggle"
            >
              <ToggleButton value="admin" aria-label="Admin">
                Admin
              </ToggleButton>
              <ToggleButton value="user" aria-label="Note Taker">
                Note Taker
              </ToggleButton>
            </ToggleButtonGroup>
          }
          title="Welcome to berrybouqett"
        />
        <Typography variant="h1" align="center" sx={{ mt: 2 }}>
          Berry Bouqett Store Management Software
        </Typography>
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              {auth === "signin" ? (
                <SignIn toggleAuth={(a) => toggleAuth(a)} role={role} />
              ) : (
                <ImageBox />
              )}
            </Grid>
            <Grid item xs={6}>
              {auth === "signup" ? (
                <SignUp toggleAuth={(a) => toggleAuth(a)} role={role} />
              ) : (
                <ImageBox />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Auth;
