import React from 'react'
import Layout from '../Common/Layout'
import { useAuth } from '../Context/AuthContext'

const Dashboard = () => {

const [auth] = useAuth();

    return (
        <>
            <Layout>
                <div class="container" style={{ marginTop: '200px', marginBottom: '200px' }}>
                    <div class="row">

                        <div class="col-md-6 mx-auto">
                            <div class="card mx-auto" style={{ width: '18rem' }}>
                                <img src={auth?.photo} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">User name : {auth?.user?.name}</h5>
                                    <p class="card-text"><b>UserID : </b>{auth?.user?._id}</p>
                                    <p class="card-text"><b>Email : </b>{auth?.user?.email}</p>
                                    <p class="card-text"><b>Mobile : </b>{auth?.user?.mobile}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Dashboard
