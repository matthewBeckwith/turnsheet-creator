function defaultItems(){
    return [
        {
          "item_description": "Standard Cleaning",
          "item_location": "interior",
          "item_estimated_labor_hours": 12.5,
          "item_estimated_labor_total": 250,
          "item_estimated_material_cost": 0,
          "item_estimated_total_cost": 250,
          "item_notes": "",
          "item_created_at": new Date().toDateString(),
          "item_updated_at": new Date().toDateString(),
          "owner_responsibilty": false
        },
        {
          "item_description": "Air Filter",
          "item_location": "interior",
          "item_estimated_labor_hours": 0.25,
          "item_estimated_labor_total": 5,
          "item_estimated_material_cost": 10,
          "item_estimated_total_cost": 15,
          "item_notes": "",
          "item_created_at": new Date().toDateString(),
          "item_updated_at": new Date().toDateString(),
          "owner_responsibilty": false
        },
        {
          "item_description": "Pest Control",
          "item_location": "interior",
          "item_estimated_labor_hours": 5,
          "item_estimated_labor_total": 100,
          "item_estimated_material_cost": 0,
          "item_estimated_total_cost": 100,
          "item_notes": "",
          "item_created_at": new Date().toDateString(),
          "item_updated_at": new Date().toDateString(),
          "owner_responsibilty": false
        },
      ]
}

export default defaultItems;