import { useEffect, useState } from 'react';
import firebase from '../services/firebase';
import useTurnsheetExists from './useTurnsheetExists';

export default function useGetRooms(ID) {
    const [rooms, setRooms] = useState(null);
    const exists = useTurnsheetExists(ID);

    useEffect(() => {
        if (exists) {
            firebase.database().ref(`rooms/${ID}`).on('value', snapshot => {
                setRooms(Object.keys(snapshot.val()));
            })
        } else {
            setRooms(['interior']);
        }
    }, [exists, ID]);

    return rooms;
}
