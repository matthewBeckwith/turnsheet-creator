import { useState } from "react";

function useGetRoomTotal(items) {
    const [total, setTotal] = useState(0); 

    items.forEach(item => {
        total += item.item_estimated_total_cost;
    });

    return total;
}

export default useGetRoomTotal;