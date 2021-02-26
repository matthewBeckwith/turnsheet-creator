import React, { useState } from "react";

const today_date = new Date().toDateString();


// While writing this I'm thinking this needs a different structure than originally thought, 
// likely these item lists will be attached to a room.  So the structure could resemble something more like
//  - turnsheet/room_list/room/items/items_item 
// Needs to be thought out more, may result in a new DB structure or separation

export default function CreateTurnsheetFragment() {
  const [items, setItems] = useState([
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
  ]);

  const addItem = (item) => {
    setItems(...items, item);
  }

  return (
    <div>
      <h3>Global Defaults:</h3>
      {
        items.map((item, index) => {
          return <p key={index}>{`${item.item_desc} - $${item.item_total_cost}`}</p>
        })
      }
    </div>
  );
}
