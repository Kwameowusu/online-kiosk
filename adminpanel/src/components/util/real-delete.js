import { getDatabase, ref, remove } from "firebase/database";

export const realDelete = async (id) => {
    const db = getDatabase();
console.log(id)
    await remove(ref(db, "orderdetails/" + id));
}