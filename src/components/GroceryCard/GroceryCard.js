import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

function GroceryCard(props) {
  return (
    <Card sx={{ maxWidth: 400, margin: '16px', backgroundColor: '#AAB4BF' }}>
      <CardHeader title={props.props.product} subheader={props.props.category} />
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography variant="body1">Description: {props.props.description}</Typography>
        <Typography variant="body1">Price: {props.props.price}</Typography>
        <Typography variant="body1">In Stock: {props.props.instock}</Typography>
        <Typography variant="body1">Rating: {props.props.rating}</Typography>
      </CardContent>
    </Card>
  );
}

export default GroceryCard;
