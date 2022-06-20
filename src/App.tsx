import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import AnimatedRoutes from "./components/animatedRoutes";
import Header from "./components/header";

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
