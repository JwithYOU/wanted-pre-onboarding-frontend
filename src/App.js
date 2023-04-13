import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todo from "./components/Todo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" exact Component={Signup} />
        <Route path="/signin" exact Component={Login} />
        <Route path="/todo" exact Component={Todo} />
      </Routes>
    </Router>
  );
};

export default App;
