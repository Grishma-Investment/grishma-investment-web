import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="row-1">
        <div className="col-1">
          <div className="header">Grishma Investment</div>
          <div className="desc">Delivering the latest and most valuable financial insights, market trends, and investment strategies — from timely updates to in-depth analysis tailored for investors in Nepal.</div>
        </div>
        <div className="col-2">
          <div className="header">Categories</div>
          <div className="links">
            <a href="/articles/stock-and-indices">Stock & Indices</a>
            <a href="/articles/management-and-skills">Management & Skills</a>
            <a href="/articles/research-and-analysis">Research & Analysis</a>
            <a href="/articles/innovation-and-technology">Innovation & Technology</a>
            <a href="/articles/trade-and-business">Trade & Business</a>
            <a href="/articles/compliance-and-regulations">Compliance & Regulations</a>
            <a href="/articles/opinions-and-impact">Opinions & Impact</a>
          </div>
        </div>
        <div className="col-3">
          <div className="header">Company</div>
          <div className="links">
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/careers">Careers</a>
            <a href="/advertise">Advertise</a>
            <a href="/terms-and-condition">Terms and Condition</a>
          </div>
        </div>
        <div className="col-4">
          <div className="header">Connect With Us</div>
          <div className="content">
            <div className="socials">
              <i className=' fa-brands fa-square-facebook'></i>
              <i className=' fa-brands fa-x-twitter'></i>
              <i className=' fa-brands fa-linkedin'></i>
              <i className=' fa-solid fa-envelope'></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row-2">
        <p>© {new Date().getFullYear()} Grishma Investment. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer