import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" exact Component={Login} />
        <Route path="/signup" exact Component={Signup} />
      </Routes>
    </Router>
  );
};

export default App;
