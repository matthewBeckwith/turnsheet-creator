import React, {useState} from 'react';
import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";
import { firebaseConfig } from "../../utils/firebaseConfig";

const s = (a) => JSON.stringify(a, null, 2);

export default function TestFirebase() {
    const [limit, setLimit] = useState(1);
    return (
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <FirebaseDatabaseNode
            path="static_text/"
            limitToLast={limit}
            orderByKey
            // orderByValue={"created_at"}
          >
              {d => {
              return (
                <React.Fragment>
                  <pre>Path {d.path}</pre>
                  <pre style={{ height: 300, overflow: "auto" }}>
                    {console.log(d)}
                    Value {s(d.value)}
                  </pre>
                  <button
                    onClick={() => {
                      setLimit(limit + 1);
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
