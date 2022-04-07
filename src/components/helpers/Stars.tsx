import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const displayStars = (stars: number) => {
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
export default displayStars;
