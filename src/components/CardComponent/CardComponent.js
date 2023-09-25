import React, { useState } from 'react';
import { FormControl, TextField, Button, Typography, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import GroceryCard from '../GroceryCard/GroceryCard';
import { createTheme } from '@mui/material/styles';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import './CardComponent.css';

const theme = createTheme();

function CardComponent(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [productText, setProductText] = useState(props.product.product);

  const handleClose = () => {
    setOpen(false);
    setInput('');
    setError('');
  };

  const updateProduct = () => {
    if (input.trim() === '') {
      setError('Please enter a valid item.');
    } else {
      setProductText(input);
      handleClose();
    }
  };

  const handleDelete = () => {
    props.deleteProduct(props.product.id);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="todo__modal">
        <div className="modal__content">
          <Button color="inherit" className="closeButton" onClick={handleClose}>
            <CloseIcon />
          </Button>
          <div className="form-container">
            <FormControl className="form">
              <Typography className="modal__header">Update Item</Typography>
              <TextField
                placeholder={props.product.product}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                variant="outlined"
                size="medium"
                className="textField"
                fullWidth
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                className="button"
                onClick={updateProduct}
              >
                Update
              </Button>
              {error && <Typography className="errorText">{error}</Typography>}
            </FormControl>
          </div>
        </div>
      </Modal>
      <ListItemAvatar style={{ display: 'flex', alignItems: 'center' }}>
        <img
          alt="Grocery"
          src={props.product.image}
          style={{ display: 'flex', alignItems: 'center', borderRadius: '10px' }}
          className="image"
        />
        <GroceryCard props={props.product} />
      </ListItemAvatar>
      {/* <IconButton edge="end" color="primary" aria-label="edit" onClick={handleOpen}>
        <EditOutlinedIcon />
      </IconButton> */}
      <IconButton edge="end" color="secondary" aria-label="delete" onClick={handleDelete}>
        <DeleteIcon  />
      </IconButton>
    </div>
  );
}

export default CardComponent;
