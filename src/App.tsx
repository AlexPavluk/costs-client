import { useStore } from "effector-react";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { Alert } from "./components/Alert/Alert";
import { AuthPages } from "./components/AuthPages/AuthPages";
import CostsPage from "./components/CostsPage/CostsPage";
import { Header } from "./components/Header/Header";
import { $alert } from "./context/alert";
import { $auth, setAuth, setUsername } from "./context/auth";
import { getAuthDataFromLS, removeUser } from "./utils/authAlert";

function App() {
  const isLogetIn = useStore($auth);
  const alert = useStore($alert);

  useEffect(() => {
    const auth = getAuthDataFromLS();

    if (!auth || !auth.access_token || !auth.refresh_token) {
      removeUser();
    } else {
      setAuth(true);
      setUsername(auth.username);
    }
  }, [])

  return (
    <div>
      <Header />
      {alert.alertText && <Alert props={alert} />}
      <Router>
        <Routes>
          <Route path="/" element={isLogetIn ? <Navigate to={'/costs'}/> : <Navigate to={'/login'}/>}/>
          <Route path="/registration" element={isLogetIn ? <Navigate to={'/costs'}/> : <AuthPages type="registration"/>}/>
          <Route path="/login" element={isLogetIn ? <Navigate to={'/costs'}/> : <AuthPages type="login"/>}/>
          <Route path="/costs" element={isLogetIn ? <CostsPage/> : <Navigate to={'/'}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
