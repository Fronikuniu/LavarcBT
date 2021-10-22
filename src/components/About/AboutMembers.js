import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const AboutMembers = ({ members }) => {
  const [current, setCurrent] = useState(0);
  const length = members.length;

  const prev = current === 0 ? length - 1 : current - 1;
  const next = current === length - 1 ? 0 : current + 1;

  const nextMember = () => {
    setCurrent(next);
  };

  const prevMember = () => {
    setCurrent(prev);
  };

  useEffect(() => {
    let t = setTimeout(() => {
      setCurrent(next);
    }, 10000);
    return () => {
      clearTimeout(t);
    };
  });

  return (
    <section className="about__members">
      <div className="container">
        <h2 className="headerTextStroke">Our</h2>
        <h3 className="headerwTextStroke">Team</h3>
      </div>
      <div className="slider">
        <IoIosArrowDropleft onClick={prevMember} className="arrow arrowPrev" />
        <IoIosArrowDropright onClick={nextMember} className="arrow arrowNext" />

        {members.map((member, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className={prev === index ? 'member prev' : 'member'}
                onClick={() => {
                  setCurrent(index);
                }}
              >
                {prev === index && (
                  <>
                    <p className="member__name">{member.name}</p>
                    <img src={member.memberSrc} alt="" />
                  </>
                )}
              </div>

              <div className={current === index ? 'member current' : 'member'}>
                {current === index && (
                  <>
                    <p className="member__name">{member.name}</p>
                    <img src={member.memberSrc} alt="" />
                    <p className="member__about">{member.about}</p>
                  </>
                )}
              </div>

              <div
                className={next === index ? 'member next' : 'member'}
                onClick={() => {
                  setCurrent(index);
                }}
              >
                {next === index && (
                  <>
                    <p className="member__name">{member.name}</p>
                    <img src={member.memberSrc} alt="" />
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

AboutMembers.propTypes = { members: PropTypes.array.isRequired };

export default AboutMembers;
