import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Settings from "./components/Settings";
import Eform from "./components/Eform";
import Enquiries from "./components/Enquiries";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoutes from "./components/PrivateRoutes";
function App() {
  return (
    <>
      <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<UserLogin />}></Route>
          <Route exact path="/signup" element={<UserSignUp />}></Route>
          <Route element={<PrivateRoutes />}>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/settings" element={<Settings />}></Route>
          <Route exact path="/enquiry" element={<Eform />}></Route>
          <Route exact path="/enquiries" element={<Enquiries />}></Route>
        </Route>
        </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
