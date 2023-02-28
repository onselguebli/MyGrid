import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
  const {id_colonne,id_grille,nom_colonne,largeur_colonne}=data
  
  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"modifier le colonne":"Ajouter un colonne"}</DialogTitle>
        <DialogContent>
        <form>
             <TextField id="id_colonne" value={id_colonne} onChange={e=>onChange(e)} placeholder="Enter id" label="id_colonne" variant="outlined" margin="dense" fullWidth required />
             <TextField id="id_grille" value={id_grille} onChange={e=>onChange(e)} placeholder="Enter id_grille" label="id_grille" variant="outlined" margin="dense" fullWidth  required/>
             <TextField id="nom_colonne" value={nom_colonne} onChange={e=>onChange(e)} placeholder="Enter nom colonne" label="nom_colonne" variant="outlined" margin="dense" fullWidth required />
             <TextField id="largeur_colonne" value={largeur_colonne} onChange={e=>onChange(e)} placeholder="Enter largeur_colonne" label="largeur_colonne" variant="outlined" margin="dense" fullWidth required />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined" >Annuler</Button>
          <Button  autoFocus  variant="contained" onClick={()=>handleFormSubmit()}>
          {id?"Modifier":"Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
