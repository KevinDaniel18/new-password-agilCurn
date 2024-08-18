import NewPassword from "./NewPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password" element={<NewPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
