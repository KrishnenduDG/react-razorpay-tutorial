import {BrowserRouter as Router, Routes,Route} from "react-router-dom";

import Home from "./components/Home";
import PaymentSuccess from "./components/PaymentSuccess";


function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element = {<Home />} />
        <Route path = "/payment_success" element = {<PaymentSuccess />} />

        
      </Routes>
    </Router>
  );
}

export default App;
