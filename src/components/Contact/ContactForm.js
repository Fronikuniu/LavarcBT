import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import EmailJsConf from '../configuration/emailjs';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [clicked, setClicked] = useState(false);

  const form = useRef();

  const validateForm = (e) => {
    e.preventDefault();
    setNameError(name === '');
    setEmailError(email === '');
    setMessageError(message === '');

    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      if (!nameError && !emailError && !messageError) {
        emailjs
          .sendForm(
            EmailJsConf.serviceId,
            EmailJsConf.contactTemplate,
            form.current,
            EmailJsConf.userId
          )
          .then(
            (result) => {},
            (error) => {}
          );

        setName('');
        setEmail('');
        setMessage('');

        toast.success('Wiadomość wysłana!');
      } else toast.error('Błąd przy wysyłaniu wiadomości!');
    }
    return () => setClicked(false);
  }, [clicked, email, emailError, message, messageError, name, nameError]);

  return (
    <form ref={form} onSubmit={validateForm} className="contact-form">
      <div>
        <input
          type="text"
          name="user_name"
          placeholder={nameError ? 'All fields are required' : 'Name'}
          className={messageError ? 'input-error' : ''}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="user_email"
          placeholder={emailError ? 'All fields are required' : 'Email'}
          className={messageError ? 'input-error' : ''}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <textarea
        rows="4"
        name="message"
        placeholder={messageError ? 'All fields are required' : 'Message...'}
        className={messageError ? 'input-error' : ''}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input type="submit" value="Send" />
    </form>
  );
}

export default ContactForm;
