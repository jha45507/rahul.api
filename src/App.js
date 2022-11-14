import './App.css';
import LoadingBar from 'react-top-loading-bar'
import NavBar from './components/NavBar';
import News from './components/News';
import ReadMore from './components/ReadMore'
import Search from './components/Search';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {

  const [state, setState] = useState({ progress: 0 })
  const setProgress = (progress) => {
    setState({ progress: progress })
  }
  return (
    <div>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={state.progress}
        />
        <NavBar />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} key="" />} />
          <Route path="/blog/:slug" element={<ReadMore setProgress={setProgress} key="" />} />
          <Route path="/search/:query" element={<Search setProgress={setProgress} key="" />} />
        </Routes>
      </Router>
    </div>
  )

}

export default App
