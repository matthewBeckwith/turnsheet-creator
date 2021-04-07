import {useCallback, useEffect, useState} from 'react';

// an example of adding or removing rooms with a custom hook.

export const useGetRooms = init => {
    const [rooms, setRooms] = useState(init);

    return {
        rooms,
        setRooms,
        add: useCallback(a => setRooms(v => [...v, a])),
        clear: useCallback(() => setRooms(() => [])),
        removeByID: useCallback(id => setRooms(arr => arr.filter(v => v && v.id !== id))),
        removeIndex: useCallback(index => setRooms(v => {
            v.splice(index, 1);
            return v;
        }))
    }
}