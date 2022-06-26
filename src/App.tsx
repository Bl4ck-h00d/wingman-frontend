import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Header from "./components/Header";
import { setToken, setCurrentUser, setLogout, setIsLoggedIn } from "./redux/auth";
import jwt_decode from "jwt-decode";
import store from "src/redux/rootReducer";
import localStorageService from "src/utils/localStorage";

// Check for token to keep user logged in
const token = localStorageService.get("token");
if (token !== undefined && token !== null && token !== "undefined") {
  // Set auth token header auth
  store.dispatch(setToken(token));
  store.dispatch(setIsLoggedIn(true));
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded["exp"] < currentTime) {
    // Logout user
    store.dispatch(setLogout());
  }
}

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
