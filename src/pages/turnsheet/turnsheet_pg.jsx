import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import EditTurnsheetFragment from "./edit_turnsheet/editTurnsheetFragment";
import CreateTurnsheetFragment from "./create_turnsheet/createTurnsheetFragment";
import CreateRoom from "./utils/createRoom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const today_date = new Date().toDateString();

export default function TurnsheetPg() {
  const classes = useStyles();
  const { id } = useParams();
  const [rooms, setRooms] = useState([
    {
      house: [
          {
            item_created_at: today_date,
            item_desc: "Standard Clean",
            item_labor_hours: 0,
            item_labor_subtotal: 250,
            item_location: "Interior",
            item_material_cost: 0,
            item_notes: "",
            item_total_cost: 250,
            item_updated_at: today_date,
            owner_responsibility: false
        },
        {
            item_created_at: today_date,
            item_desc: "Replace Air Filter",
            item_labor_hours: .5,
            item_labor_subtotal: 15,
            item_location: "Interior",
            item_material_cost: 10,
            item_notes: "",
            item_total_cost: 15,
            item_updated_at: today_date,
            owner_responsibility: false
        }
      ]
    }
  ]);

  const handleAddRoom = () => {
    const tempKey = `room${rooms.length}`;
    setRooms([
      ...rooms,
      {[tempKey] :[]}
    ]);
  }

  return (
    <div className={classes.root}>
      {/* {id ? <EditTurnsheetFragment id={id} current_rooms={rooms} /> : <CreateTurnsheetFragment current_rooms={rooms} />} */}
      {rooms.length &&
        rooms.map((room, index) => {
          console.log(index);
          return <p key={`${room.key}-Item-${index}`}>hello</p>
        })
      }
      <CreateRoom onClickHandler={handleAddRoom} />
    </div>
  );
}


// SAMPLE Turnsheet

// {
//   ID: {
//     address:"",
//     security_deposit:0,
//     owner_balance:0,
//     rooms:[
//       {
//         ID: {
//           room_name:"",
//           items:[
//             {
//               ID: {
//                 description:"",
//                 labor_hours:0,
//                 labor_subtotal:0,
//                 material_subtotal:0,
//                 item_total:0,
//               }
//             }
//           ]
//         }
//       }
//     ],
//     room_total:0,
//   }
// }