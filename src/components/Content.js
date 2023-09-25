import React, { useEffect, useState } from 'react'
import AppBar from './AppBar/AppBar';

const Content = ({ socketConnection }) => {

  const renderHello = () => {
    return (
      <>
        <AppBar ></AppBar>
      </>
    )
  }

  return (
    <React.Fragment>
      {renderHello()}
    </React.Fragment>
  )
}


export default Content
