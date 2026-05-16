import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle, FaLock, FaShieldAlt, FaStar, FaUserPlus, FaSpinner, FaSignInAlt } from 'react-icons/fa'
import { FaTruckFast } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router'
import * as yup from "yup"
import freshCartImg from "../../assets/Images/FreshCartImg.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../../config';
import { sendDataToLogIn } from '../../services/auth';
import { AuthContext } from '../../Context/Auth.context';


export default function Login() {


  const location = useLocation();
  const from = location?.state?.from || '/'

  const { setToken } = useContext(AuthContext)

  const navigate = useNavigate();
  const [isShownPassword, setIsShownPassword] = useState(false);
  function togglePassword() {
    setIsShownPassword(!isShownPassword)
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isExistError, setIsExistError] = useState(null)
  const passwordRejex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/


  const validationSchema = yup.object({
    email: yup.string().required('Email is Required').email('Email is Invalid'),
    password: yup.string().required('Password is Required').matches(passwordRejex, 'Password must be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
  })



  async function handleLogin(values) {
    setIsLoading(true);
    setIsExistError(null);
    try {
      const response = await sendDataToLogIn(values);

      if (response.success) {
        toast.success("Welcome Back!")
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token);
        if (values.remeberme) {
          localStorage.setItem('token', response.data.token)
        } else {
          sessionStorage.setItem('token', response.data.token)

        }
        setTimeout(() => {
          navigate("/")
        }, 3000)

      }
    }
    catch (error) {
      console.log(error.message);
      setIsExistError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remeberme: false,

    },
    validationSchema,
    onSubmit: handleLogin,
  })


  return (
    <main>
      <div className='py-12 grid lg:grid-cols-2 container lg:px-13 gap-20'>
        {/* Content */}
        <div className="content px-3 pt-5 space-y-7">

          {/* Review */}
          <div className='mx-auto space-y-6'>
            <img className=' object-cover h-96 rounded-xl w-full  shadow-lg' src={freshCartImg} alt="freshCart" />
          </div>
          <div className="title text-center">
            <h2 className='font-bold text-3xl'>Cartify - Your One-Stop Shop for Fresh Products</h2>
            <p>Join thousands of happy customers who trust Cartify for their daily needs</p>
            <ul>
              <li>

              </li>
            </ul>
          </div>

        </div>
        {/* Form */}
        <div className="form bg-white rounded-xl  shadow-md  pt-5 px-4 space-y-3 ">

          <div className='space-y-3 mt-1 *:bg-white *:border *:border-gray-300 *:hover:bg-gray-100'>
            <button className='btn flex items-center gap-2 w-full justify-center '>
              <FaGoogle className='text-red-500' />
              <span>Continue with Google</span>
            </button>
            <button className='btn flex items-center gap-2 w-full justify-center '>
              <FaFacebookF className='text-blue-500' />
              <span>Continue with Facebook</span>
            </button>
          </div>
          <div className='w-full h-0.5 bg-gray-200/50 mt-6 relative'>
            <span className='absolute top-1/2 left-1/2 -translate-1/2 bg-white p-2 text-sm text-gray-500'>OR COTINUE WITH EMAIL</span>
          </div>
          <form className='space-y-3 pt-4' onSubmit={formik.handleSubmit}>

            <div className='flex flex-col gap-1'>
              <label htmlFor="email">Email:</label>
              <div className='relative'>
                <input type="email"
                  id='email'
                  className='form-control rounded-xl w-full pl-10'
                  placeholder='Enter Your Email..'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <MdEmail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
              </div>

              {formik.touched.email && formik.errors.email && <p className='text-red-500 text-sm'>*{formik.errors.email}  </p>}
              {isExistError && <p className='text-red-500 text-sm'>*{isExistError}</p>}
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex justify-between'>
                <label htmlFor="password">Password:</label><Link to={'/forget-password'} className='text-primary-500 text-sm hover:cursor-pointer hover:underline'>Forgot Password?</Link>

              </div>
              <div className='relative'>
                <input type={isShownPassword ? "text" : "password"}
                  id='password'
                  className='form-control rounded-xl w-full pl-10 pr-10'
                  placeholder='Enter your password..'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
                {isShownPassword ? (
                  <FaEyeSlash onClick={togglePassword} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' />
                ) : (
                  <FaEye onClick={togglePassword} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' />
                )}
              </div>

              {(formik.touched.password && formik.errors.password) && <p className='text-red-500 text-sm'>*{formik.errors.password}</p>}


            </div>

            <div >
              <div className='flex items-center gap-2'>
                <input type="checkbox"
                  id='remeberme'
                  className='form-control rounded-xl accent-primary-600  hover:accent-primary-700 size-4'
                  name='remeberme'
                  value={formik.values.remeberme}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                <label htmlFor="terms">Keep me signed in</label>
              </div>

              {formik.touched.terms && formik.errors.terms && <p className='text-red-500 text-sm mt-2'>*{formik.errors.terms}  </p>}

            </div>

            <button type='submit' disabled={isLoading} className='btn w-full py-2 flex justify-center gap-2 items-center bg-primary-500 hover:bg-primary-400 text-white font-bold disabled:bg-primary-300 disabled:cursor-not-allowed'>
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaSignInAlt />}
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            </button>
            <p className='border-t border-gray-200 py-5 text-center'>Don't have an account?<Link to={'/signup'} className='text-primary-500 ms-2 hover:underline'>Sign Up</Link></p>
          </form>

        </div>

      </div>


    </main>
  )
}
