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
    <main className="min-h-[85vh] flex items-center py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className='grid lg:grid-cols-2 container lg:px-13 gap-12 lg:gap-20 items-center'>
        {/* Content */}
        <div className="content px-3 pt-5 space-y-7">
          <div className="title space-y-3">
            <h2 className='font-extrabold text-3xl text-slate-800 dark:text-slate-100 tracking-tight leading-snug'>Welcome to <span className='text-violet-600 dark:text-violet-400'>Cartify</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
          </div>
          <ul className='space-y-5'>
            <li className="flex items-start gap-4">
              <div className="icon size-10 rounded-xl flex shrink-0 items-center justify-center bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-450 text-lg">
                <FaStar />
              </div>
              <div className="space-y-1">
                <h3 className='font-bold text-slate-800 dark:text-slate-100'>
                  Premium Quality
                </h3>
                <p className='text-slate-650 dark:text-slate-400 text-sm leading-relaxed'>Premium quality products sourced from trusted suppliers.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="icon size-10 rounded-xl flex shrink-0 items-center justify-center bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-450 text-lg">
                <FaTruckFast />
              </div>
              <div className="space-y-1">
                <h3 className='font-bold text-slate-800 dark:text-slate-100'>
                  Fast Delivery
                </h3>
                <p className='text-slate-650 dark:text-slate-400 text-sm leading-relaxed'>Same-day delivery available in most areas</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="icon size-10 rounded-xl flex shrink-0 items-center justify-center bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-450 text-lg">
                <FaShieldAlt />
              </div>
              <div className="space-y-1">
                <h3 className='font-bold text-slate-800 dark:text-slate-100'>
                  Secure Shopping
                </h3>
                <p className='text-slate-650 dark:text-slate-400 text-sm leading-relaxed'>Your data and payments are completely secure</p>
              </div>
            </li>
          </ul>
          {/* Review */}
          <div className='bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-xl dark:shadow-none'>
            <div className="author flex gap-3 items-center">
              <img src={authorImg} alt="author" className='w-11 h-11 rounded-full' />
              <div>
                <span className='text-sm font-semibold text-slate-800 dark:text-slate-100 block'>Sarah Johnson</span>
                <span className='flex gap-0.5 mt-0.5'>
                  <FaStar className='text-yellow-450 text-xs' />
                  <FaStar className='text-yellow-450 text-xs' />
                  <FaStar className='text-yellow-450 text-xs' />
                  <FaStar className='text-yellow-450 text-xs' />
                  <FaStar className='text-yellow-450 text-xs' />
                </span>
              </div>
            </div>
            <blockquote className='text-slate-600 dark:text-slate-400 italic mt-4 text-sm leading-relaxed border-l-2 border-violet-500 pl-3'>
              "FreshCart has transformed my shopping experience.
              The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </blockquote>
          </div>

        </div>
        {/* Form */}
        <div className="form bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-2xl shadow-xl dark:shadow-none p-6 sm:p-8 space-y-5">
          <div className="title space-y-1">
            <h2 className='text-3xl text-center font-extrabold text-slate-800 dark:text-slate-100 tracking-tight'>Create Your Account</h2>
            <p className='text-center text-slate-605 dark:text-slate-400 text-sm'>Start your fresh journey with us today</p>
          </div>
          <div className='flex gap-3 mt-1 *:bg-white dark:*:bg-slate-800/40 *:border *:border-gray-300 dark:*:border-slate-700 *:hover:bg-gray-100 dark:*:hover:bg-slate-850 *:text-slate-700 dark:*:text-slate-200 *:transition-all *:duration-200 *:rounded-xl'>
            <button className='btn flex items-center gap-2 w-full justify-center py-2.5'>
              <FaGoogle className='text-red-500' />
              <span>Google</span>
            </button>
            <button className='btn flex items-center gap-2 w-full justify-center py-2.5'>
              <FaFacebookF className='text-blue-500' />
              <span>Facebook</span>
            </button>
          </div>
          <div className='w-full h-0.5 bg-gray-200/50 dark:bg-slate-800 mt-6 relative'>
            <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-3 text-xs font-semibold text-gray-500 dark:text-slate-450 tracking-wider whitespace-nowrap'>OR CONTINUE WITH EMAIL</span>
          </div>
          <form className='space-y-3.5 pt-2' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-350">Full Name:</label>
              <input type="text"
                id='name'
                className='form-control rounded-xl w-full bg-white dark:bg-slate-850 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20'
                placeholder='Enter Your Name..'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && <p className='text-red-500 text-sm mt-0.5'>*{formik.errors.name}</p>}
            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-350">Email Address:</label>
              <input type="email"
                id='email'
                className='form-control rounded-xl w-full bg-white dark:bg-slate-850 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20'
                placeholder='Enter Your Email..'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <p className='text-red-500 text-sm mt-0.5'>*{formik.errors.email}  </p>}
              {isExistError && <p className='text-red-500 text-sm mt-0.5'>*{isExistError}</p>}
            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-350">Password:</label>
              <input type="password"
                id='password'
                className='form-control rounded-xl w-full bg-white dark:bg-slate-850 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20'
                placeholder='Create a strong password..'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.values.password && <div className='flex items-center gap-3 mt-1 px-1'>
                <div className='bar w-full h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden'>
                  <div className={`progress ${passwordFeedback.width} h-full ${passwordFeedback.background} transition-all duration-300`}>
                  </div>
                </div>
                <span className='text-xs font-bold text-slate-600 dark:text-slate-450 text-nowrap'>{passwordFeedback.text}</span>
              </div>}
              {(formik.touched.password && formik.errors.password) ? <p className='text-red-500 text-sm mt-0.5'>*{formik.errors.password}</p> : <span className='text-[11px] text-slate-400 dark:text-slate-500 ms-1'>Must be at least 8 characters with numbers and symbols</span>}

            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="repassword" className="text-sm font-semibold text-slate-700 dark:text-slate-350">Confirm Password:</label>
              <input type="password"
                id='repassword'
                className='form-control rounded-xl w-full bg-white dark:bg-slate-850 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20'
                placeholder='Confirm your password'
                name='rePassword'
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rePassword && formik.errors.rePassword && <p className='text-red-500 text-sm mt-0.5'>*{formik.errors.rePassword}  </p>}

            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-350">Phone Number:</label>
              <input type="number"
                id='phone'
                className='form-control rounded-xl w-full bg-white dark:bg-slate-850 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20'
                placeholder='Enter Your Phone Number..'
                name='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && <p className='text-red-500 text-sm mt-0.5'>*{formik.errors.phone} </p>}

            </div>
            <div className="pt-1">
              <div className='flex items-start gap-2.5'>
                <input type="checkbox"
                  id='terms'
                  className='rounded border-gray-300 dark:border-slate-700 text-violet-600 focus:ring-violet-500 dark:bg-slate-850 size-4 mt-0.5 cursor-pointer accent-violet-600'
                  name='terms'
                  value={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="terms" className="text-sm text-slate-700 dark:text-slate-350 select-none cursor-pointer leading-tight">
                  I agree to the <Link to={'/terms'} className='text-violet-600 dark:text-violet-400 font-semibold hover:underline'>Terms of Service </Link> and <Link to={'/terms'} className='text-violet-600 dark:text-violet-400 font-semibold hover:underline'>Privacy Policy </Link> *
                </label>
              </div>

              {formik.touched.terms && formik.errors.terms && <p className='text-red-500 text-sm mt-1.5'>*{formik.errors.terms}  </p>}

            </div>

            <button type='submit' className='btn w-full py-3 mt-3 flex justify-center gap-2 items-center bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/10 dark:shadow-none hover:shadow-violet-500/25 transition-all duration-300'>
              <FaUserPlus /> <span>Create My Account</span>
            </button>
            <p className='border-t border-gray-100 dark:border-slate-800 pt-5 text-center text-slate-600 dark:text-slate-450 text-sm'>
              Already have an account?
              <Link to={'/login'} className='text-violet-600 dark:text-violet-400 ms-1.5 font-semibold hover:underline'>Sign In</Link>
            </p>
          </form>

        </div>

      </div>
    </main>
  )
}
