import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useAuth } from '../Context/AuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Layout from '../Common/Layout';
import Loader1 from '../Common/Loader1'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





const Course = () => {

    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [auth] = useAuth()

    const getCourse = async () => {
        try {
            const apiurl = 'https://restapinodejs.onrender.com/api/course'
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };
            const response = await axios.get(apiurl, mytoken)
            console.log("Fetching Course Data", response);
            setCourse(response?.data?.Courses)
            setLoading(false)
        } catch (error) {
            console.log("Error Fetching Course Data", error);
            setLoading(false)
        }
    }
    useEffect(() => {
        getCourse()
    }, [])


    if (loading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Loader1 /></h1>;
    }

    return (

        <Layout>

            <TableContainer component={Paper} style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="centre">Image</StyledTableCell>
                            <StyledTableCell align="centre">Name</StyledTableCell>
                            <StyledTableCell align="centre">Requirement</StyledTableCell>
                            <StyledTableCell align="centre">Duration</StyledTableCell>
                            <StyledTableCell align="centre">Fees</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {course?.map((value) => {
                            return (
                                <>
                                    <StyledTableRow key={value._id}>
                                        <StyledTableCell align="centre"><img src={`https://restapinodejs.onrender.com/api/course/photo/${value?._id}`} alt="" style={{height:'50px'}} /></StyledTableCell>
                                        <StyledTableCell align="centre">{value?.name}</StyledTableCell>
                                        <StyledTableCell align="centre">{value?.requirement}</StyledTableCell>
                                        <StyledTableCell align="centre">{value?.duration}</StyledTableCell>
                                        <StyledTableCell align="centre">{value?.fees}</StyledTableCell>
                                    </StyledTableRow>
                                </>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
}
export default Course