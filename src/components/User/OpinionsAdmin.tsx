/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { GiCheckMark } from 'react-icons/gi';
import { BiHide, BiShow } from 'react-icons/bi';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '../configuration/firebase';
import { Opinion } from '../../types';

function OpinionsAdmin() {
  const [allOpinions, setAllOpinions] = useState<Opinion[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'opinions'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const opinions: Opinion[] = [];
      querySnapshot.forEach((document) => {
        opinions.push({ doc_id: document.id, ...(document.data() as Opinion) });
      });
      setAllOpinions(opinions);
    });
    return () => unsubscribe();
  }, []);

  const acceptOpinion = async (id: string, value: boolean) => {
    const opinionRef = doc(db, 'opinions', id);
    await updateDoc(opinionRef, {
      isAccepted: Boolean(value),
    });
  };

  const deleteOpinion = async (id: string) => {
    await deleteDoc(doc(db, 'opinions', id));
  };

  return (
    <div className="opinions-admin">
      <details>
        <summary>Manage opinions</summary>
        {allOpinions.map((opinion) => (
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
                  // @ts-ignore
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
                    // @ts-ignore
                    onClick={() => acceptOpinion(opinion.doc_id, true)}
                  >
                    <GiCheckMark />
                  </button>
                  /
                  <button
                    className="btn-opinion decline"
                    title="Decline opinion and hide on homepage"
                    type="button"
                    // @ts-ignore
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
        ))}
      </details>
    </div>
  );
}

export default OpinionsAdmin;
