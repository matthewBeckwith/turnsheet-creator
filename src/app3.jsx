import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import useCreateKey from './hooks/useCreateKey';

const Turnsheets = () => {
    return (
        <div>
            <p>Turnsheets Grouped by Year!</p>
        </div>
    )
}

const CreateTurnsheet = () => {
    return (
        <div>
            <p>Create Turnsheet</p>
        </div>
    )
}

const Turnsheet = () => {
    return (
        <div>
            <p>Edit / New Turnsheet</p>
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
    const [address, setAddress] = useState(null);
    const [securityDeposit, setSecurityDeposit] = useState(null);
    const [ownerBalance, setOwnerBalance] = useState(null);
    const [basicData, setBasicData] = useState(null);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleDepositChange = (e) => {
        setSecurityDeposit(e.target.value);
    }

    const handleBalanceChange = (e) => {
        setOwnerBalance(e.target.value);
    }

    const handleBasicDataSubmit = () => {
        setBasicData({
            id: useCreateKey(),
            address,
            securityDeposit,
            ownerBalance
        });
        location.replace(`/turnsheet/${setBasicData.id}`);
    }

    return (
        <Router>
            <Switch>
                <Route path="/turnsheet/:ID"  render={() => <Turnsheet />} />
                <Route path="/create" exact render={() => 
                    <CreateTurnsheet 
                        handleAddressChange={handleAddressChange} 
                        handleBalanceChange={handleBalanceChange} 
                        handleDepositChange={handleDepositChange} 
                        handleBasicDataSubmit={handleBasicDataSubmit} 
                    />
                } />
                <Route path="/" exact component={Turnsheets} />
                <Route component={ErrorPage} />
            </Switch>
        </Router>
    )
}
