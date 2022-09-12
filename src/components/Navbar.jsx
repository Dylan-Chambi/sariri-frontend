import React, { useContext } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Typography } from "@mui/material";
import { GoogleContext } from "../context/googleContext";
import { Box } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import Cookies from "js-cookie";

export default function Navbar() {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { flag, userSariri, setUserGoogle, setUserSariri, setShowLogin } = useContext(GoogleContext);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    setUserGoogle(null);
    setUserSariri(null);
    setShowLogin(true);
    Cookies.remove('googleToken');
    Cookies.remove('saririCookie');
  }

  return (
    <>
      <Nav>
        <div className="brand">
          <div className="container">
            <img src={logo} alt="" />
            Sariri
          </div>
        </div>

        <ul>
          <li>
            <Link to="/home">Inicio</Link>
          </li>
          <li>
            <Link to="/favs">Favoritos</Link>
          </li>
          <li>
            <Link to="#hotels">Mapa</Link>
          </li>
          <li>
            <Link to="/profile" >Perfil</Link>
          </li>
        </ul>
        {!flag ?
          <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", m: 2 }}>
            <Typography>{userSariri.user_name + " " + userSariri.user_lastName}</Typography>
            <Avatar onClick={handleMenu} alt={userSariri.user_name + " " + userSariri.user_lastName} sx={{ ml: 1.5, bgcolor: '#023e8a' }}>
            </Avatar>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ bgcolor: '#0000006f' }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "left", p: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left" }} >
                  <PhoneIcon fontSize="small" sx={{ mr: 1 }} color="primary" />
                  <Typography>{userSariri.user_phone}</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left" }} >
                  <EmailIcon fontSize="small" sx={{ mr: 1 }} color="primary" />
                  <Typography>{userSariri.user_email}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <MenuItem sx={{ fontSize: "medium" }} onClick={handleSignOut}>
                  <ListItemIcon>
                    <Logout fontSize="normal" color="primary" />
                  </ListItemIcon>
                  Cerrar Sesión
                </MenuItem>
              </Box>
            </Menu>
          </Box>
          : <Box>
            <Button sx={{ mr: 1 }} onClick={() => navigate('/sign-in')} >Login</Button>
            <Button sx={{ mr: 1 }} onClick={() => navigate('/sign-up')} >Registrarse</Button>
          </Box>}
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 900;
      fontFamily: "Roboto", sans-serif;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
  ul {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        fontFamily: "Roboto", sans-serif;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
          fontFamily: "Roboto", sans-serif;
        }
      }
    }
  }
  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #48cae4;
    font-size: 1.1rem;
    fontFamily: "Roboto", sans-serif;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #023e8a;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .toggle {
        display: block;
      }
    }
    ul {
      display: none;
    }
    button {
      display: none;
    }
  }
`;
