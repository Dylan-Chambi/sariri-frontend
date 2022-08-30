import React from "react";
import styled from "styled-components";
import Profile from "../pages/Profile";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  return (
    <FooterContainer>
      <span>Copyright &copy; 2022 Sariri. All rights reserved</span>
      <ul className="links">
        <li>
          <a href="/home" >Inicio</a>
        </li>
        <li>
          <a href="#services">Hoteles</a>
        </li>
        <li>
          <a href="#recommend">Mapa</a>
        </li>
        <li>
          <a href="/profile" element={<Profile/>}>Perfil</a>
        </li>
      </ul>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  background-color: #d0d8ff;
  border-radius: 0.5rem;
  padding: 2.5rem;

  ul {
    display: flex;
    list-style-type: none;
    gap: 2rem;
    li {
      a {
        text-decoration: none;
        color: black;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #302ce9;
        }
      }
      svg {
        font-size: 1.3rem;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #302ce9;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    ul {
      flex-direction: column;
    }
    .social__links {
      flex-direction: row;
    }
  }
`;
