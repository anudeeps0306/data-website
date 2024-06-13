import './App.css'
import CollegeTable from './component/CollegeTable';
import ReactGa from 'react-ga4';
import Navbar from './component/Navbar';
import Footer from './component/Footer';

const TRACKING_ID = 'G-5RHB2YQFNR';
ReactGa.initialize(TRACKING_ID);

function App() {

  return (
    <>
      <Navbar />
      <CollegeTable />
      <Footer />
    </>
  )
}

export default App
