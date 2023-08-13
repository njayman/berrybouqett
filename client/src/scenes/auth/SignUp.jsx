import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const SignUp = ({ toggleAuth, role }) => {
    const [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setInfo((a) => ({ ...a, [e.target.id]: e.target.value }));
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL}/auth/signup`,
            {
                method: "POST",
                body: JSON.stringify({ ...info, role }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            const { message } = await response.json();
            enqueueSnackbar(message, {
                variant: "error"
            });
            return;
        }
        const data = await response.json();
        console.log(data);
        if (data) {
            toggleAuth("signin");
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
                <Typography variant="h2">Sign Up as {role === "admin" ? "Admin" : "Note taker"}</Typography>
                <TextField
                    value={info["name"]}
                    placeholder="Name"
                    label="Name"
                    type="name"
                    name="name"
                    id="name"
                    onChange={handleChange}
                />
                <TextField
                    value={info["email"]}
                    placeholder="Email"
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                />
                <TextField
                    value={info["password"]}
                    placeholder="Password"
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                />
                <Button type="submit" color="primary" variant="contained">
                    Sign Up
                </Button>
                <Typography>
                    Already have an account?{" "}
                    <Link
                        component="button"
                        type="button"
                        variant="body2"
                        color="primary"
                        onClick={() => {
                            toggleAuth("signin");
                        }}
                    >
                        Sign In
                    </Link>
                </Typography>
            </Stack>
        </Box>
    );
};

export default SignUp;
