import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import discord from '../../images/discord.png';
import { Image, Member } from '../../types';
import { db } from '../configuration/firebase';

function SingleMember() {
  const [member, setMember] = useState<Member | undefined>(undefined);
  const [memberImages, setMemberImages] = useState<Image[]>([]);
  const { name }: { name: string } = useParams();

  useEffect(() => {
    const getSingleMember = async () => {
      const q = query(collection(db, 'members'), where('name', '==', name));
      const querySnapshot = await getDocs(q);

      const teamMember: Member[] = [];
      querySnapshot.forEach((doc) => {
        teamMember.push(doc.data() as Member);
      });
      setMember(teamMember[0]);
    };
    getSingleMember()
      .then(() => {})
      .catch(() => {});

    const getMemberImages = async () => {
      const q = query(collection(db, 'gallery'), where('builder', '==', name));
      const querySnapshot = await getDocs(q);

      const teamMemberImages: Image[] = [];
      querySnapshot.forEach((doc) => {
        teamMemberImages.push(doc.data() as Image);
      });
      setMemberImages(teamMemberImages);
    };
    getMemberImages()
      .then(() => {})
      .catch(() => {});
  }, [name]);

  return (
    <section className="single__member">
      <div className="container">
        <div className="single__member__info">
          <div className="single__member__info-img">
            <img src={member?.memberSrc} alt="" />
          </div>

          <div className="single__member__info-text">
            <h2 className="headerTextStroke">{member?.name}</h2>
            <h3 className="headerwTextStroke">{member?.name}</h3>

            <p>{member?.about}</p>

            <p>
              <img src={discord} alt="" />
              <span>{member?.discord}</span>
            </p>
          </div>
        </div>

        <div className="single__member__projects">
          <h2 className="headerTextStroke">His</h2>
          <h3 className="headerwTextStroke">Projects</h3>

          <div className="single__member__projects-images">
            {memberImages.map((img) => {
              return (
                <Link to={`/gallery/${img.id}`} key={img.id}>
                  <img src={img.imageSrc} alt="" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleMember;
