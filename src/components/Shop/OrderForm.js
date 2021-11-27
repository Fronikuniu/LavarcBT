import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Timezones from './Timezones';

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

  const regexDiscord = /^((.+?)#\d{4})/gm;
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_hsa5tp9', 'template_0zu8z0s', form.current, 'user_o1who1aHqJAC5aJn58p2I').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  const validateForm = (e) => {
    e.preventDefault();

    if (email === '') {
      setEmailError('Email is required!');
    } else if (regexEmail.exec(email) === null) {
      setEmailError('Enter correct address email!');
    } else {
      setEmailError('');
    }

    if (discord === '') {
      setDiscordError('Discord is required!');
    } else if (regexDiscord.exec(discord) === null) {
      setDiscordError('Enter correct discord tag!');
    } else {
      setDiscordError('');
    }

    timezone === '' || timezone === 'default' ? setTimezoneError('Select timezone!') : setTimezoneError('');
    packag === '' || packag === 'default' ? setPackageError('Select package!') : setPackageError('');
    message === '' ? setMessageError('Order description is required!') : setMessageError('');
    budget === '' ? setBudgetError('Budget is required!') : setBudgetError('');
    deadline === '' ? setDeadlineError('Select deadline date!') : setDeadlineError('');
  };

  console.log(email, discord, timezone, packag, message, budget, deadline);
  console.log(emailError, discordError, timezoneError, packagError, messageError, budgetError, deadlineError);

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
        <option value="default">Select timezone:</option>
        {Timezones.map((timezone) => {
          return (
            <option key={timezone.label} value={timezone.label}>
              {timezone.label}
            </option>
          );
        })}
      </select>

      <select className={packagError ? 'input-error' : ''} name="package" value={packag} onChange={(e) => setPackage(e.target.value)}>
        <option value="default">Select package:</option>
        <option value="basic">Basic</option>
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
      </select>

      <textarea className={messageError ? 'input-error' : ''} name="message" placeholder={messageError ? messageError : 'Message'} value={message} onChange={(e) => setMessage(e.target.value)} />

      <input type="number" className={budgetError ? 'input-error' : ''} name="budget" placeholder={budgetError ? budgetError : 'Budget'} value={budget} onChange={(e) => setBudget(e.target.value)} />

      <div>
        <input type="date" className={deadlineError ? 'input-error' : ''} name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        {deadlineError ? <p className="p-error">{deadlineError}</p> : null}
      </div>

      <input type="submit" value="Send" />
    </form>
  );
};

export default OrderForm;
