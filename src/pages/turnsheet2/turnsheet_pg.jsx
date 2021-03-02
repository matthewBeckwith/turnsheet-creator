// This is where I'd like to redesign the turnsheet process
import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import firebase from '../../services/firebase';

export default function TurnsheetPg() {
    const { ID } = useParams();
    const [turnsheetID, setTurnsheetID] = useState('');
    
    
    useEffect(() => {
        const db = firebase.database().ref('turnsheets');
        if(ID){
            setTurnsheetID(ID);
        }else{
            const initID = db.push().then(ref => {
                setTurnsheetID(ref.key)
            });
        }
    },[]);

    console.log("ID: ", turnsheetID);
    return (
        <div>
            
            New Turnsheet Page
        </div>
    )
}
