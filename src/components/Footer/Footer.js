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
        <div className="contact">
          <h3>Contact</h3>

          <ContactForm />
        </div>

        <div className="menu">
          <h3>Menu</h3>

          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Gallery">Gallery</Link>
          <Link to="/Shop">Shop</Link>
          <Link to="/Contact">Contact</Link>
        </div>

        <div className="socials">
          <h3>Socials</h3>

          <AiFillInstagram onClick={() => window.open('https://www.instagram.com/')} className="socials__icon ig" />
          <AiFillYoutube onClick={() => window.open('https://www.youtube.com/')} className="socials__icon yt" />
          <SiDiscord onClick={() => window.open('https://www.discord.com/')} className="socials__icon dc" />
        </div>
      </div>

      <p>
        <FaRegCopyright /> 2021 Lavarc. All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
