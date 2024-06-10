import './App.css'
import CollegeTable from './component/CollegeTable';
import ReactGa from 'react-ga4';

const TRACKING_ID = 'G-5RHB2YQFNR';
ReactGa.initialize(TRACKING_ID);

function App() {

  return (
    <div className="App">
      <CollegeTable />
    </div>
  )
}

export default App
