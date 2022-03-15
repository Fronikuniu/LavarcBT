import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Recommendations = ({ opinions }) => {
  const [current, setCurrent] = useState(0);
  const length = opinions.length;

  const prev = current === 0 ? length - 1 : current - 1;
  const next = current === length - 1 ? 0 : current + 1;

  const prevSlide = () => {
    setCurrent(prev);
  };

  const nextSlide = () => {
    setCurrent(next);
  };

  const displayStars = (stars) => {
    const starContainer = [];

    for (let i = 1; i <= stars; i++) {
      starContainer.push(<AiFillStar key={i} />);
    }

    if (starContainer.length < 5) {
      const countOutlineStars = 5 - starContainer.length;

      for (let i = 1; i <= countOutlineStars; i++) {
        starContainer.push(<AiOutlineStar key={i * 6} />);
      }
    }

    return starContainer;
  };

  useEffect(() => {
    let recommendationTimeout = setTimeout(() => {
      setCurrent(next);
    }, 10000);
    return () => {
      clearTimeout(recommendationTimeout);
    };
  });

  return (
    <section className="recommendations">
      <div className="container">
        <h2 className="headerTextStroke">Opinions</h2>
        <h3 className="headerwTextStroke">About us</h3>

        <div className="slider">
          <IoIosArrowDropleft onClick={prevSlide} className="arrow arrowPrev" role="button" />
          <IoIosArrowDropright onClick={nextSlide} className="arrow arrowNext" role="button" />

          {opinions.map((opinion, index) => {
            return (
              <div className={`slider__item ${current === index ? 'active' : ''}`} key={opinion.id}>
                {current === index && (
                  <>
                    <div className="slider__item__header">
                      <p className="slider__item__header--from">
                        {opinion.from}
                        <span>, {opinion.community}</span>
                      </p>
                      <div className="stars">{displayStars(opinion.stars)}</div>
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
};

export default Recommendations;
