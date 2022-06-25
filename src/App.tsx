import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
