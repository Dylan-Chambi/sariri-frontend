import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Calendar from './Calendar';
import Huespedes from './Huespedes';
import { bgcolor, margin } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisableElevation({ price }) {
  const navigate = useNavigate();
  const [nroHuespedes, setNroHuespedes] = useState(1);
  const [nroNoches, setNroNoches] = useState(1);

  return (
    <Box sx={{
      minWidth: 275,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }}>
      <Typography sx={{ fontSize: 20, bgcolor: "#1c74d4", borderRadius: 2, padding: 1, color: 'white', fontWeight: 'bold', margin: 2 }} gutterBottom>
        {price}$ noche
      </Typography>
      <Calendar setNroNoches={setNroNoches}/>
      <Huespedes setNroHuespedes={setNroHuespedes}/>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ backgroundColor: "white"}}>
          <Typography>
            Precio sumado: {price*nroHuespedes*nroNoches}$
          </Typography>
        </Box>
        <Button variant="contained" sx={{ margin: 5, }} onClick={() => navigate('/book')}>
          RESERVAR
        </Button>
      </Box>
    </Box>
  );
}
