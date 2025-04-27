import React from 'react'
import '../styles/Category.css'

const Page404 = () => {
  return (
    <div className='category-wrapper'>
      <div className="header">Page Not Found</div>
      <p>:Oops! The page you're looking for doesn't exist.</p>
      <p>:It might have been moved, deleted, or perhaps you mistyped the address. Don't worry — you can head back to the <a href="/">homepage</a> and find your way from there. We're here to help you get back on track!"</p>
    </div>
  )
}

export default Page404;