import { useState } from 'react';
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

  return (
    <section className="about__members">
      <IoIosArrowDropleft onClick={prevMember} className="arrow arrowPrev" />
      <IoIosArrowDropright onClick={nextMember} className="arrow arrowNext" />

      {members.map((member, index) => {
        return (
          <>
            <div className={prev === index ? 'member prev' : 'member'}>{prev === index && <img src={member.memberSrc} alt="" />}</div>

            <div className={current === index ? 'member current' : 'member'}>{current === index && <img src={member.memberSrc} alt="" />}</div>

            <div className={next === index ? 'member next' : 'member'}>{next === index && <img src={member.memberSrc} alt="" />}</div>
          </>
        );
      })}
    </section>
  );
};

export default AboutMembers;
