import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/Layout';
import { Signup } from './pages/Signup';

function App() {
  return (
    <>
      <Routes>

        <Route path ="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/login"} element={<Login />} /> */}

      </Routes>
    </>
  );
}

export default App;
