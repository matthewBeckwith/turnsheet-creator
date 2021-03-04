import React, { useState } from 'react'

export default function CreateTurnsheet({ID, unitAddress, lastSecurityDeposit, ownerBalance}) {
    const [turnsheet, setTurnsheet] = useState({});
    return (
        <div>
            <h3>{`Created Turnsheet ID: ${ID}`}</h3>
        </div>
    )
}
