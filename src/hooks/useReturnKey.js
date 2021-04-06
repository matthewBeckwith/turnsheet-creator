import { useState, useEffect } from 'react';
import firebase from '../services/firebase';
import useCreateKey from '../hooks/useCreateKey';
import useTurnsheetExists from './useTurnsheetExists';

export default function useReturnKey(ID) {
    const [turnsheetID, setTurnsheetID] = useState(null);
    const uniqueID = useCreateKey();
    const exists = useTurnsheetExists(ID);

    useEffect(() => {
        if (exists) {
            firebase.database().ref('turnsheets').once('value', snapshot => {
                snapshot.hasChild(ID) ? setTurnsheetID(ID) : setTurnsheetID(uniqueID);
            })
        } else {
            setTurnsheetID(uniqueID);
        }
    }, [exists, ID, uniqueID]);

    return turnsheetID;
}