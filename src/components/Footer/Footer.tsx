import { FaRegCopyright } from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ContactForm from '../Contact/ContactForm';

function Footer() {
  return (
    <section className="footer">
      <div className="footer__links">
        <div className="footer__contact">
          <p className="footer__links-header">Contact</p>

          <ContactForm />
        </div>

        <div className="footer__menu">
          <p className="footer__links-header">Menu</p>

          <p className="links">
            <Link to="/">Home</Link>
          </p>
          <p className="links">
            <Link to="/about">About</Link>
          </p>
          <p className="links">
            <Link to="/gallery">Gallery</Link>
          </p>
          <p className="links">
            <Link to="/shop">Shop</Link>
          </p>
          <p className="links">
            <Link to="/contact">Contact</Link>
          </p>
          <p className="links">
            <Link to="/auth">Auth</Link>
          </p>
        </div>

        <div className="footer__socials">
          <p className="footer__links-header">Socials</p>

          <AiFillInstagram
            onClick={() => window.open('https://www.instagram.com/')}
            className="footer__socials__icon ig"
            role="link"
          />
          <AiFillYoutube
            onClick={() => window.open('https://www.youtube.com/channel/UCt-UC9cGvjLL9CmpVRnbrbg')}
            className="footer__socials__icon yt"
            role="link"
          />
          <SiDiscord
            onClick={() => window.open('https://discord.gg/VUMkwAXud8')}
            className="footer__socials__icon dc"
            role="link"
          />
        </div>
      </div>

      <p className="footer-c">
        <FaRegCopyright /> 2021 Lavarc. All rights reserved.
      </p>
    </section>
  );
}

export default Footer;
