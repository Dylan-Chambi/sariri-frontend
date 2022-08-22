import React, { useEffect, useState } from "react";
import {Route, Routes} from 'react-router-dom';
import {getPlacesData} from "../api";
import Footer from "../components/Footer";
import Principal from "../components/Principal";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import scrollreveal from "scrollreveal";
import {Grid} from '@material-ui/core'
import Map from '../components/Map/Map';
import {useContext} from "react";
import {GoogleContext} from "../context/googleContext";
 function Home() {

     const {flag, user} = useContext(GoogleContext)

     const [autocomplete, setAutocomplete] = useState(null);
     const [coords, setCoords] = useState({});
     const [childClicked, setChildClicked] = useState(null);
     const [bounds, setBounds] = useState(null);
     const [filteredPlaces, setFilteredPlaces] = useState([]);
     const [places, setPlaces] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const [type, setType] = useState('hotels');
     const [rating, setRating] = useState('');
     const [priceRange, setPriceRange ] = useState('');


     // useEffect(() => {
     //     getPlacesData().then((data) => {console.log(data); setPlaces(data)})
     // }, [])

     useEffect(() => {
         navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
             setCoords({ lat: latitude, lng: longitude });
         });
     }, []);

     useEffect(() => {
         const filtered = places.filter((place) => Number(place.rating) > rating);

         setFilteredPlaces(filtered);
     }, [rating]);

     useEffect(() => {

         const filtered = places.filter((place) => String(place.price_level) === priceRange);
         filtered.map((place) => console.log("Nivel: "+place.price_level))
         setFilteredPlaces(filtered);
     }, [priceRange]);

     useEffect(() => {
         if (bounds) {
             setIsLoading(true);

             getPlacesData(type, bounds.sw, bounds.ne)
                 .then((data) => {
                     setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
                     setFilteredPlaces([]);
                     setRating('');
                     setPriceRange('')
                     setIsLoading(false);

                 });
         }
     }, [bounds, type]);



     const onLoad = (autoC) => setAutocomplete(autoC);

     const onPlaceChanged = () => {
         const lat = autocomplete.getPlace().geometry.location.lat();
         const lng = autocomplete.getPlace().geometry.location.lng();

         setCoords({ lat, lng });
     };

     const showHotelsInConsole = () => {
         console.log("Start showing")
         console.log("-------------------------------------")
         places?.map((place, i) => (console.log(place)))
         console.log("-------------------------------------")
         console.log("Done showing")
     }


  useEffect(() => {

    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });
    sr.reveal(
      `
        nav,
        #hero,
        footer
        `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);


  return (
    <div>
      <ScrollToTop />
        <Navbar />
        <Principal onPlaceChanged={onPlaceChanged} onLoad={onLoad} showHotels={showHotelsInConsole()}/>
            <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Map
                    setChildClicked={setChildClicked}
                    setBounds={setBounds}
                    setCoords={setCoords}
                    coords={coords}
                    places={filteredPlaces.length ? filteredPlaces : places}
                />
            </Grid>
      <Footer />
    </div>
  );
}
export default Home;
