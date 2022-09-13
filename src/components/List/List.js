import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles.js';
import Box from '@mui/material/Box';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import InformationButton from './InformationButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '6px 26px 6px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));
const List = ({ places, childClicked, isLoading, setPriceRange, priceRange, setMaxPlaces, maxPlaces, checkIn, checkOut, numGuests }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);
  return (
    <div className={classes.container}>
      <Box
        display="flex justify-content-around"
        color={'white'}
        backgroundColor={'primary.main'}
        padding={3}
        borderRadius={3}


      >
        <Box display="flex" alignItems="center" justifyContent="center" sx={{
          spacing: 2,
        }}>
        <Typography variant="h4">Encuentra tu hotel!</Typography>
        <InformationButton />
        </Box>
        {isLoading ? (
          <div className={classes.loading}>
            <CircularProgress size="5rem" color='inherit' />
          </div>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={4} color="white">
              <Box display="flex" alignItems="center" marginRight={4} flexDirection="column" >
                <Typography variant="h6">Rango de Precio</Typography>
                <FormControl fullWidth>
                  <Select id="demo-simple-select-label" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                    input={<BootstrapInput />}>
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="$">$</MenuItem>
                    <MenuItem value="$$">$$</MenuItem>
                    <MenuItem value="$$$">$$$</MenuItem>
                    <MenuItem value="$$$$">$$$$</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex" alignItems="center" flexDirection="column">
                <Typography variant="h6">Limite de resultados</Typography>
                <FormControl fullWidth>
                  <Select id="demo-simple-select-label" value={maxPlaces} onChange={(e) => {
                    setMaxPlaces(e.target.value)
                  }}
                    input={<BootstrapInput />}>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              

            </Box>
            <Grid container spacing={3} className={classes.list}>
              {places?.map((place, i) => (
                <Grid ref={elRefs[i]} key={i} item xs={12}>
                  <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} checkIn={checkIn} checkOut={checkOut} numGuests={numGuests} />
                </Grid>
              ))}

            </Grid>
          </>

        )}
      </Box>
    </div>
  );
};

export default List;
