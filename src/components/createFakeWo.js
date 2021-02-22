import { Today } from "@material-ui/icons";
import firebase from "../services/firebase";

const unitNumberOptions = [
    '1234', '4561', '7894', '1597', '2356', '6542', '7865', '4578', '8985', '3565', '5412', '8451', '4124', '8524', '6532', '4573', '5288', '1124', '2411'
];
const unitStreetOptions = [
    'Fake', 'Nerd', 'Western', 'Main', 'Wicked', 'Reckless', 'BoomBoom', 'Makers', 'Anus', 'Armorstand', 'Pencildick', 'Limitless', 'Whoopsie', 'Biscuit', 'Cement', 'Oak Tree', 'Fortnite', 'Gucci', 'Pepsi'
];
const streetTypeOptions = [
    'St.', 'Ave.', 'Blvd.', 'Rd.', 'Ct.', 'Way'
];
const zipcodeOptions = [
    '12345', '55555', '33221', '55647', '77894', '44411'
];
const priceOptions = [
    125.50, 300.24, 1000.00, 850.00, 672.30, 100.00, 532.22
]

function rando(list) {
    const rand = Math.floor(Math.random() * list.length);

    return list[rand];
}

function createTurnssheetId() {
    let num = []

    while (num.length < 6) {
        num.push(Math.floor(Math.random() * 9));
    }

    return num.join('');
}

export default function CreateFakeWo(year) {
    const db = firebase.database().ref(`grouped_by_year/${year}`);
    const unitNum = rando(unitNumberOptions);
    const street = rando(unitStreetOptions);
    const streetType = rando(streetTypeOptions);
    const zipCode = rando(zipcodeOptions);
    const totalCost = rando(priceOptions);
    const createdDate = new Date();
    const createdDay = createdDate.getDay();
    const createdMonth = createdDate.getMonth();
    const createdYear = createdDate.getFullYear();
    const addDays = createdDay + 6;
    const dueDateCombined = `${createdYear}-${createdMonth}-${addDays}`;
    const dueDate = new Date(dueDateCombined);

    console.log("Created Date - ", createdDate);
    console.log("Created Day - ", createdDay);
    console.log("Created Month - ", createdMonth);
    console.log("Created Year - ", createdYear);
    console.log("Created Add Days - ", addDays);
    console.log("Created Due Date Combined - ", dueDateCombined);
    console.log("Created Due Date - ", dueDate);

    const fakeWo = {
        address: `${unitNum} ${street} ${streetType}, Lakeland FL, ${zipCode}`,
        created_at: createdDate,
        due_by: dueDate,
        total_cost: totalCost,
        turnsheet_id: createTurnssheetId()
    }

    db.push(fakeWo);
}
