import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import discord from '../../images/discord.png';
import { Image, Member } from '../../types';
import useDocs from '../hooks/useDocs';
import Loader from '../Loader/Loader';

function SingleMember() {
  const { name }: { name: string } = useParams();
  const { data: getMember } = useDocs<Member>('members', { whereArg: ['name', '==', name] });
  const member = getMember[0];
  const { data: memberImages, isLoading: memberImagesLoading } = useDocs<Image>('gallery', {
    whereArg: ['builder', '==', name],
  });

  return (
    <section className="single__member">
      <div className="container">
        <div className="single__member__info">
          <div className="single__member__info-img">
            <img src={member?.memberSrc} alt="" />
          </div>

          <div className="single__member__info-text">
            <h2 className="headerTextStroke">{member?.name}</h2>
            <p className="headerwTextStroke">{member?.name}</p>

            <p>{member?.about}</p>

            <p>
              <img src={discord} alt="" />
              <span>{member?.discord}</span>
            </p>
          </div>
        </div>

        <div className="single__member__projects">
          <h2 className="headerTextStroke">His</h2>
          <p className="headerwTextStroke">Projects</p>

          <div className="single__member__projects-images">
            {memberImagesLoading ? (
              <Loader />
            ) : (
              memberImages.map((img) => {
                return (
                  <Link to={`/gallery/${img.id}`} key={img.id}>
                    <img src={img.imageSrc} alt="" />
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleMember;
