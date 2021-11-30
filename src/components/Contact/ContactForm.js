import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const form = useRef();

  const validateForm = (e) => {
    e.preventDefault();
    name === '' ? setNameError(true) : setNameError(false);
    email === '' ? setEmailError(true) : setEmailError(false);
    message === '' ? setMessageError(true) : setMessageError(false);

    if (!nameError || !emailError || !messageError) {
      // emailjs.sendForm('service_hsa5tp9', 'template_hyxnazh', form.current, 'user_o1who1aHqJAC5aJn58p2I').then(
      //   (result) => {
      //     console.log(result.text);
      //   },
      //   (error) => {
      //     console.log(error.text);
      //   }
      // );

      console.log('Wysłano email.');

      setName('');
      setEmail('');
      setMessage('');
    } else {
      console.log('Błąd przy wysyłaniu.');
    }
  };

  useEffect(() => {
    name === '' ? setNameError(true) : setNameError(false);
    email === '' ? setEmailError(true) : setEmailError(false);
    message === '' ? setMessageError(true) : setMessageError(false);
  }, [email, message, name]);

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
      ></textarea>

      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactForm;
