import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";
import useCreateKey from './hooks/useCreateKey';

const Turnsheets = () => {
    return (
        <div>
            <p>Turnsheets Grouped by Year!</p>
        </div>
    )
}

const Turnsheet = () => {
    const {ID} = useParams();
    const uniqueID = useCreateKey();
    const todaysDate = new Date().toTimeString();

    const [address, setAddress] = useState(null);
    const [secDeposit, setSecDeposit] = useState(null);
    const [ownerBalance, setOwnerBalance] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [grandTotal, setGrandTotal] = useState(0);
    const [ownerSubTotal, setOwnerSubTotal] = useState(0);
    const [tenantSubTotal, setTenantSubTotal] = useState(0);
    const [requiresInvestment, toggleRequiresInvestment] = useState(false);

    const handleChangeAddress = (e) => {}

    const handleChangeDeposit = (e) => {}

    const handleChangeOwnerBalance = (e) => {}

    const handleToggleInvestment = () => {
        toggleRequiresInvestment(!requiresInvestment);
    }

    return (
        <div>
            <p>{ID ? `Edit Turnsheet ${ID}` : `New Turnsheet ${uniqueID}`}</p>
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
