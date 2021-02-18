import React from "react";
import { useList } from "react-firebase-hooks/database";

export default function HomePg(props) {
  const [snapshots, loading, error] = useList(
    props.firebase.database().ref("turnsheets")
  );

  snapshots.map((item) => console.log("Item ->", item.key));

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
                <React.Fragment key={v.key}>{v.key}, </React.Fragment>
              ))}
            </span>
          </React.Fragment>
        )}
      </p>
    </div>
  );
}
