import Navbar from './Navbar'

const Header = ({ dropdownOpen1, setDropdownOpen1, dropdownOpen2, setDropdownOpen2, menuOpen, setMenuOpen, cartvalue }) => {
  return (
    <div className='sticky top-0 z-50'>
      <Navbar dropdownOpen1={dropdownOpen1}
        dropdownOpen2={dropdownOpen2}
        setDropdownOpen1={setDropdownOpen1}
        setDropdownOpen2={setDropdownOpen2}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cartvalue={cartvalue} />
    </div>
  )
}

export default Header
