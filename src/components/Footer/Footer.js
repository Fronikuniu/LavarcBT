import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ContactForm from '../Contact/ContactForm';

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__links">
        <div className="footer__contact">
          <h3>Contact</h3>

          <ContactForm />
        </div>

        <div className="footer__menu">
          <h3>Menu</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/auth">Auth</Link>
        </div>

        <div className="footer__socials">
          <h3>Socials</h3>

          <AiFillInstagram onClick={() => window.open('https://www.instagram.com/')} className="footer__socials__icon ig" />
          <AiFillYoutube onClick={() => window.open('https://www.youtube.com/channel/UCt-UC9cGvjLL9CmpVRnbrbg')} className="footer__socials__icon yt" />
          <SiDiscord onClick={() => window.open('https://discord.gg/VUMkwAXud8')} className="footer__socials__icon dc" />
        </div>
      </div>

      <p>
        <FaRegCopyright /> 2021 Lavarc. All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
