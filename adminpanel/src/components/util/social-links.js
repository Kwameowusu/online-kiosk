import { uinqId } from "./uniqid";
import { updateDoc, doc } from "firebase/firestore";
import db from "../../firebase";

export const socialLinks = (
	e,
	setgetstateonload,
	statebag,
	setstatebag,
	getstate,
	setgetstate,
	platform
) => {
	e.preventDefault();
	try {
		setgetstateonload(true);

		const anId = uinqId();
        console.log(getstate)

		const formRef = doc(db, "sociallinks", statebag[0].sid);
		switch (platform) {
			case "facebook":
				updateDoc(formRef, {
					id: anId,
					facebook: getstate,
                });
				const re = statebag.map((uu) => {
					uu.id = anId;
					uu.facebook = getstate;
					return uu;
				});

				setstatebag(re);
                setgetstate(getstate);
		setgetstateonload(false);
                
				break;
			case "twitter":
				updateDoc(formRef, {
					id: anId,
					twitter: getstate,
				});
				const tw = statebag.map((uu) => {
					uu.id = anId;
					uu.twitter = getstate;
					return uu;
				});

				setstatebag(tw);
                setgetstate(getstate);
		setgetstateonload(false);
                
				break;
			case "whatsapp":
				updateDoc(formRef, {
					id: anId,
					whatsapp: getstate,
				});
				const wh = statebag.map((uu) => {
					uu.id = anId;
					uu.whatsapp = getstate;
					return uu;
				});

				setstatebag(wh);
                setgetstate(getstate);
		setgetstateonload(false);
                
				break;
			case "instagram":
				updateDoc(formRef, {
					id: anId,
					instagram: getstate,
				});

				const ins = statebag.map((uu) => {
					uu.id = anId;
					uu.instagram = getstate;
					return uu;
				});

				setstatebag(ins);
                setgetstate(getstate);
		setgetstateonload(false);
                
				break;

			default:
				break;
		}

    } catch (error) {
		setgetstateonload(false);
        
    }
};
