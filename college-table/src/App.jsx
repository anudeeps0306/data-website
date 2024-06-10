import './App.css'
import { Analytics } from '@vercel/analytics/react';
import CollegeTable from './component/CollegeTable';
import ReactGa from 'react-ga';
import { useEffect } from 'react';

const TRACKING_ID = 'G-5RHB2YQFNR';
ReactGa.initialize(TRACKING_ID);

function App() {

  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])
  

  return (
    <div className="App">
      <Analytics />
      <CollegeTable />
    </div>
  )
}

export default App
