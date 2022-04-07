import { IoClose } from 'react-icons/io5';
import { GiCheckMark } from 'react-icons/gi';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Opinion } from '../../types';
import { UseDeleteDoc, UseUpdateDoc } from '../helpers/useManageDoc';
import useDocsSnapshot from '../helpers/useDocsSnapshot';

function OpinionsAdmin() {
  const { data: allOpinions } = useDocsSnapshot<Opinion>('opinions', [], {});

  const acceptOpinion = async (id: string, value: boolean) => {
    await UseUpdateDoc('opinions', [id], {
      isAccepted: Boolean(value),
    });
  };

  const deleteOpinion = async (id: string) => {
    await UseDeleteDoc('opinions', [id]);
  };

  return (
    <div className="opinions-admin">
      <details>
        <summary>Manage opinions</summary>
        <p className="link">
          Form to add opinions: <Link to="/recommendation">Recommendations form</Link>
        </p>
        {allOpinions.map((opinion) => (
          <div className="opinion" key={opinion.id}>
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
                  onClick={() => deleteOpinion(opinion.doc_id as string)}
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
                    onClick={() => acceptOpinion(opinion.doc_id as string, true)}
                  >
                    <GiCheckMark />
                  </button>
                  /
                  <button
                    className="btn-opinion decline"
                    title="Decline opinion and hide on homepage"
                    type="button"
                    onClick={() => acceptOpinion(opinion.doc_id as string, false)}
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
