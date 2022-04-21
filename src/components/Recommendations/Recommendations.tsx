import { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Opinion } from '../../types';
import displayStars from '../helpers/Stars';
import useDocs from '../helpers/useDocs';

function Recommendations() {
  const [current, setCurrent] = useState(0);
  const { data: allOpinions } = useDocs<Opinion>('opinions', {
    whereArg: ['isAccepted', '==', true],
    orderByArg: ['created', 'desc'],
    limitArg: 5,
  });
  const length = allOpinions?.length;
  const prev = current === 0 ? length - 1 : current - 1;
  const next = current === length - 1 ? 0 : current + 1;

  useEffect(() => {
    const recommendationTimeout = setTimeout(() => setCurrent(next), 10000);
    return () => clearTimeout(recommendationTimeout);
  });

  const prevSlide = () => setCurrent(prev);
  const nextSlide = () => setCurrent(next);

  return !length ? null : (
    <section className="recommendations">
      <div className="container">
        <h2 className="headerTextStroke">Opinions</h2>
        <p className="headerwTextStroke">About us</p>

        <div className="slider">
          {length >= 2 && (
            <>
              <IoIosArrowDropleft onClick={prevSlide} className="arrow arrowPrev" role="button" />
              <IoIosArrowDropright onClick={nextSlide} className="arrow arrowNext" role="button" />
            </>
          )}

          {allOpinions?.map((opinion, index) => {
            return (
              <div className={`slider__item ${current === index ? 'active' : ''}`} key={opinion.id}>
                {current === index && (
                  <>
                    <div className="slider__item__header">
                      <p className="slider__item__header--from">
                        {opinion.from}
                        <span>, {opinion.community}</span>
                      </p>
                      <div className="stars">{displayStars(opinion.rate)}</div>
                    </div>
                    <p className="slider__item--opinion">{opinion.opinion}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Recommendations;
