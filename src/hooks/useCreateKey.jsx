import { useState, useEffect } from 'react';
import firebase from '../services/firebase';

export default function useCreateKey() {
    const [key, setKey] = useState(null);

    useEffect(() => {
        firebase.database().ref().push().then(ref => {
            setKey(ref.key);
        })
    }, []);

    return key;
}
