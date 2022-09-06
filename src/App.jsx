import React, { useEffect, useState, useContext } from "react";
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {getPlacesData} from "./api";
import Home from "./pages/Home";
import SignIn_Up from "./pages/SignIn-Up";
import {GoogleContext} from "./context/googleContext";
import Profile from "./pages/Profile";
import InfoHoteles from "./pages/InfoHoteles";
import Book from "./pages/Book";
import Favorites from "./pages/Favorites";
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/sign-in" />} />
            <Route path="/sign-in" element={<SignIn_Up signIn={true}/>} />
            <Route path="/sign-up" element={<SignIn_Up signIn={false}/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/hotels-info/:hotel_id" element={<InfoHoteles />} />
            <Route path="/book" element={<Book />} />
            <Route path="/*"  element={<Navigate replace to="/home" />} />
            <Route path="/favs" element={<Favorites />} />
        </Routes>
    );
}