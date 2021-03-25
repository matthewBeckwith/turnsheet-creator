import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import firebase from '../../Backup/services/firebase';

import defaultItems from '../../Backup/utils/defaultItems';

export default function Turnsheet({handleTurnsheetID, turnsheetID}) {
    const { ID } = useParams();
    const [currentTurnsheet, setCurrentTurnsheet] = useState({})

    useEffect(() => {
        ID ? handleTurnsheetID(ID) : 
        firebase
        .database()
        .ref("turnsheets")
        .push()
        .then((ref) => {
            handleTurnsheetID(ref.key);
        });
      }, []);

    return (
        <div>
            {turnsheetID}
            {console.log(defaultItems)}
        </div>
    )
}
