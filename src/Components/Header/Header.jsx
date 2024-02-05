import React from 'react';
import { Outlet } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBell } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div>
      <header>
      <FontAwesomeIcon className='icon-left' icon={faChevronLeft} />
      <input type="text" placeholder='search...' />
      <FontAwesomeIcon className='icon-bell' icon={faBell} />
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
