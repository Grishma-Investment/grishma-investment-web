import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Article from './pages/Article'
import Page404 from './pages/Page404'
import Search from './pages/Search'
import Articles from './pages/Articles'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <nav>
          <Nav />
        </nav>
        <main>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/article/:id' element={<Article />} />
            <Route path='/articles/:category' element={<Articles />} />
            <Route path='/search' element={<Search />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App