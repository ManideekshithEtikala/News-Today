import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Newsmain from './components/Newsmain';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const pagesize = 9;
  const [progress, setProgress] = useState(0)
  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' progress={progress} />
        <Routes>
          <Route exact path='/' element={<Newsmain setProgress={setProgress} key={'general'} pagesize={pagesize} country="in" category="general" />} />
          <Route exact path='/sports' element={<Newsmain setProgress={setProgress} key={'sports'} pagesize={pagesize} country="in" category="sports" />} />
          <Route exact path='/science' element={<Newsmain setProgress={setProgress} key={'science'} pagesize={pagesize} country="in" category="science" />} />
          <Route exact path='/entertainment' element={<Newsmain setProgress={setProgress} key={'entertainment'} pagesize={pagesize} country="in" category="entertainment" />} />
          <Route exact path='/health' element={<Newsmain setProgress={setProgress} key={'health'} pagesize={pagesize} country="in" category="health" />} />
          <Route exact path='/technology' element={<Newsmain setProgress={setProgress} key={'technology'} pagesize={pagesize} country="in" category="technology" />} />
        </Routes>
      </Router>
    </>
  )
}
export default App