import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginLeft: '8%',
      color: 'white',
      bgcolor: '#fff',
      borderRadius: '10px',
    }}>
      <Button variant="outlined" onClick={handleClickOpen}
        sx={{
          color: '#fff',
          borderColor: '#fff',
          width: '100%',
          height: '100%',
          bgcolor: '#fff',

        }}
      >
        <InfoIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        bgcolor="primary.main"
      >
        <DialogTitle>{"Explicación de los rangos de precios"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" align='center'>
            <h5>* El rango estimado de precios puede variar dependiendo el pais o region. </h5>
            <h5>En caso de no encontrarse hoteles de acuerdo al filtro, se mostraran todos los hoteles.</h5>
            <h5>El siguiente desglose es unicamente una referencia aproximada: </h5>
            <h5>$ = ~ 150 </h5>
            <h5>$$ = 150 ~ 300</h5>
            <h5>$$$ = 300 ~ 350</h5>
            <h5>$$$$ = 350 ~ </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
