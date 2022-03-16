import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Timezones from './Timezones';
import { EmailJsConf } from '../configuration/emailjs';
import { toast } from 'react-toastify';

const OrderForm = () => {
  const [email, setEmail] = useState('');
  const [discord, setDiscord] = useState('');
  const [timezone, setTimezone] = useState('');
  const [packag, setPackage] = useState('');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');

  const [emailError, setEmailError] = useState('');
  const [discordError, setDiscordError] = useState('');
  const [timezoneError, setTimezoneError] = useState('');
  const [packagError, setPackageError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');

  const [clicked, setClicked] = useState(false);

  const regexDiscord = /^((.+?)#\d{4})/gm;
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const form = useRef();

  const validateForm = (e) => {
    e.preventDefault();

    if (email === '') setEmailError('Email is required!');
    else if (regexEmail.exec(email) === null) setEmailError('Enter correct address email!');
    else setEmailError('');

    if (discord === '') setDiscordError('Discord is required!');
    else if (regexDiscord.exec(discord) === null) setDiscordError('Enter correct discord tag!');
    else setDiscordError('');

    setTimezoneError(timezone === '' || timezone === 'default' ? 'Select timezone!' : '');
    setPackageError(packag === '' || packag === 'default' ? 'Select package!' : '');
    setMessageError(message === '' ? 'Order description is required!' : '');
    setBudgetError(budget === '' ? 'Budget is required!' : '');
    setDeadlineError(deadline === '' ? 'Select deadline date!' : '');

    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      if (!emailError && !discordError && !timezoneError && !packagError && !messageError && !budgetError && !deadlineError) {
        emailjs.sendForm(EmailJsConf.serviceId, EmailJsConf.orderTemplate, form.current, EmailJsConf.userId).then(
          (result) => {},
          (error) => {}
        );

        setEmail('');
        setDiscord('');
        setTimezone('');
        setPackage('');
        setMessage('');
        setBudget('');
        setDeadline('');

        toast.success('Wysłano email.');
      } else toast.error('Błąd przy wysyłaniu.');
    }
    return () => setClicked(false);
  }, [clicked, emailError, discordError, timezoneError, packagError, messageError, budgetError, deadlineError]);

  return (
    <form ref={form} onSubmit={validateForm} className="personal-order__form">
      <div>
        <input type="text" className={emailError ? 'input-error' : ''} name="email" placeholder={emailError ? emailError : 'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError === 'Enter correct address email!' ? <p className="p-error">{emailError}</p> : null}
      </div>

      <div>
        <input
          type="text"
          className={discordError ? 'input-error' : ''}
          name="discord"
          placeholder={discordError ? discordError : 'Discord'}
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
        />
        {discordError === 'Enter correct discord tag!' ? <p className="p-error">{discordError}</p> : null}
      </div>

      <select className={timezoneError ? 'input-error' : ''} name="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
        <option value="default" hidden>
          Select timezone:
        </option>
        {Timezones.map((timezone) => {
          return (
            <option key={timezone.label} value={timezone.label}>
              {timezone.label}
            </option>
          );
        })}
      </select>

      <select className={packagError ? 'input-error' : ''} name="package" value={packag} onChange={(e) => setPackage(e.target.value)}>
        <option value="default" hidden>
          Select package:
        </option>
        <option value="basic">Basic</option>
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
      </select>

      <textarea
        className={messageError ? 'input-error' : ''}
        name="message"
        placeholder={messageError ? messageError : 'Order description'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input type="number" className={budgetError ? 'input-error' : ''} name="budget" placeholder={budgetError ? budgetError : 'Budget'} value={budget} onChange={(e) => setBudget(e.target.value)} />

      <div>
        <input type="date" className={deadlineError ? 'input-error' : ''} name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        {deadlineError && <p className="p-error">{deadlineError}</p>}
      </div>

      <input type="submit" value="Send" />
    </form>
  );
};

export default OrderForm;
