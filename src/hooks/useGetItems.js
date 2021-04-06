import { useState, useEffect } from 'react';
import firebase from '../services/firebase';
import useTurnsheetExists from './useTurnsheetExists';
import DefaultItems from '../utils/default_items.json';

export default function useGetItems(ID, room_name) {
    const [items, setItems] = useState(null);
    const exists = useTurnsheetExists(ID);

    useEffect(() => {
        exists ?
            firebase.database().ref(`items/${ID}/${room_name}`).on('value', snapshot => {
                setItems(snapshot.val());
            }) : setItems(DefaultItems);
    }, [ID, exists]);

    console.log(items)

    return items;
}
