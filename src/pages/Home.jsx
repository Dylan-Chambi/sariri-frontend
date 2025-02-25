import React, { useContext, useEffect, useState } from "react";
import { getPlacesData } from "../api";
import Footer from "../components/Footer";
import Principal from "../components/Principal";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Hotels from "../components/Hotels";
import ScrollReveal from "./../components/container/ScrollReveal";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { GoogleContext } from "../context/googleContext";

 function Home() {
    const [places, setPlaces] = useState([])
    const {userSariri} = useContext(GoogleContext);
    const [autocomplete, setAutocomplete] = useState(null);
    const [coords, setCoords] = useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [bounds, setBounds] = useState(null);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState("");
    const [priceRange, setPriceRange] = useState("Todos");
    const [maxPlaces, setMaxPlaces] = useState(10);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [numGuests, setNumGuests] = useState([1, 0]);
    const [ isAPIError, setIsAPIError ] = useState(false);


    const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setPriceRange("Todos");
    setIsAPIError(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
    const googlePrompt = document.getElementById("credential_picker_container")
    if (googlePrompt) {
      googlePrompt.style.display = "none";
    }
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating, places]);

  useEffect(() => {
    const filtered = places.filter(
      (place) => {
        return place.price_level === priceRange
      }
    );
    if (filtered.length===0 && priceRange!=="Todos") {
      setOpen(true);
    }
    setFilteredPlaces(filtered);
  }, [priceRange, places]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(bounds.sw, bounds.ne, maxPlaces, userSariri?.user_id).then(data => {
        setPlaces(data.data ?? []);
        //console.log(data.data);
        setIsAPIError(false);
      }).catch((error) => {
        setIsAPIError(true);
      }).finally(() => {
        setRating("");
        setPriceRange("Todos");
        setIsLoading(false);
      });
    }
  }, [bounds, maxPlaces, userSariri]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ScrollReveal>
        <Principal
          numGuests={numGuests}
          setNumGuests={setNumGuests}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoad}
        />
      </ScrollReveal>
      <ScrollReveal>
        <Hotels
          numGuests={numGuests}
          checkIn={checkIn}
          checkOut={checkOut}
          maxPlaces={maxPlaces}
          setMaxPlaces={setMaxPlaces}
          coords={coords}
          places={places}
          filteredPlaces={filteredPlaces}
          setCoords={setCoords}
          setBounds={setBounds}
          setChildClicked={setChildClicked}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          isLoading={isLoading}
          childClicked={childClicked}
        />
      </ScrollReveal>
      <Footer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Lo sentimos, no se encontraron lugares de acuerdo al filtro seleccionado."}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isAPIError}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Lo sentimos, no se pudo obtener la informaciÃ³n de los lugares."}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Home;