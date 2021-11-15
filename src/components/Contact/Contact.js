import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <div className="contact__contact-form">
          <h2>Write to us via email</h2>
          <ContactForm />
        </div>

        <div className="vertical-or"></div>

        <div className="contact__chat">
          <h2>Write to us via our chat app</h2>
          <p>Hi! If u have an account u can also write with us on our chat app.</p>
          <Link to="/contact/chat" className="btn ">
            Move to chat!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
