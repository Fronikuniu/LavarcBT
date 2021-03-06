import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';

function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <div className="contact__contact-form">
          <h1>Write to us via email</h1>
          <ContactForm />
        </div>

        <div className="vertical-or" />
        <div className="horizontal-or" />

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
}

export default Contact;
