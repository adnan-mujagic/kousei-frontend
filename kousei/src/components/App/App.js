
import './App.css';
import "../../Responsive.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Header from '../Header/Header';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import useToken from './useToken';



function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      //Login component here
      <Login setToken={setToken} />
    )
  }
  return (
    <div className="App">
      <Header></Header>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
