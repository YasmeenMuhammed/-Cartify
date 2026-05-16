import React, { useState } from 'react'
import { FaFacebookF, FaGoogle, FaShieldAlt, FaStar, FaUserPlus } from 'react-icons/fa'
import { FaTruckFast } from 'react-icons/fa6'
import authorImg from './../../assets/Images/review-author.png'
import { Link, useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as yup from "yup"
import { toast } from 'react-toastify'
import { sendDataToSignUp } from '../../services/auth'
import { checkPasswordStrength } from '../../utils/password-strength'

export default function SignUp() {

  const navigate = useNavigate();

  const [isExistError, setIsExistError] = useState(null)


  const phoneRejex = /^(\+20|0)?1[0125][0-9]{8}$/;
  const passwordRejex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/


  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    email: yup.string().required('Email is Required').email('Email is Invalid'),
    phone: yup.string().required('phone is Required').matches(phoneRejex, 'We accept egyptian numbers only'),
    password: yup.string().required('Password is Required').matches(passwordRejex, 'Password must be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
    rePassword: yup.string().required('Repassword is Required').oneOf([yup.ref("password")], "Passwords Must be the same"),
    terms: yup.boolean().oneOf([true], "You must agree to our terms")
  })


  async function handleSignUp(values) {
    try {
      const response = await sendDataToSignUp(values)
      if (response.success) {
        toast.success("Your account has been created Successfully")
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    }
    catch (error) {
      console.log(error.message);
      setIsExistError(error.message)
      toast.error(isExistError)
    }

  }


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    validationSchema,
    onSubmit: handleSignUp,
  })

  const passwordFeedback = checkPasswordStrength(formik.values.password);



  return (
    <main>
      <div className='py-12 grid lg:grid-cols-2 container lg:px-13 gap-8'>
        {/* Content */}
        <div className="content px-3 pt-5 space-y-7">
          <div className="title">
            <h2 className='font-bold text-3xl'>Welcome to <span className='text-primary-500'>Cartify</span></h2>
            <p>Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
          </div>
          <ul className='*:flex *:items-center *:gap-2 space-y-5'>
            <li>
              <div className="icon size-10 rounded-full flex items-center justify-center bg-primary-300 text-primary-600 text-xl">
                <FaStar />
              </div>
              <div>
                <h3 className='font-semibold'>
                  Premium Quality
                </h3>
                <p className='text-sm'>Premium quality products sourced from trusted suppliers.</p>
              </div>

            </li>
            <li>
              <div className="icon size-10 rounded-full flex items-center justify-center bg-primary-300 text-primary-600 text-xl">
                <FaTruckFast />
              </div>
              <div>
                <h3 className='font-semibold'>
                  Fast Delivery
                </h3>
                <p className='text-sm'>Same-day delivery available in most areas</p>
              </div>

            </li>
            <li>
              <div className="icon size-10 rounded-full flex items-center justify-center bg-primary-300 text-primary-600 text-xl">
                <FaShieldAlt />

              </div>
              <div>
                <h3 className='font-semibold'>
                  Secure Shopping
                </h3>
                <p className='text-sm'>Your data and payments are completely secure</p>
              </div>

            </li>
          </ul>
          {/* Review */}
          <div className='bg-white rounded-xl p-5 shadow-md'>
            <div className="author flex gap-2 items-center">
              <img src={authorImg} alt="author" className='w-12' />
              <div>
                <span className='text-sm'>Sarah Johnson</span>
                <span className='flex gap-1'>
                  <FaStar className='text-yellow-300' />
                  <FaStar className='text-yellow-300' />
                  <FaStar className='text-yellow-300' />
                  <FaStar className='text-yellow-300' />
                  <FaStar className='text-yellow-300' />
                </span>
              </div>
            </div>
            <blockquote className='text-gray-600 italic mt-4 text-sm'>
              "FreshCart has transformed my shopping experience.
              The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </blockquote>

          </div>

        </div>
        {/* Form */}
        <div className="form bg-white rounded-xl  shadow-md  pt-5 px-4 space-y-3 ">
          <div className="title">
            <h2 className='text-3xl text-center font-bold'>Create Your Account</h2>
            <p className='text-center'>Start your fresh journey with us today</p>
          </div>
          <div className='flex gap-3 mt-1 *:bg-white *:border *:border-gray-300 *:hover:bg-gray-100'>
            <button className='btn flex items-center gap-2 w-full justify-center '>
              <FaGoogle className='text-red-500' />
              <span>Google</span>
            </button>
            <button className='btn flex items-center gap-2 w-full justify-center '>
              <FaFacebookF className='text-blue-500' />
              <span>Facebook</span>
            </button>
          </div>
          <div className='w-full h-0.5 bg-gray-200/50 mt-6 relative'>
            <span className='absolute top-1/2 left-1/2 -translate-1/2 bg-white p-2 text-sm text-gray-500'>Or</span>
          </div>
          <form className='space-y-3 pt-4' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-1'>
              <label htmlFor="name">Name:</label>
              <input type="text"
                id='name'
                className='form-control rounded-xl'
                placeholder='Enter Your Name..'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && <p className='text-red-500 text-sm'>*{formik.errors.name}</p>}
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="email">Email:</label>
              <input type="email"
                id='email'
                className='form-control rounded-xl'
                placeholder='Enter Your Email..'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <p className='text-red-500 text-sm'>*{formik.errors.email}  </p>}
              {isExistError && <p className='text-red-500 text-sm'>*{isExistError}</p>}
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="password">Password:</label>
              <input type="password"
                id='password'
                className='form-control rounded-xl'
                placeholder='Create a strong password..'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.values.password && <div className='flex  items-center gap-3'>
                <div className='ms-2 bar w-full h-1 bg-gray-200'>
                  <div className={`progress ${passwordFeedback.width} h-1 ${passwordFeedback.background}`}>
                  </div>
                </div>
                <span className='text-sm text-nowrap w-15 text-center me-5'>{passwordFeedback.text}</span>
              </div>}
              {(formik.touched.password && formik.errors.password) ? <p className='text-red-500 text-sm'>*{formik.errors.password}</p> : <span className='text-xs ms-2'>Must be at least 8 characters with numbers and symbols</span>}

            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="repassword">Repassword:</label>
              <input type="password"
                id='repassword'
                className='form-control rounded-xl'
                placeholder='Confirm your password'
                name='rePassword'
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rePassword && formik.errors.rePassword && <p className='text-red-500 text-sm'>*{formik.errors.rePassword}  </p>}

            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="phone">Phone Number:</label>
              <input type="number"
                id='phone'
                className='form-control rounded-xl'
                placeholder='Enter Your Phone Number..'
                name='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && <p className='text-red-500 text-sm'>*{formik.errors.phone} </p>}

            </div>
            <div >
              <div className='flex items-center gap-2'>
                <input type="checkbox"
                  id='terms'
                  className='form-control rounded-xl accent-primary-600  hover:accent-primary-700 size-4'
                  name='terms'
                  value={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="terms">I agree to the <Link to={'/terms'} className='text-primary-500 hover:underline'>Terms of Service </Link> and <Link to={'/terms'} className='text-primary-500 hover:underline'>Privacy Policy </Link> *</label>
              </div>

              {formik.touched.terms && formik.errors.terms && <p className='text-red-500 text-sm mt-2'>*{formik.errors.terms}  </p>}

            </div>

            <button type='submit' className='btn w-full py-2 flex justify-center gap-2 items-center bg-primary-500 hover:bg-primary-400 text-white font-bold'>

              <FaUserPlus /> <span>Create My Account</span>
            </button>
            <p className='border-t border-gray-200 py-5 text-center'>Already have an account?<Link to={'/login'} className='text-primary-500 ms-2 hover:underline'>Sign In </Link></p>
          </form>

        </div>

      </div>


    </main>
  )
}
