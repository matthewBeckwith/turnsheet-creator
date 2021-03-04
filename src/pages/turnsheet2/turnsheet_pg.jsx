import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../services/firebase";

import CreateTurnsheet from './createTurnsheet';
import EditTurnsheet from './editTurnsheet';

export default function TurnsheetPg() {
  const { ID } = useParams();
  const [turnsheetID, setTurnsheetID] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ID) {
      setTurnsheetID(ID);
      setLoading(false);
    } else {
      firebase
        .database()
        .ref("turnsheets")
        .push()
        .then((ref) => {
          setTurnsheetID(ref.key);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      {!loading && ID && <EditTurnsheet ID={turnsheetID} />}
      {!loading && !ID && <CreateTurnsheet ID={turnsheetID} />}
    </div>
  );
}
