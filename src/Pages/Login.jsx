import React, { useState } from 'react'
import Layout from '../Common/Layout'
import Loader2 from '../Common/Loader2';

// Form Area 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Password } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();

const initialstate = {
    email: '',
    password: ''
}

const Login = () => {

    const [login, setLogin] = useState(initialstate);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth() // Custom Hook
    const navigate = useNavigate()

    const validation = () => {
        let error = {}

        // Validation for Email 
        if (!login.email) {
            error.email = "Email is Required"
        } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(login.email)) {
            error.email = "Email Should abc@gmail.com pattern"
        }

        // Password 
        if (!login.password) {
            error.password = "Password is Required"
        }

        return error
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setLogin({ ...login, [name]: value })

        // For Email 
        if (name === 'email') {
            if (value.length === 0) {
                setError({ ...error, email: 'Email is Required' })
                setLogin({ ...login, email: '' })
            } else {
                setError({ ...error, email: '' })
                setLogin({ ...login, email: value })
            }
        }

        // For Password 
        if (name === 'password') {
            if (value.length === 0) {
                setError({ ...error, password: 'Password is Required' })
                setLogin({ ...login, password: '' })
            } else {
                setError({ ...error, password: '' })
                setLogin({ ...login, password: value })
            }
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const ErrorList = validation()
        setError(validation())

        if (Object.keys(ErrorList).length === 0) {
            const loginurl = 'https://restapinodejs.onrender.com/api/login'

            try {
                const response = await axios.post(loginurl, login)
                if (response && response?.data?.status === 200) {
                    console.log(response);
                    toast.success(response?.data?.message)

                    // Auth start 
                    setAuth({
                        ...auth,
                        user: response.data.user,
                        token: response.data.token
                    });
                    localStorage.setItem("auth", JSON.stringify(response?.data))
                    // Auth end 

                    setLoading(false)
                    navigate("/blog")
                } else {
                    console.log(response)
                    toast.error(response?.data?.message)
                }
            } catch (error) {
                console.log("Error Fetching Data", error)
                toast.error(error?.response?.data?.message)
                setLoading(false)
            }
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 100);
        }


    }

    return (
        <>
            <Layout>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs" style={{ marginTop: '130px', marginBottom: '90px' }}>
                        <Paper elevation={5} style={{ padding: "1rem 2rem 2rem 2rem", marginTop: "2rem" }} >
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Login
                                </Typography>
                                <Box component="form" onSubmit={handleOnSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={login.email}
                                        onChange={handleOnChange}
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <span style={{ display: 'block', color: 'red' }}>{error?.email}</span>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value={login.password}
                                        onChange={handleOnChange}
                                        label="Password"
                                        type="password"
                                        id="password"

                                        autoComplete="current-password"
                                    />
                                    <span style={{ display: 'block', color: 'red' }}>{error?.password}</span>
                                    {!loading ? (<Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Login
                                    </Button>) : (<Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        <Loader2 />
                                        
                                    </Button>)}
                                    <Grid container>
                                        <Grid item>
                                            <Link href="/register" variant="body2">
                                                {"Don't have an account? Register Now"}
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

export default Login
