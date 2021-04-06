import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useListKeys } from "react-firebase-hooks/database";

import firebase from "./services/firebase";
import useCreateKey from "./hooks/useCreateKey";
import DefaultItems from "./utils/default_items.json";

const Turnsheets = () => {
  return <p>Turnsheets</p>;
};

const Turnsheet = () => {
  const { ID } = useParams();
  const uniqueID = useCreateKey();

  const [turnsheetExists, setTurnsheetExists] = useState(null);
  const [turnsheetID, setTurnsheetID] = useState(null);
  const [address, setAddress] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);
  const [requiresInvestment, setRequiresInvestment] = useState(false);
  const [ownerSubTotal, setOwnerSubTotal] = useState(null);
  const [tenantSubTotal, setTenantSubTotal] = useState(null);
  const [rooms, setRooms] = useState(null);

  // Check if ID is sent over Params and it exists,
  // if None is present init new turnsheet,
  // if it doesnt exist, send user to dashboard (All Turnsheets List)
  useEffect(() => {
    if (ID) {
      firebase
        .database()
        .ref("turnsheets")
        .once("value")
        .then((snapshot) => {
          snapshot.hasChild(ID)
            ? setTurnsheetExists(snapshot.hasChild(ID))
            : window.location.replace("http://localhost:3000");
        });
    } else {
      setTurnsheetExists(false);
    }
  }, [ID]);

  // If ID exists, parse data to state variables,
  // else init new turnsheet
  useEffect(() => {
    if (turnsheetExists) {
      firebase
        .database()
        .ref(`turnsheets/${ID}`)
        .once("value", (snapshot) => {
          const data = snapshot.val();
          setTurnsheetID(ID);
          setAddress(data.address);
          setGrandTotal(data.estimated_grand_total);
          setRequiresInvestment(data.requires_investment);
          setOwnerSubTotal(data.owner_subtotal);
          setTenantSubTotal(data.tenant_subtotal);
          setRooms([data.rooms]);
        });
    } else {
      setTurnsheetID(uniqueID);
      setGrandTotal(0);
      setOwnerSubTotal(0);
      setTenantSubTotal(0);
      setRequiresInvestment(true);
      setRooms([{ interior: true }]);
    }
  }, [turnsheetExists, ID, uniqueID]);

  return (
    <div>
      <p>
        {ID ? `Edit` : `New`} Turnsheet {turnsheetID}
      </p>
      {address ? <p>{address}</p> : <p>No Address</p>}
      <p>Grand Total: {grandTotal}</p>
      <p>Owner Total: {ownerSubTotal}</p>
      <p>Tenant Total: {tenantSubTotal}</p>
      {rooms &&
        rooms.map((room) => {
          return (
            <Room
              key={`room-${room}`}
              roomName={Object.keys(room)}
              ID={turnsheetID}
            />
          );
        })}
    </div>
  );
};

const Room = ({ roomName, ID }) => {
  const [roomTotal, setRoomTotal] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`items/${ID}`)
      .on("value", (snapshot) => {
        setItems([snapshot.val()]);
      });
  }, [ID]);

  return (
    <div>
      <h4>{roomName}</h4>
      {items &&
        items
          .map((item) => {
            return (
              <Item key={`${roomName}-item-${Object.keys(item)}`} data={item} />
            );
          })
          .filter((item) => item.room_name === roomName)}
    </div>
  );
};

const Item = ({ data }) => {
  const [ownerResponsibility, setOwnerResponsibility] = useState(false);
  const toggleOwnerResponsibility = () => {
    setOwnerResponsibility(!ownerResponsibility);
  };
  return (
    <div>
      <p>
        <input
          type="checkbox"
          value={ownerResponsibility}
          onClick={toggleOwnerResponsibility}
        />{" "}
        {data.item_description} - {data.item_estimated_total_cost}
      </p>
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div>
      <h1>404 ERROR:</h1>
      <p>This is not a valid address. Please try again.</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/turnsheet/:ID" render={() => <Turnsheet />} />
        <Route path="/turnsheet" render={() => <Turnsheet />} />
        <Route path="/" exact component={Turnsheets} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}
