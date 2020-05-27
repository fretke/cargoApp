import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {closeErrorWindow} from "../actions"

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ErrorPop(){
    const dispatch = useDispatch();
    const open = useSelector(state => state.error);
    
    const handleClose = () => {
      dispatch(closeErrorWindow());
      window.location.reload();
    };
  
    return (
      <div>
        <Dialog
          open={open.isError}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"OOPS... Problems!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {open.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Reload Page
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

}

export default ErrorPop;