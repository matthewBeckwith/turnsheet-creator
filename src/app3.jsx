import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";

import firebase from './services/firebase';
import useCreateKey from './hooks/useCreateKey';

const Turnsheets = () => {
    return <p>Turnsheets</p>
}

const Turnsheet = () => {
    const {ID} = useParams();
    const uniqueID = useCreateKey(); 

    const [turnsheetID, setTurnsheetID] = useState(null);
    const [address, setAddress] = useState(null);
    const [grandTotal, setGrandTotal] = useState(null);
    const [requiresInvestment, setRequiresInvestment] = useState(false);
    const [ownerSubTotal, setOwnerSubTotal] = useState(null);
    const [tenantSubTotal, setTenantSubTotal] = useState(null);
    const [rooms, setRooms] = useState(null);

    // this is throwing errors but I'm thinking something like this... parse the data into state,
    // work with it then send back to firebase when complete as an object or couple objects if I
    // flatten the DB

    useEffect(() => {
        if(ID){
            firebase.database().ref('turnsheets').once('value', snapshot => {
                snapshot.hasChild(ID)
            }) && firebase.database().ref(`turnsheets/${ID}`).once('value', snapshot => {
                setTurnsheetID(ID);
                setAddress(snapshot.val().address);
                setGrandTotal(snapshot.val().estimated_grand_total);
                setRequiresInvestment(snapshot.val().requires_investment);
                setOwnerSubTotal(snapshot.val().owner_subtotal);
                setTenantSubTotal(snapshot.val().tenant_subtotal);
                setRooms(snapshot.val().rooms);
            })
        }else{
            setTurnsheetID(uniqueID);
                setGrandTotal(0);
                setOwnerSubTotal(0);
                setTenantSubTotal(0);
                setRequiresInvestment(true);
        }
        
    }, [ID, uniqueID]);

    return (
        <div>
            <p>{ID ? `Edit` : `New`} Turnsheet {turnsheetID}</p>
            {address ? <p>{address}</p> : <p>No Address</p>}
            <p>Grand Total: {grandTotal}</p>
            <p>Owner Total: {ownerSubTotal}</p>
            <p>Tenant Total: {tenantSubTotal}</p>
        </div>
    )
}

const ErrorPage = () => {
    return (
        <div>
            <h1>404 ERROR:</h1>
            <p>This is not a valid address.  Please try again.</p>
        </div>
    )
}


export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/turnsheet/:ID"  render={() => <Turnsheet />} />
                <Route path="/turnsheet"  render={() => <Turnsheet />} />
                <Route path="/" exact component={Turnsheets} />
                <Route component={ErrorPage} />
            </Switch>
        </Router>
    )
}
