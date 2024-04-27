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
    user_id: '',
    password: ''
}

const Updatepassword = () => {

    const [update, setUpdate] = useState(initialstate);
    const [loading, setLoading] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setUpdate({ ...update, [name]: value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const updateUrl = "https://restapinodejs.onrender.com/api/update-password"

        const mytoken = {
            headers: {
                "x-access-token": auth.token,
            },
        };

        try {
            const response = await axios.post(updateUrl, update, mytoken)
            if (response && response?.data?.success === true) {
                console.log(response);
                toast.success(response?.data?.msg)
                setLoading(false)
                setUpdate(initialstate)
                navigate('/dashboard')
            } else {
                console.log(response);
                toast.error(response?.data?.msg)
                setLoading(false)
            }
        } catch (error) {
            console.log("Error doing update", error);
            setLoading(false)
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
                                    Update Password
                                </Typography>
                                <Box component="form" onSubmit={handleOnSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="user_id"
                                        label="User Id"
                                        name="user_id"
                                        value={update.email}
                                        onChange={handleOnChange}
                                        autoComplete="user_id"
                                        autoFocus
                                    />
                                    
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value={update.password}
                                        onChange={handleOnChange}
                                        label="Password"
                                        type="password"
                                        id="password"

                                        autoComplete="current-password"
                                    />
                                    
                                    {!loading ? (<Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Update
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

export default Updatepassword
