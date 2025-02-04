import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.User)
  return (
    <>

      <nav className='flex item-center justify-around'>
        <div>LOGO</div>
        <ul className='flex item-center gap-10'>
          <li><Link to={'/signin'}>Login</Link></li>
        </ul>
      </nav>

    </>
  );
};

export default Home;
