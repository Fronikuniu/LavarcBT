import dragon from '../../images/dragon.png';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <h2 className="headerTextStroke">About</h2>
        <h3 className="headerwTextStroke">Lavarc</h3>

        <div className="about__info">
          <div className="about__info-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odit corporis ipsam similique. Ut maxime dolorem perferendis aliquam distinctio autem eius vitae ratione. Excepturi, illum
              saepe. Officiis nobis explicabo ducimus sit, vero vel in, voluptate eligendi cumque laboriosam animi, aliquid excepturi illo ab modi eos ratione ipsum deleniti eveniet suscipit quia
              magnam totam. Neque, suscipit obcaecati! Iure doloribus repudiandae itaque voluptatem non quibusdam quia, eius beatae eum aspernatur debitis aut distinctio, cupiditate atque quam
              laudantium voluptatibus odio architecto saepe magnam? Culpa optio, odio deserunt consectetur porro nesciunt ea at doloremque sint, non neque perspiciatis sed! Possimus molestiae
              obcaecati veritatis minus?
            </p>
          </div>

          <div className="about__info-img">
            <img src={dragon} alt="Dragon by Fronikuniu" className="dragon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
