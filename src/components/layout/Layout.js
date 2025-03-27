import React from 'react'
import Nav from '../navbar/Nav'
import Footer from '../footer/Footer'

function Layout({children}) {
  return (
    <div>
        <Nav/>
            <div className="content">
                {children}
            </div>
        <Footer/>
    </div>
  )
}

export default Layout