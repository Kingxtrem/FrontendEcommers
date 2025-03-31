import React from 'react'
import Navbar from './Navbar'
const Header = ({ dropdownOpen1, setDropdownOpen1, dropdownOpen2, setDropdownOpen2,menuOpen,setMenuOpen }) => {
  return (
    <div className='sticky top-0'>
      <Navbar dropdownOpen1={dropdownOpen1}
        dropdownOpen2={dropdownOpen2}
        setDropdownOpen1={setDropdownOpen1}
        setDropdownOpen2={setDropdownOpen2}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen} />
    </div>
  )
}

export default Header
