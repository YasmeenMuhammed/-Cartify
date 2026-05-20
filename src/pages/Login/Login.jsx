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
    <main className="min-h-[85vh] flex items-center py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className='grid lg:grid-cols-2 container lg:px-13 gap-12 lg:gap-20 items-center'>
        {/* Content */}
        <div className="content px-3 pt-5 space-y-7">

          {/* Review */}
          <div className='mx-auto space-y-6'>
            <img className='object-cover h-96 rounded-2xl w-full shadow-xl border border-gray-100 dark:border-slate-800' src={freshCartImg} alt="freshCart" />
          </div>
          <div className="title text-center space-y-3">
            <h2 className='font-extrabold text-3xl text-slate-800 dark:text-slate-100 tracking-tight leading-snug'>Cartify - Your One-Stop Shop for Fresh Products</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Join thousands of happy customers who trust Cartify for their daily needs</p>
          </div>

        </div>
        {/* Form */}
        <div className="form bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-2xl shadow-xl dark:shadow-none p-6 sm:p-8 space-y-6">

          <div className='space-y-3 mt-1 *:bg-white dark:*:bg-slate-800/40 *:border *:border-gray-300 dark:*:border-slate-700 *:hover:bg-gray-100 dark:*:hover:bg-slate-850 *:text-slate-700 dark:*:text-slate-200 *:transition-all *:duration-200 *:rounded-xl'>
            <button className='btn flex items-center gap-2 w-full justify-center py-2.5'>
              <FaGoogle className='text-red-500' />
              <span>Continue with Google</span>
            </button>
            <button className='btn flex items-center gap-2 w-full justify-center py-2.5'>
              <FaFacebookF className='text-blue-500' />
              <span>Continue with Facebook</span>
            </button>
          </div>
          <div className='w-full h-0.5 bg-gray-200/50 dark:bg-slate-800 mt-6 relative'>
            <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-3 text-xs font-semibold text-gray-500 dark:text-slate-450 tracking-wider whitespace-nowrap'>OR CONTINUE WITH EMAIL</span>
          </div>
          <form className='space-y-4 pt-2' onSubmit={formik.handleSubmit}>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-350">Email Address:</label>
              <div className='relative'>
                <input type="email"
                  id='email'
                  className='form-control rounded-xl w-full pl-10 bg-white dark:bg-slate-850 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20'
                  placeholder='Enter Your Email..'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <MdEmail className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500' />
              </div>

              {formik.touched.email && formik.errors.email && <p className='text-red-500 text-sm mt-0.5'>*{formik.errors.email}  </p>}
              {isExistError && <p className='text-red-500 text-sm mt-0.5'>*{isExistError}</p>}
            </div>
            <div className='flex flex-col gap-1.5'>
              <div className='flex justify-between items-center'>
                <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-350">Password:</label>
                <Link to={'/forget-password'} className='text-violet-600 dark:text-violet-400 text-xs font-semibold hover:cursor-pointer hover:underline'>Forgot Password?</Link>
              </div>
              <div className='relative'>
                <input type={isShownPassword ? "text" : "password"}
                  id='password'
                  className='form-control rounded-xl w-full pl-10 pr-10 bg-white dark:bg-slate-850 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20'
                  placeholder='Enter your password..'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FaLock className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500' />
                {isShownPassword ? (
                  <FaEyeSlash onClick={togglePassword} className='absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors' />
                ) : (
                  <FaEye onClick={togglePassword} className='absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors' />
                )}
              </div>

              {(formik.touched.password && formik.errors.password) && <p className='text-red-500 text-sm mt-0.5'>*{formik.errors.password}</p>}
            </div>

            <div className="pt-1">
              <div className='flex items-center gap-2.5'>
                <input type="checkbox"
                  id='remeberme'
                  className='rounded border-gray-300 dark:border-slate-700 text-violet-600 focus:ring-violet-500 dark:bg-slate-850 size-4 cursor-pointer accent-violet-600'
                  name='remeberme'
                  value={formik.values.remeberme}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="remeberme" className="text-sm text-slate-700 dark:text-slate-350 cursor-pointer select-none">Keep me signed in</label>
              </div>

              {formik.touched.terms && formik.errors.terms && <p className='text-red-500 text-sm mt-1'>*{formik.errors.terms}  </p>}
            </div>

            <button type='submit' disabled={isLoading} className='btn w-full py-3 mt-2 flex justify-center gap-2 items-center bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/10 dark:shadow-none hover:shadow-violet-500/25 transition-all duration-300 disabled:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed'>
              {isLoading ? <FaSpinner className="animate-spin text-lg" /> : <FaSignInAlt className="text-lg" />}
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            </button>
            <p className='border-t border-gray-100 dark:border-slate-800 pt-6 text-center text-slate-600 dark:text-slate-450 text-sm'>
              Don't have an account?
              <Link to={'/signup'} className='text-violet-600 dark:text-violet-400 ms-1.5 font-semibold hover:underline'>Sign Up</Link>
            </p>
          </form>

        </div>

      </div>
    </main>
  )
}
