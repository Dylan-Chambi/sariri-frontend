import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Calendar from './Calendar';
import Huespedes from './Huespedes';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisableElevation({ price, checkIn, checkOut, numGuests }) {
  const [nroHuespedes, setNroHuespedes] = useState(numGuests);
  const [nroNoches, setNroNoches] = useState(1);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{
      minWidth: 275,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }}>
      <Typography sx={{ fontSize: 20,  backgroundColor: "#B9C7D8", borderRadius: 2, padding: 1, fontWeight: 'bold', margin: 2 }} gutterBottom>
        {price}$ noche
      </Typography>
      <Calendar setNroNoches={setNroNoches} checkIn={checkIn} checkOut={checkOut}/>
      <Huespedes nroHuespedes={nroHuespedes} setNroHuespedes={setNroHuespedes}/>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ backgroundColor: "#B9C7D8", display:'flex', 
        alignItems: 'center', justifyContent: 'center', borderRadius: 2, padding:1, margin: 5 }}>
          <Typography sx={{fontWeight: 'bold', fontSize:18}}>
            Precio total: {price*nroHuespedes*nroNoches}$
          </Typography>
        </Box>
        <Button variant="contained" padding={10} sx={{ margin: 5, width: '100px', height: '50px',
        fontSize: 18, fontWeight: 'bold', backgroundColor: "#1c74d4", color: 'white' , borderRadius: 2, 
      }} onClick={handleClickOpen}>
          RESERVAR
        </Button>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Su reserva fue realizada exitosamente!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Comuniquese con el hotel para confirmar su reserva.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
