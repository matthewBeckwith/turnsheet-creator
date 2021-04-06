import { useState, useEffect } from 'react';
import firebase from '../services/firebase';

export default function useTurnsheetExists(ID) {
    const [turnsheetExists, setTurnsheetExists] = useState(null);

    useEffect(() => {
        if (ID) {
            firebase.database().ref('turnsheets').once('value', snapshot => {
                snapshot.hasChild(ID) ? setTurnsheetExists(true) : setTurnsheetExists(false);
            })
        } else {
            setTurnsheetExists(false);
        }
    }, [ID]);

    return turnsheetExists;
}
