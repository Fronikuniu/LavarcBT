import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Member } from '../../types';
import useDocs from '../helpers/useDocs';

function AboutMembers() {
  const [current, setCurrent] = useState(0);
  const { data: members } = useDocs<Member>('members', {});
  const { length } = members;

  const prev = current === 0 ? length - 1 : current - 1;
  const next = current === length - 1 ? 0 : current + 1;

  const nextMember = () => setCurrent(next);
  const prevMember = () => setCurrent(prev);

  useEffect(() => {
    const membersTimeout = setTimeout(() => setCurrent(next), 10000);
    return () => clearTimeout(membersTimeout);
  });

  return (
    <section className="about__members">
      <div className="container">
        <h2 className="headerTextStroke">Our</h2>
        <h3 className="headerwTextStroke">Team</h3>
      </div>
      <div className="slider">
        <IoIosArrowDropleft onClick={prevMember} className="arrow arrowPrev" role="button" />
        <IoIosArrowDropright onClick={nextMember} className="arrow arrowNext" role="button" />

        {members.map((member, index) => {
          return (
            <React.Fragment key={member.name}>
              <div
                className={prev === index ? 'member prev' : 'member'}
                onClick={() => setCurrent(index)}
                onKeyDown={() => setCurrent(index)}
                tabIndex={0}
                role="button"
              >
                {prev === index && (
                  <>
                    <p className="member__name">
                      <Link to={`/builder/${member.name}`}>{member.name}</Link>
                    </p>
                    <img src={member.memberSrc} alt="" />
                  </>
                )}
              </div>

              <div className={current === index ? 'member current' : 'member'}>
                {current === index && (
                  <>
                    <p className="member__name">
                      <Link to={`/builder/${member.name}`}>{member.name}</Link>
                    </p>
                    <img src={member.memberSrc} alt="" />
                    <p className="member__about">{member.about}</p>
                  </>
                )}
              </div>

              <div
                className={next === index ? 'member next' : 'member'}
                onClick={() => setCurrent(index)}
                onKeyDown={() => setCurrent(index)}
                role="button"
                tabIndex={0}
              >
                {next === index && (
                  <>
                    <p className="member__name">
                      <Link to={`/builder/${member.name}`}>{member.name}</Link>
                    </p>
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
}

export default AboutMembers;
