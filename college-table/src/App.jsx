import "./App.css";
import CollegeTable from "./component/CollegeTable";
import ReactGa from "react-ga4";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import Layout from "./component/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const TRACKING_ID = "G-5RHB2YQFNR";
ReactGa.initialize(TRACKING_ID);


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CollegeTable />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
