function useGetRoomTotal(items) {
    let total = 0;
    items.forEach(item => {
        total += item.item_estimated_total_cost;
    });

    return total;
}

export default useGetRoomTotal;