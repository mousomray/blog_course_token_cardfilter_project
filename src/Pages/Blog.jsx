import React, { useEffect, useState } from 'react';
import Layout from '../Common/Layout';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import Loader1 from '../Common/Loader1';

const Blog = () => {
    const [blog, setBlog] = useState([]); // For Blog 
    const [latestpost, setlatestPost] = useState([]); // For Latest Blog
    const [categories, setCategories] = useState([]); // For Cateory
    const [loading, setLoading] = useState(true); // For Loading 
    const [selectedCategory, setSelectedCategory] = useState(''); // For Filter 
    const [auth] = useAuth(); // Custom Hook 

    // Fetch Blog Data
    const getData = async () => {
        const apiurl = 'https://restapinodejs.onrender.com/api/allBlog';
        const mytoken = {
            headers: {
                "x-access-token": auth.token,
            },
        };
        const response = await axios.get(apiurl, mytoken);
        setBlog(response?.data?.data);
        setLoading(false);
    };

    // Fetch Latest Post Data
    const getlatestpost = async () => {
        const apiurl = 'https://restapinodejs.onrender.com/api/letest-post';
        const mytoken = {
            headers: {
                "x-access-token": auth.token,
            },
        };
        const response = await axios.get(apiurl, mytoken);
        setlatestPost(response?.data?.data);
    };

    // Fetch Category Post Data
    const getcategories = async () => {
        const apiurl = 'https://restapinodejs.onrender.com/api/showallcategory';
        const mytoken = {
            headers: {
                "x-access-token": auth.token,
            },
        };
        const response = await axios.get(apiurl, mytoken);
        setCategories(response?.data?.data);
    };

    useEffect(() => {
        getData();
        getlatestpost();
        getcategories();
    }, []);

    // Handle for category click
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    // Handle For All category 
    const handleShowAll = () => {
        setSelectedCategory('');
    };

    if (loading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Loader1 /></h1>;
    }

    //Filter area
    const filteredBlog = selectedCategory ? blog.filter(item => item.category === selectedCategory) : blog;

    return (
        <>
            <Layout>
                <section id="blog" className="blog" style={{ marginTop: '130px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 entries">
                                {filteredBlog.map((value) => (
                                    <article className="entry" data-aos="fade-up" key={value._id}>
                                        <div className="entry-img">
                                            <img src={`https://restapinodejs.onrender.com/api/blog/image/${value._id}`} alt="" />
                                        </div>
                                        <h2 className="entry-title">
                                            <a href="blog-single.html">{value?.title}</a>
                                        </h2>

                                        <div className="entry-content">
                                            <p dangerouslySetInnerHTML={{ __html: value?.postText.slice(0, 1000) }} />

                                            <div className='entry-content'>
                                                {/*Create date time area*/}
                                                <p className='text-muted'>Created date : {new Date(value?.createdAt).toLocaleDateString('en-GB')}</p>
                                                <p className='text-muted'>Created time: {new Date(value?.createdAt).toLocaleTimeString()}</p>
                                            </div>

                                            <div className="read-more">
                                                <Link to={`/blogdetails/${value?._id}`}>Read More</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="col-lg-4">
                                <div className="sidebar" data-aos="fade-left">
                                    <h3 className="sidebar-title">Categories</h3>
                                    <div className="sidebar-item categories">
                                        <ul>
                                            <li>
                                                <Link><p onClick={handleShowAll}>All Blogs</p></Link>
                                            </li>
                                            {categories.map((value) => (
                                                <li key={value?._id}>
                                                    <Link><p onClick={() => handleCategoryClick(value._id)}>
                                                        {value?.category}
                                                    </p></Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <h3 className="sidebar-title">Recent Posts</h3>
                                    <div className="sidebar-item recent-posts">
                                        {latestpost.map((value) => (
                                            <div className="post-item clearfix" key={value?._id}>
                                                <img src={`https://restapinodejs.onrender.com/api/blog/image/${value._id}`} alt="" />
                                                <h4><a href="blog-single.html">{value?.title}</a></h4>

                                                {/*Create date time area*/}
                                                <p className='text-muted'>Created date : {new Date(value?.createdAt).toLocaleDateString('en-GB')}</p>
                                                <p className='text-muted'>Created time: {new Date(value?.createdAt).toLocaleTimeString()}</p>

                                            </div>

                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout >
        </>
    );
};

export default Blog;
