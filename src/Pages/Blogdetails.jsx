import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Common/Layout';
import Loader2 from '../Common/Loader2';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import Loader1 from '../Common/Loader1';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; // MUI Thumb Up Icon 
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; // MUI Thumb Down Icon
import CommentIcon from '@mui/icons-material/Comment'; // For Comment Icon

const initialstate = {
    name: '',
    email: '',
    comment: ''
};

const Blogdetails = () => {

    const [commentpost, setcommentPost] = useState(initialstate); // For Comment Post 
    const [blogdetails, setblogDetails] = useState([]); // For Blog Details 
    const [loadmore, setLoadmore] = useState(3); // For Loadmore 
    const [comment, setComment] = useState([]); // For Show Comment 
    const [loading, setLoading] = useState(true); // For Loading 
    const [loader, setLoader] = useState(false); // For Loading2 
    const [like, setLike] = useState({ likes: 0, unlikes: 0 }); // For Like 
    const [auth] = useAuth(); // Custom Hook 
    const { id } = useParams(); // Use Params
    const [showComments, setShowComments] = useState(false); // State to control comment visibility

    // Comment and Blog Get Handling Start

    // For Blog Details 
    const getData = async () => {

        const apiurl = `https://restapinodejs.onrender.com/api/blogdetails/${id}`;

        // Store token in a variable 
        const mytoken = {
            headers: {
                "x-access-token": auth.token,
            },
        };

        const response = await axios.get(apiurl, mytoken);
        console.log(response);
        setblogDetails(response?.data?.data);
        setLoading(false);
    };

    // For Comment
    const getComment = async () => {
        try {
            const apiurl = `https://restapinodejs.onrender.com/api/comment/${id}`;

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            const response = await axios.get(apiurl, mytoken);
            console.log("Comment data is fetching", response);
            setComment(response?.data?.post?.comment?.comments);
        } catch (error) {
            console.log("Error Fetching Data", error);
            throw error;
        }
    };

    // Like Data Fetching 
    const getlike = async () => {
        try {
            const apiurl = `https://restapinodejs.onrender.com/api/blog/like/${id}`;

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            const response = await axios.put(apiurl, {}, mytoken);
            console.log("Like Data is Fetching", response);
            setLike(response?.data);
        } catch (error) {
            console.log("Error Fetching Like Data", error);
        }
    };

    useEffect(() => {
        getData();
        getComment();
        getlike();
    }, []);

    const handleLoadmore = () => {
        setLoadmore(prev => prev + 4);
    };

    if (loading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Loader1 /></h1>;
    }

    // Comment Get Handling Done 

    // Comment Post Handling 
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setcommentPost({ ...commentpost, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            const apiurl = `https://restapinodejs.onrender.com/api/blog/${id}/comment/create`;

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            const response = await axios.post(apiurl, commentpost, mytoken);
            console.log("Comment posting API is fetching", response);
            toast.success(response?.data?.message);
            setcommentPost(initialstate);
            setLoader(false);
            getComment(); // Show Comment After Submition 
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setLoader(false);
        }
    };

    // Increase like
    const handleLike = async () => {
        try {
            const apiurl = `https://restapinodejs.onrender.com/api/blog/like/${id}`;

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            const response = await axios.put(apiurl, {}, mytoken);
            console.log("Like increased", response);
            setLike(response?.data);
        } catch (error) {
            console.log("Error increasing like", error);
        }
    };

    // Increase unlike
    const handleUnlike = async () => {
        try {
            const apiurl = `https://restapinodejs.onrender.com/api/blog/unlike/${id}`;

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            const response = await axios.put(apiurl, {}, mytoken);
            console.log("Unlike increased", response);
            setLike(response?.data);
        } catch (error) {
            console.log("Error increasing unlike", error);
        }
    };

    return (
        <>
            <Layout>
                {/* <!-- ======= Blog Section ======= --> */}
                <section id="blog" className="blog" style={{ marginTop: '130px' }}>
                    <div className="container">

                        <div className="row">

                            <div className="col-lg-12 entries">

                                <article className="entry entry-single" data-aos="fade-up">

                                    <div className="entry-img">
                                        <img src={`https://restapinodejs.onrender.com/api/blog/image/${id}`} alt="" />
                                    </div>

                                    <h2 className="entry-title">
                                        <a href="blog-single.html">{blogdetails?.title}</a>
                                    </h2>

                                    <div className="entry-content">
                                        <p

                                            dangerouslySetInnerHTML={{ __html: blogdetails?.postText }}

                                        />

                                    </div>

                                    <div className='entry-content'>
                                        {/*Create date time area*/}
                                        <p className='text-muted'>Created date : {new Date(blogdetails.createdAt).toLocaleDateString('en-GB')}</p>
                                        <p className='text-muted'>Created time: {new Date(blogdetails.createdAt).toLocaleTimeString()}</p>

                                        {/*Update date time area*/}
                                        <p className='text-muted'>Updated date : {new Date(blogdetails.updatedAt).toLocaleDateString('en-GB')}</p>
                                        <p className='text-muted'>Updated time: {new Date(blogdetails.updatedAt).toLocaleTimeString()}</p>
                                    </div>

                                    <div className="entry-footer clearfix">
                                        <div className="float-left">
                                            <i className="icofont-folder"></i>
                                            <ul className="cats">
                                                <li><a href="#">Business</a></li>
                                            </ul>

                                            <i className="icofont-tags"></i>
                                            <ul className="tags">
                                                <li><a href="#">Creative</a></li>
                                                <li><a href="#">Tips</a></li>
                                                <li><a href="#">Marketing</a></li>
                                            </ul>
                                        </div>

                                        <div className="float-right share">
                                            <a href="" title="Share on Twitter"><i className="icofont-twitter"></i></a>
                                            <a href="" title="Share on Facebook"><i className="icofont-facebook"></i></a>
                                            <a href="" title="Share on Instagram"><i className="icofont-instagram"></i></a>
                                        </div>

                                    </div>

                                </article>
                                {/* <!-- End blog entry --> */}

                                {/*Start Comment Area */}
                                <div className="comment-area">
                                    <ThumbUpIcon onClick={handleLike} style={{ cursor: 'pointer' }} /> {like?.likes} &nbsp;&nbsp;&nbsp;

                                    <ThumbDownIcon onClick={handleUnlike} style={{ cursor: 'pointer' }} /> {like?.unlikes} &nbsp;&nbsp;&nbsp;

                                    <CommentIcon onClick={() => setShowComments(!showComments)} style={{ cursor: 'pointer' }} /> {comment.length} Comments
                                    {showComments && (
                                        <div className="blog-comments mt-5" data-aos="fade-up">
                                            {comment?.slice(0, comment?.length).reverse().slice(0, loadmore).map((value) => {
                                                return (
                                                    <div id="comment" className="comment clearfix" style={{ border: '2px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                                                        <h5><b>Name : </b>{value?.name}</h5>
                                                        <p><b>Email : </b>{value?.email}</p>
                                                        <p><b>Comment : </b>{value?.comment}</p>

                                                        {/*Create date time area*/}
                                                        <p className='text-muted'>Created date : {new Date(value.createdAt).toLocaleDateString('en-GB')}</p>
                                                        <p className='text-muted'>Created time: {new Date(value.createdAt).toLocaleTimeString()}</p>

                                                        {/*Update date time area*/}
                                                        <p className='text-muted'>Updated date : {new Date(value.updatedAt).toLocaleDateString('en-GB')}</p>
                                                        <p className='text-muted'>Updated time: {new Date(value.updatedAt).toLocaleTimeString()}</p>

                                                    </div>
                                                )
                                            })}
                                            {loadmore < comment.length ? (
                                                <div className="text-center mt-3">
                                                    <Link><p onClick={handleLoadmore} style={{ height: '50px' }}>See More</p></Link>
                                                </div>
                                            ) : null}
                                            <div className="reply-form">
                                                <h4>Leave a Reply</h4>
                                                <p>Your email address will not be published. Required fields are marked * </p>
                                                <form method='post' onSubmit={handleOnSubmit}>
                                                    <div className="row">
                                                        <div className="col-md-6 form-group">
                                                            <input name="name" type="text" className="form-control" placeholder="Your Name*" value={commentpost?.name} onChange={handleOnChange} />
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <input name="email" type="text" className="form-control" placeholder="Your Email*" value={commentpost?.email} onChange={handleOnChange} />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col form-group">
                                                            <textarea name="comment" className="form-control" placeholder="Your Comment*" value={commentpost?.comment} onChange={handleOnChange}></textarea>
                                                        </div>
                                                    </div>

                                                    <button type="submit" className="btn btn-primary">
                                                        {loader ? <Loader2 /> : 'Post Comment'}
                                                    </button>

                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* <!-- End blog comments --> */}

                            </div>
                            {/* <!-- End blog entries list --> */}


                        </div>

                    </div>
                </section>
                {/* <!-- End Blog Section --> */}
            </Layout >
        </>
    )
}

export default Blogdetails;
