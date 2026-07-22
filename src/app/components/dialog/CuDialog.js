import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function CuDialog(props) {
    const handleClose = () => {
        props?.handleClose()
    };

    return (
        <Dialog
            open={props?.isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir='ltr'
        >
            <div className='d-flex justify-content-between overflow-hidden' style={{ minWidth: '350px' }}>
                <DialogTitle id="alert-dialog-title"
                    sx={{ fontFamily: 'yekanBakh-bold' }}>
                    {props?.dialogHeader}
                </DialogTitle>
                <i onClick={()=>handleClose()} className="bi bi-x fs-3 ps-4 pt-3"></i>
            </div>

            <DialogContent>
                <DialogContentText id="alert-dialog-description"
                    sx={{ fontFamily: 'yekanBakh-bold' }}>
                    {props?.dialogContent}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
