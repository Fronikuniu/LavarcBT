import React from 'react';
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
          <h3>Contact</h3>

          <ContactForm />
        </div>

        <div className="footer__menu">
          <h3>Menu</h3>

          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/about">About</Link>
          </p>
          <p>
            <Link to="/gallery">Gallery</Link>
          </p>
          <p>
            <Link to="/shop">Shop</Link>
          </p>
          <p>
            <Link to="/contact">Contact</Link>
          </p>
          <p>
            <Link to="/auth">Auth</Link>
          </p>
        </div>

        <div className="footer__socials">
          <h3>Socials</h3>

          <AiFillInstagram
            onClick={() => window.open('https://www.instagram.com/')}
            className="footer__socials__icon ig"
            role="button"
          />
          <AiFillYoutube
            onClick={() => window.open('https://www.youtube.com/channel/UCt-UC9cGvjLL9CmpVRnbrbg')}
            className="footer__socials__icon yt"
            role="button"
          />
          <SiDiscord
            onClick={() => window.open('https://discord.gg/VUMkwAXud8')}
            className="footer__socials__icon dc"
            role="button"
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
