import React from "react";
import firebase from "../services/firebase";

export default function GroupedByYear() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    firebase.db.collection("turnsheets").onSnapshot((snapshot) => {
      const lists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(lists);
    });
  }, []);

  return <div>{data}</div>;
}
