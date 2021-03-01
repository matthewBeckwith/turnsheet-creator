import React, { useState } from 'react';
import { Button } from '@material-ui/core';

const addRoom = () => {
    console.log("Room Added");
}

export default function CreateRoom({onClickHandler}) {
    return (
        <Button variant="contained" color="secondary" onClick={onClickHandler}>
             <h3>Create a Room</h3>
        </Button>
    )
}
