import { useCallback, useState } from 'react';
import firebase from '../services/firebase';
import useTurnsheetExists from './useTurnsheetExists';

// Ok, using the useGetRooms2 as an example, reformat the code to use hooks
// for all the data.  create methods for adding, removing etc where we can manipulate
// the rooms, the items (add, remove, send to firebase, etc),
// the totals from anywhere accessing the hooks.  May not be entirely correct
// approach but seems cleaner so I'd like to try it.

export const useGetRooms = (ID) => {
    const [rooms, setRooms] = useState(null);
    const exists = useTurnsheetExists(ID);

    return {
        rooms,
        setRooms,
        getAllRooms: useCallback(() => {
            exists ? setRooms(firebase.database().ref(`rooms/${ID}`).on('value', snapshot => {
                return Object.keys(snapshot.val());
            })) : setRooms(['interior']);
        })
    };
}
