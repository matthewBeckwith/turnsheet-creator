export const DefaultItemList = () => {
    const today_date = new Date().toDateString();
    return [
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