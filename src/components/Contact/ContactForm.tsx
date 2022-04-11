import { FormEvent, useEffect, useRef, useState } from 'react';
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

  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (clicked && !nameError && !emailError && !messageError) {
      emailjs
        .sendForm(
          EmailJsConf.serviceId,
          EmailJsConf.contactTemplate,
          form.current as HTMLFormElement,
          EmailJsConf.userId
        )
        .then(() => {
          toast.success('Message was sent!');
        })
        .catch(() => {
          toast.error('Message was not sent!');
        });

      setName('');
      setEmail('');
      setMessage('');
    }
    return () => setClicked(false);
  }, [clicked, email, emailError, message, messageError, name, nameError]);

  const validateForm = (e: FormEvent) => {
    e.preventDefault();
    setNameError(name === '');
    setEmailError(email === '');
    setMessageError(message === '');
    setClicked(true);
  };

  return (
    <form ref={form} onSubmit={validateForm} className="contact-form">
      <div>
        <label htmlFor="user_name">
          Username
          <input
            type="text"
            name="user_name"
            id="user_name"
            placeholder={nameError ? 'All fields are required' : 'Name'}
            className={messageError ? 'input-error' : ''}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="user_email">
          Email
          <input
            type="email"
            name="user_email"
            id="user_email"
            placeholder={emailError ? 'All fields are required' : 'Email'}
            className={messageError ? 'input-error' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <label htmlFor="message">
        Message
        <textarea
          rows={4}
          name="message"
          id="message"
          placeholder={messageError ? 'All fields are required' : 'Message...'}
          className={messageError ? 'input-error' : ''}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <input type="submit" value="Send" />
    </form>
  );
}

export default ContactForm;
