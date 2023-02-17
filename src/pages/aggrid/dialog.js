import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,age,country,date,year}=data

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update user":"Create new user"}</DialogTitle>
        <DialogContent>
         <form>
             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="name" variant="outlined" margin="dense" fullWidth />
             <TextField id="age" value={age} onChange={e=>onChange(e)} placeholder="Enter age" label="age" variant="outlined" margin="dense" fullWidth />
             <TextField id="country" value={country} onChange={e=>onChange(e)} placeholder="Enter country" label="country" variant="outlined" margin="dense" fullWidth />
             <TextField id="date" value={date} onChange={e=>onChange(e)} placeholder="Enter Date of birth" label="Date of Birth" variant="outlined" margin="dense" fullWidth />
             <TextField id="year" value={year} onChange={e=>onChange(e)} placeholder="Enter year of birth" label="Year of Birth" variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}