import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../services/firebase";

export default function TurnsheetPg() {
  const { ID } = useParams();
  const [turnsheetID, setTurnsheetID] = useState("");
  const [rooms, setRooms] = useState([]);
  const [turnsheet, setTurnsheet] = useState({});

  const getRooms = (id) => {
    return <p>Boom</p>;
  };

  useEffect(() => {
    if (ID) {
      setTurnsheetID(ID);
    } else {
      firebase
        .database()
        .ref("turnsheets")
        .push()
        .then((ref) => {
          setTurnsheetID(ref.key);
        });
    }
  }, []);

  return (
    <div>
      {ID && <h3>{`Turnsheet ID: ${turnsheetID}`}</h3>}
      {!ID && <h3>{`Created Turnsheet ID: ${turnsheetID}`}</h3>}
      {getRooms(turnsheetID)}
    </div>
  );
}
