import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import axios from 'axios'
import Loader1 from '../Common/Loader1';



const Home = () => {

  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonial, setTestimonial] = useState([]);

  // For Banner 
  const getbannerData = async () => {
    const bannerapiurl = 'https://restapinodejs.onrender.com/api/banner'
    const response = await axios.get(bannerapiurl)
    setBanner(response?.data?.bannerdata)
    console.log("Data is Fetching", response);
    setLoading(false)
  }

  // For Service 
  const getservicedata = async () => {
    const serviceapiurl = 'https://restapinodejs.onrender.com/api/service'
    const response = await axios.get(serviceapiurl)
    setService(response?.data?.data)
    console.log("Service is Fetching", response);
    setLoading(false)
  }

  // For Team 
  const getteam = async () => {
    const teamapiurl = 'https://restapinodejs.onrender.com/api/team'
    const response = await axios.get(teamapiurl)
    setTeam(response?.data?.TeamMember)
    setLoading(false)
  }

  // For Testiminial 
  const gettestiminial = async () => {
    const testimonialurl = 'https://restapinodejs.onrender.com/api/testimonial'
    const response = await axios.get(testimonialurl)
    setTestimonial(response?.data?.testimonials)
    setLoading(false)
  }

  useEffect(() => {
    getbannerData()
    getservicedata()
    getteam()
    gettestiminial()
  }, [])

  if (loading) {
    return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Loader1 /></h1>;
  }

  return (
    <>
      <Layout>

        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" style={{ marginTop: '100px', height: '500px' }}>
          <ol class="carousel-indicators">
            {banner?.map((index) => (
              <li key={index} data-target="#carouselExampleCaptions" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
            ))}
          </ol>
          <div class="carousel-inner">
            {banner?.map((value, index) => (
              <div key={index} class={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={`https://restapinodejs.onrender.com/api/banner/photo/${value._id}`} class="d-block w-100" alt="..." style={{ height: '500px' }} />
                <div class="carousel-caption d-none d-md-block">
                  <h5 style={{fontSize:'70px',fontWeight:'bold'}}>{value?.title}</h5>
                  <p style={{fontSize:'20px'}}>{value?.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev" style={{ background: 'none', border: 'none' }}>
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next" style={{ background: 'none', border: 'none' }}>
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </button>
        </div>

        {/* // <!-- ======= Services Section ======= --> */}
        <section id="services" class="services section-bg">
          <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2><strong>Services</strong></h2>
            </div>

            <div class="row">

              {service?.map((item) => {
                return (
                  <>
                    <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 mb-5" data-aos="zoom-in" data-aos-delay="200" key={item._id}>
                      <div class="icon-box iconbox-orange ">
                        <h4><a href="">{item?.name}</a></h4>
                        <p>{item?.details}</p>
                      </div>
                    </div>
                  </>
                )
              })}


            </div>

          </div>
        </section>
        {/* // <!-- End Services Section --> */}

        {/*Our team start*/}
        <section id="team" class="team section-bg">
          <div class="container">

            <div class="section-title" data-aos="fade-up">
              <h2>Our <strong>Team</strong></h2>
            </div>

            <div class="row">

              {team?.map((item) => {
                return (
                  <>
                    <div class="col-lg-3 col-md-6 d-flex align-items-stretch" key={item._id}>
                      <div class="member" data-aos="fade-up" data-aos-delay="300">
                        <div class="member-img">
                          <img src={`https://restapinodejs.onrender.com/api/team/photo/${item._id}`} class="img-fluid" alt="" />
                          <div class="social">
                            <a href=""><i class="icofont-twitter"></i></a>
                            <a href=""><i class="icofont-facebook"></i></a>
                            <a href=""><i class="icofont-instagram"></i></a>
                            <a href=""><i class="icofont-linkedin"></i></a>
                          </div>
                        </div>
                        <div class="member-info">
                          <h4>{item?.name}</h4>
                          <span>{item?.possession}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}

            </div>

          </div>
        </section>
        {/*Our team end*/}

        {/*Testimonial Section*/}
        <section id="testimonials" class="testimonials section-bg">
          <div class="container">
            <div className='mx-auto' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1>Testimonial</h1>
            </div>

            <div class="row">

              {testimonial?.map((item) => {
                return (
                  <>
                    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="500" key={item?._id}>
                      <div class="testimonial-item mt-4">
                        <img src={`https://restapinodejs.onrender.com/api/testimonials/photo/${item._id}`} class="testimonial-img" alt="" />
                        <h3>{item?.name}</h3>
                        <h4>{item?.position}</h4>
                        <p>
                          <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                          {item?.talk}
                          <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                        </p>
                      </div>
                    </div>
                  </>
                )
              })}

            </div>

          </div>
        </section>
        {/*End Testimonial Section*/}

      </Layout>


    </>
  )
}

export default Home
