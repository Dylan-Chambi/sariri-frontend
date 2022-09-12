import React from "react";
import styled from "styled-components";
import homeImage from "../assets/illimani.jpg";
import { Autocomplete } from '@react-google-maps/api';
import Select from "../components/Principal/Select";
import Calendar from "../components/Principal/Calendar";
import Destination from "../components/Principal/Destination";
export default function Hero({onPlaceChanged, onLoad, showHotels, checkIn, setCheckIn, checkOut, setCheckOut, numGuests, setNumGuests}) {

  return (
    
    <Section id="home">
      <div className="background">
        <img src={homeImage} alt="" />
      </div>
      <div className="content">
        <div className="title">
          <h1>El viaje de tus sueños al mejor precio!</h1>
          <p>
          Viaja confiado, viaja con nosotros
          </p>
        </div>
        <div className="search">
          <div className="container">
            <label htmlFor="">Cual es tu destino?</label>
            <Autocomplete onLoad={onLoad}>
              <Destination/>
            </Autocomplete>
          </div>
          <div className="container">
            <label htmlFor="">Fecha</label>
            <Calendar
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
            />
          </div>
          <div className="container">
            <label htmlFor="">Adultos</label>
            <Select numGuests={numGuests} setNumGuests={setNumGuests} isParent={true} />
          </div>
          <div className="container">
            <label htmlFor="">Niños</label>
            <Select numGuests={numGuests} setNumGuests={setNumGuests} isParent={false} />

          </div>
          <button onClick={onPlaceChanged}>Buscar</button>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  margin-top: 2rem;
  width: 100%;
  height: 100%;

  .background {
    height: 100%;
    img {
      width: 100%;
      filter: brightness(60%);
    }
  }
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .title {
      color: white;
      h1 {
        font-size: 3rem;
        letter-spacing: 0.2rem;
        fontFamily: "Roboto", sans-serif;
      }
      p {
        text-align: center;
        padding: 0 30vw;
        margin-top: 0.5rem;
        font-size: 1.2rem;
        fontFamily: "Roboto", sans-serif;
      }
    }
    .search {
      display: flex;
      background-color: #ffffffce;
      padding: 0.5rem;
      border-radius: 0.5rem;
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 1.5rem;
        label {
          font-size: 1.3rem;
          color: #03045e;
          fontFamily: "Roboto", sans-serif;
        }
        input {
          background-color: transparent;
          border: none;
          text-align: center;
          fontFamily: "Roboto", sans-serif;
          color: black;
          &[type="date"] {
            padding-left: 3rem;
          }

          &::placeholder {
            color: black;
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        padding: 1.2rem;
        margin: auto;
        cursor: pointer;
        border-radius: 0.3rem;
        border: none;
        color: white;
        background-color: #4361ee;
        font-size: 1.1rem;
        font-align: center;
        fontFamily: "Roboto", sans-serif;
        text-transform: uppercase;
        transition: 0.4s ease-in-out;
        &:hover {
          background-color: #023e8a;
        }
      }
    }
  }
  @media screen and (min-width: 180px) and (max-width: 980px) {
    height: 25rem;
    .background {
      background-color: palegreen;
      img {
        height: 100%;
      }
    }
    .content {
      fontFamily: "Roboto", sans-serif;
      .title {
        h1 {
          font-size: 1rem;
          fontFamily: "Roboto", sans-serif;
        }
        p {
          font-size: 0.8rem;
          padding: 1vw;
          fontFamily: "Roboto", sans-serif;
        }
      }
      .search {
        flex-direction: column;
        padding: 0.8rem;
        gap: 0.8rem;
        /* padding: 0; */
        .container {
          padding: 0 0.8rem;
          input[type="date"] {
            padding-left: 1rem;
          }
        }
        button {
          padding: 1rem;
          font-size: 1rem;
          fontFamily: "Roboto", sans-serif;
        }
        /* display: none; */
      }
    }
  }
`;
