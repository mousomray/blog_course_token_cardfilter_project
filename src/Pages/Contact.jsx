import React, { useState } from 'react'
import Layout from '../Common/Layout'
import Loader2 from '../Common/Loader2'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../Context/AuthContext'

const initialstate = {
  name: '',
  email: '',
  phone: '',
  message: ''
}

const Contact = () => {

  const [contact, setContact] = useState(initialstate)
  const [error, setError] = useState({});
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const validation = () => {
    let error = {}

    // Validation for Name
    if (!contact.name) {
      error.name = "Name is Required"
    } else if (contact.name.length < 3) {
      error.name = "Name mustbe atleast 3 characters"
    }

    // Validation for Email 
    if (!contact.email) {
      error.email = "Email is Required"
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(contact.email)) {
      error.email = "Email Should be abc@gmail.com pattern"
    }

    // Validation For Phone 
    if (!contact.phone) {
      error.phone = "Phone is Required"
    } else if (contact.phone.length !== 10) {
      error.phone = "Phone number must be 10 characters"
    }

    // Validation for Message 
    if (!contact.message) {
      error.message = "Please Enter Message"
    }

    return error

  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setContact({ ...contact, [name]: value })

    // Validation For Name 
    if (name === 'name') {
      if (value.length === 0) {
        setError({ ...error, name: 'Name is Required' })
        setContact({ ...contact, name: '' })
      } else {
        setError({ ...error, name: '' })
        setContact({ ...contact, name: value })
      }
    }

    // Validation For Email 
    if (name === 'email') {
      if (value.length === 0) {
        setError({ ...error, email: 'Email is Required' })
        setContact({ ...contact, email: '' })
      } else {
        setError({ ...error, email: '' })
        setContact({ ...contact, email: value })
      }
    }

    // Validation For Phone 
    if (name === 'phone') {
      if (value.length === 0) {
        setError({ ...error, phone: 'Phone is Required' })
        setContact({ ...contact, phone: '' })
      } else {
        setError({ ...error, phone: '' })
        setContact({ ...contact, phone: value })
      }
    }

    // Validation For Message 
    if (name === 'message') {
      if (value.length === 0) {
        setError({ ...error, message: 'Message is Required' })
        setContact({ ...contact, message: '' })
      } else {
        setError({ ...error, message: '' })
        setContact({ ...contact, message: value })
      }
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let ErrorList = validation()
    setError(validation())

    if (Object.keys(ErrorList).length === 0) {
      try {
        const apiurl = 'https://restapinodejs.onrender.com/api/contact/create'

        const mytoken = {
          headers: {
            "x-access-token": auth.token,
          },
        };

        const response = await axios.post(apiurl, contact, mytoken)
        if (response && response?.data?.success === true) {
          console.log("Contact Data is Fetching", response);
          toast.success(response?.data?.message)
          setLoading(false);
          setContact(initialstate)
        } else {
          console.log("Error Fetching Contact Data", response);
          toast.error(response?.data?.message)
          setLoading(false)
        }

      } catch (error) {
        console.log("Error Fetching Contact Data", error);
        toast.error(error?.response?.data?.message)
        setLoading(false)
      }
    }else{
      setLoading(false)
    }

  }

  return (
    <>

      <Layout>
        {/*Start Contact section*/}
        <div class="map-section">
          <iframe style={{ border: '0', width: '100%', height: '350px' }} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" allowfullscreen></iframe>
        </div>

        <section id="contact" class="contact">
          <div class="container">

            <div class="row justify-content-center" data-aos="fade-up">

              <div class="col-lg-10">

                <div class="info-wrap">
                  <div class="row">
                    <div class="col-lg-4 info">
                      <i class="icofont-google-map"></i>
                      <h4>Location:</h4>
                      <p>A108 Adam Street<br />New York, NY 535022</p>
                    </div>

                    <div class="col-lg-4 info mt-4 mt-lg-0">
                      <i class="icofont-envelope"></i>
                      <h4>Email:</h4>
                      <p>info@example.com<br />contact@example.com</p>
                    </div>

                    <div class="col-lg-4 info mt-4 mt-lg-0">
                      <i class="icofont-phone"></i>
                      <h4>Call:</h4>
                      <p>+1 5589 55488 51<br />+1 5589 22475 14</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <div class="row mt-5 justify-content-center" data-aos="fade-up">
              <div class="col-lg-10">
                <form method="post" role="form" class="php-email-form" onSubmit={handleOnSubmit}>
                  <div class="form-row">
                    <div class="col-md-6 form-group">
                      <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 3 chars" value={contact.name} onChange={handleOnChange} />
                      <span style={{display:'block',color:'red'}}>{error?.name}</span>
                      <div class="validate"></div>
                    </div>
                    <div class="col-md-6 form-group">
                      <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" value={contact.email} onChange={handleOnChange} />
                      <span style={{display:'block',color:'red'}}>{error?.email}</span>
                      <div class="validate"></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <input type="number" class="form-control" name="phone" id="subject" placeholder="Phone" data-rule="minlen:4" data-msg="Phone number must be 10 digits" value={contact.phone} onChange={handleOnChange}  />
                    <span style={{display:'block',color:'red'}}>{error?.phone}</span>
                    <div class="validate"></div>
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message" value={contact.message} onChange={handleOnChange}></textarea>
                    <span style={{display:'block',color:'red'}}>{error?.message}</span>
                    <div class="validate"></div>
                  </div>

                  <div class="text-center"><button type="submit">
                    {loading? <Loader2/> :'Submit'}
                  </button>
                  </div>
                </form>
              </div>

            </div>

          </div>
        </section>
        {/*End Contact section*/}
      </Layout>

    </>
  )
}

export default Contact
