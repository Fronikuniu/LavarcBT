import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { GiCheckMark } from 'react-icons/gi';
import { BiHide, BiShow } from 'react-icons/bi';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '../configuration/firebase';

function OpinionsAdmin() {
  const [allOpinions, setAllOpinions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'opinions'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const opinions = [];
      querySnapshot.forEach((document) => {
        opinions.push({ doc_id: document.id, ...document.data() });
      });
      setAllOpinions(opinions);
    });
    return () => unsubscribe();
  }, []);

  const acceptOpinion = async (id, value) => {
    const opinionRef = doc(db, 'opinions', id);
    await updateDoc(opinionRef, {
      isAccepted: value,
    });
  };

  const deleteOpinion = async (id) => {
    await deleteDoc(doc(db, 'opinions', id));
  };

  return (
    <div className="opinions-admin">
      <details>
        <summary>Opinions Admin</summary>
        {allOpinions.map((opinion) => {
          return (
            <div className="opinion" key={opinion.doc_id}>
              <div className="opinion__text">
                <p className="opinion__text-header">
                  <span>
                    {opinion.from},
                    <span className="opinion__text-company">
                      {` ${opinion.community} (${opinion.rate})`}
                    </span>
                  </span>

                  <button
                    className="btn-opinion decline"
                    title="Delete opinion"
                    type="button"
                    onClick={() => deleteOpinion(opinion.doc_id)}
                  >
                    <IoClose />
                  </button>
                </p>
                <p className="opinion__text-opinion"> {opinion.opinion}</p>
                <hr />
                <div className="opinion__text-accept">
                  <div className="opinion__text-accept-accepted">
                    Zaakceptowac?
                    <button
                      className="btn-opinion accept"
                      title="Accept opinion and display on homepage"
                      type="button"
                      onClick={() => acceptOpinion(opinion.doc_id, true)}
                    >
                      <GiCheckMark />
                    </button>
                    /
                    <button
                      className="btn-opinion decline"
                      title="Decline opinion and hide on homepage"
                      type="button"
                      onClick={() => acceptOpinion(opinion.doc_id, false)}
                    >
                      <IoClose />
                    </button>
                  </div>
                  <div className="opinion__text-isShow">
                    {opinion.isAccepted ? (
                      <BiShow className="accept" title="Displayed on the home page" />
                    ) : (
                      <BiHide className="decline" title="Not displayed on the home page" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </details>
    </div>
  );
}

export default OpinionsAdmin;
