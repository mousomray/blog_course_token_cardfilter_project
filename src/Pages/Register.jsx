import React from 'react'
import Layout from '../Common/Layout'
import Loader2 from '../Common/Loader2';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

// import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

const initialstate = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    photo: ''
}

const Register = () => {

    const [register, setRegister] = useState(initialstate)
    const [image, setimage] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setRegister({ ...register, [name]: value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const apiurl = "https://restapinodejs.onrender.com/api/register"

            let formdata = new FormData();
            formdata.append("name", register.name);
            formdata.append("email", register.email);
            formdata.append("mobile", register.mobile);
            formdata.append("password", register.password);
            formdata.append("photo", image);

            const response = await axios.post(apiurl, formdata)
            if (response && response?.data?.success === true) {
                console.log("Data is Fetching", response);
                toast.success(response?.data?.message)
                setRegister(initialstate)
                setLoading(false)
                navigate("/login")
            } else {
                console.log(response);
                toast.error(response?.data?.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.msg)
            setLoading(false)
        }
    }

    return (
        <>
            <Layout>
                <ThemeProvider theme={defaultTheme} >
                    <Container component="main" maxWidth="xs" style={{marginTop:'130px'}}>
                        <Paper
                            elevation={5}
                            style={{
                                padding: "1rem 3rem",
                                marginTop: "1rem",
                                width: "35rem",
                                marginBottom: "1rem",
                            }}
                        >
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Register Now
                                </Typography>
                                <Box
                                    component="form"
                                    noValidate
                                    method="post"
                                    onSubmit={handleOnSubmit}
                                    sx={{ mt: 3 }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="name"
                                                label="Name"
                                                name="name"
                                                value={register.name}
                                                onChange={handleOnChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                value={register.email}
                                                onChange={handleOnChange}
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="mobile"
                                                label="Mobile"
                                                type="number"
                                                value={register.mobile}
                                                onChange={handleOnChange}
                                                id="mobile"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                value={register.password}
                                                onChange={handleOnChange}
                                                autoComplete="new-password"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="image"
                                                type="file"
                                                id="image"
                                                onChange={(e) => setimage(e.target.files[0])}
                                                accept="image/*"
                                            />
                                        </Grid>
                                    </Grid>
                                    {image !== "" && image !== undefined && image !== null ? (
                                        <img
                                            style={{ height: "180px" }}
                                            src={URL.createObjectURL(image)}
                                            alt=""
                                            className="upload-img"
                                        />
                                    ) : (
                                        <>{image === "" && <p>Drag or drop content here</p>}</>
                                    )}
                                    {!loading ? (
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Register
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                             <Loader2 /> 
                                            
                                        </Button>
                                    )}
                                    <Grid container>
                                        <Grid item>
                                            <Link to="/login" variant="body2">
                                                Already have an account? Log in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Paper>
                    </Container>
                </ThemeProvider>
            </Layout>
        </>
    )
}

export default Register
