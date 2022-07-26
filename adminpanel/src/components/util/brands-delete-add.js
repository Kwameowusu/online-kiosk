import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import db from "../../firebase";
import { uinqId } from "../util/uniqid";

export const brandsCatDelete  = async (acollection,id,statebag,setstatebag) => {
    const getbrandRef = collection(db, `${acollection}`);
    const q = query(getbrandRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {

        deleteDoc(doc(db, `${acollection}`, `${docs.ref.id}`));
    });

    const hh = statebag.map((h) => {
        if (h.id === id) {
            h.animationName = "SlideOutDown";
        }
        return h;
    });
    console.log(hh);
    setstatebag(hh);

    setTimeout(() => {
        const tt = statebag.filter((bb) => bb.id !== id);
        setstatebag(tt);
    }, 440);
}

export const brandsCatAdd = async (e,acollection,setgetstateload,getstatebag,setgetstatebag,setstatebag) => {
    e.preventDefault();

    try {
        setgetstateload(true);
        const anId = uinqId();
        await addDoc(collection(db, `${acollection}`), {
            id: anId,
            name: getstatebag,
            animationDuration: "500ms",
            animationName: "SlideInDown",
        });

        setstatebag((pp) => [
            ...pp,
            {
                id: anId,
                name: getstatebag,
            
                animationDuration: "500ms",
                animationName: "SlideInDown",
            },
        ]);
        setgetstatebag("");
        setgetstateload(false);
    } catch (error) {}
    
}