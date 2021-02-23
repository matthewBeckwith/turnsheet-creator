import React from "react";
import firebase from "../services/firebase";
import { useList } from "react-firebase-hooks/database";

export default function DatabaseList({ year }) {
  const [snapshots, loading, error] = useList(
    firebase.database().ref(`grouped_by_year/${year}`)
  );

  return (
    <div>
      <p>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && snapshots && (
          <React.Fragment>
            <span>
              List:{" "}
              {snapshots.map((v) => (
                <React.Fragment key={v.key}>{v.val().address}, </React.Fragment>
              ))}
            </span>
          </React.Fragment>
        )}
      </p>
    </div>
  );
}
