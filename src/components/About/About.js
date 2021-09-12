import '../../styles/components/about.scss';
import dragon from '../../images/dragon.png';

function About() {
  return (
    <div className="about__container">
      <div className="container">
        <h1 className="header">About</h1>
        <h2 className="header">Lavarc</h2>
        <section className="about">
          <div className="about__info">
            <div className="about__info-text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odit corporis ipsam similique. Ut maxime dolorem perferendis aliquam distinctio autem eius vitae ratione. Excepturi,
                illum saepe. Officiis nobis explicabo ducimus sit, vero vel in, voluptate eligendi cumque laboriosam animi, aliquid excepturi illo ab modi eos ratione ipsum deleniti eveniet suscipit
                quia magnam totam. Neque, suscipit obcaecati! Iure doloribus repudiandae itaque voluptatem non quibusdam quia, eius beatae eum aspernatur debitis aut distinctio, cupiditate atque quam
                laudantium voluptatibus odio architecto saepe magnam? Culpa optio, odio deserunt consectetur porro nesciunt ea at doloremque sint, non neque perspiciatis sed! Possimus molestiae
                obcaecati veritatis minus?
              </p>
            </div>
            <div className="about__info-img">
              <img src={dragon} alt="Dragon by Fronikuniu" className="dragon" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
