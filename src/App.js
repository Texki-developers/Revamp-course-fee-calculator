import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import CalculatorPage from "./Components/Calculator Page/CalculatorPage";
import Home from "./Components/Home/Home";
import SalesCalculator from "./Components/SaleCalculator/SalesCalculator";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalculatorPage />}/>
          <Route path="/sales-calculator" element={<SalesCalculator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
