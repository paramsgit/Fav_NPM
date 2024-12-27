import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
export const NPMLogo = () => {
  return (
    <img src="/npm.png" className="w-16" alt="npm" />
  );
};
export const GithubLogo = () => {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
  </svg>  );
};
const menuItems = [
    "Home",
    "Favourite",]
export default function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [Active, setActive] = useState(0);
    const location = useLocation();
    
    useEffect(() => {
      if(false){console.log(setIsMenuOpen)}
      console.log(location.pathname)
      switch ((location.pathname).toLowerCase()) {
        case "/":
          setActive(0)
          break;
        case "/favourite":
          setActive(1)
          break;
        case "/about":
          setActive(2)
          break;
      
        default:
          break;
      }
    }, [])
    

  return (
    <Navbar isBordered isBlurred={false}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand>
        <NPMLogo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {menuItems.map((item, index) => (
          <NavbarItem onClick={()=>setActive(index)} key={`${item}_${index}`}>
            <Link className={`w-full ${Active==index?"text-blue-600 font-semibold":""}`} to={(item.toLowerCase())}>
              {item}
            </Link>
          </NavbarItem>
           ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
        </NavbarItem>
        <NavbarItem>
        <a target="_blank" href={"https://github.com/paramsgit/Fav_NPM"}>
          <Button  className="bg-[#222222] text-white" href="#" variant="flat">
            <GithubLogo/> Github
          </Button>
          </a>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem  key={`${item}-${index}`}>
            <Link
              className={`w-full ${Active==index?"text-blue-600 font-semibold":""}`}
              to={item.toLowerCase()}
              onClick={()=>{setActive(index)}}
            >
              {item}
            </Link>
          </NavbarMenuItem>
           ))}
      </NavbarMenu>
    </Navbar>
  );
}
