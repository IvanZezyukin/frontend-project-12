import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <header>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
    </header>

    <Outlet />
    
    <footer>Made by Ivan Zezyukin</footer>
    </>
  )
}

export {Layout}
