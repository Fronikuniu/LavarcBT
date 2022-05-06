import dragon from '../../images/dragon.webp';

function AboutHome() {
  return (
    <section className="about">
      <div className="container">
        <h1 className="headerTextStroke">About</h1>
        <p className="headerwTextStroke">Lavarc</p>

        <div className="about__info">
          <div className="about__info-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odit corporis ipsam
              similique. Ut maxime dolorem perferendis aliquam distinctio autem eius vitae ratione.
              Excepturi, illum saepe. Officiis nobis explicabo ducimus sit, vero vel in, voluptate
              eligendi cumque laboriosam animi, aliquid excepturi illo ab modi eos ratione ipsum
              deleniti eveniet suscipit quia magnam totam. Neque, suscipit obcaecati! Iure doloribus
              repudiandae itaque voluptatem non quibusdam quia, eius beatae eum aspernatur debitis
              aut distinctio, cupiditate atque quam laudantium voluptatibus odio architecto saepe
              magnam? Culpa optio, odio deserunt consectetur porro nesciunt ea at doloremque sint,
              non neque perspiciatis sed! Possimus molestiae obcaecati veritatis minus?
            </p>
          </div>

          <div className="about__info-img">
            <img src={dragon} alt="Dragon by Fronikuniu" className="dragon" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHome;
