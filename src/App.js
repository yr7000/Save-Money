import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import { Redirect } from "react-router-dom";

function App() {
  const { authIsReady, user, theme } = useAuthContext();

  return (
    <div className={`App ${theme}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/">
              {user && <Home />}
              {!user && <Redirect to="/login"></Redirect>}
            </Route>
            <Route path="/login">
              {!user && <Login />}
              {user && <Redirect to="/"></Redirect>}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/"></Redirect>}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
