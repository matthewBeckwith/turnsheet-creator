import React, {useState} from 'react';
import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";
import { firebaseConfig } from "../../utils/firebaseConfig";

const s = (a: any) => JSON.stringify(a, null, 2);

export default function TestFirebase() {
    const [limit, setLimit] = useState(2);
    return (
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <FirebaseDatabaseNode
            path="grouped_by_year/"
            limitToFirst={limit}
            orderByKey
            // orderByValue={"created_on"}
          >
              {d => {
              return (
                <React.Fragment>
                  <pre>Path {d.path}</pre>
                  <pre style={{ height: 300, overflow: "auto" }}>
                    Value {s(d.value)}
                  </pre>
                  <button
                    onClick={() => {
                      setLimit(limit + 2);
                    }}
                  >
                    Load more
                  </button>
                </React.Fragment>
              );
            }}
          </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
    )
}
