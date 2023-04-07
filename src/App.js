import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" exact Component={Login} />
      </Routes>
    </Router>
  );
};

export default App;
