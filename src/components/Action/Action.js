import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './Action.css'; 

function Actions({ products }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEmailSent(false);
    setRecipientEmail('');
  };

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const productDetails = products.map((product) => {
    return `${product.product} - Price: ${product.price}, Quantity: ${product.instock}`;
  });

  const message = `Today's Grocery List :\n${productDetails.join('\n')}`;

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm('service_mmrzdza', 'template_6labw5d', e.target, 'es1n0oRONMUic3Yjb')
      .then(
        (result) => {
          console.log('Email sent successfully', result.text);
          setEmailSent(true);
          setOpenDialog(false);
        },
        (error) => {
          console.error('Email send error', error.text);
        }
      );
  };
  
  const form = useRef();
  return (
    <div>
      <IconButton edge="end" color="inherit" aria-label="print" onClick={handlePrint}>
        <PrintIcon fontSize="large" />
      </IconButton>

      <IconButton edge="end" color="inherit" aria-label="cart" onClick={handleCartClick}>
        <AddShoppingCartIcon  fontSize="large" />
        <span
          style={{
            position: 'absolute',
            top: '-1px',
            right: '1px',
            backgroundColor: 'white',
            borderRadius: '60%',
            padding: '5px',
            color: 'red',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          {products.length}
        </span>
      </IconButton>


      <IconButton edge="end" color="inherit" aria-label="share" onClick={handleShare}>
        <ShareIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        className={openDialog ? 'blur-background' : ''}
        PaperProps={{
          style: {
            width: '30%',
            maxWidth: 'none',
          },
        }}
      >
        <DialogTitle style={{ backgroundColor: '#1976d2', color: 'white', marginBottom: '10px' }}>
          Share via Email
        </DialogTitle>
        <DialogContent>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              label="Name"
              type="text"
              name="user_name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              type="email"
              name="user_email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={recipientEmail} 
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={message}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!recipientEmail || emailSent}
              style={{ marginTop: '10px' }}
            >
              {emailSent ? 'Email Sent' : 'Send Email'}
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Actions;
