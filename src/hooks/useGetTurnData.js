import { useState, useEffect } from 'react';
import firebase from '../services/firebase';
import useTurnsheetExists from './useTurnsheetExists';

export default function useGetTurnData(ID) {
    const [data, setData] = useState(null);
    const exists = useTurnsheetExists(ID);

    useEffect(() => {
        exists ? firebase.database().ref(`turnsheets/${ID}`).on('value', snapshot => {
            setData(snapshot.val())
        }) : setData({
            address: "",
            estimated_grand_total: 0,
            last_deposit: 0,
            owner_balance: 0,
            owner_subtotal: 0,
            requires_investment: false,
            tenant_subtotal: 0
        })
    }, [ID, exists]);

    return data;
}
