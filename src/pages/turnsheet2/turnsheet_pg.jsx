import React, { useState } from "react";

import CreateTurnsheet from "./createTurnsheet";
import EditTurnsheet from "./editTurnsheet";

export default function TurnsheetPg({
  ID,
  rooms,
  handleSetDefaultRoom,
  handleAddRoom,
  handleRemoveRoom,
}) {
  return (
    <div>
      {ID && (
        <EditTurnsheet
          ID={ID} />
      )}
      {!ID && (
        <CreateTurnsheet
          rooms={rooms}
          handleSetDefaultRoom={handleSetDefaultRoom}
          handleAddRoom={handleAddRoom}
          handleRemoveRoom={handleRemoveRoom}
        />
      )}
    </div>
  );
}
