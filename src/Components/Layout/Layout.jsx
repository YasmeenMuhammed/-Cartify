import React from 'react'
import NavBar from '../NavBar'
import Footer from './../Footer';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 flex flex-col">
        <NavBar/>
        <main className="flex-grow">
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}
