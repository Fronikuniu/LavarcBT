import { useRef, useState, useEffect, FormEvent } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';
import EmailJsConf from '../configuration/emailjs';

interface OrderData {
  email: string;
  discord: string;
  package: string;
  message: string;
  budget: string;
}
interface OrderErrors {
  email: string | boolean;
  discord: string | boolean;
  package: string | boolean;
  message: string | boolean;
  budget: string | boolean;
}

function OrderForm() {
  const [orderData, setOrderData] = useState<OrderData>({
    email: '',
    discord: '',
    package: '',
    message: '',
    budget: '',
  });
  const [orderErrors, setOrderErrors] = useState<OrderErrors>({
    email: false,
    discord: false,
    package: false,
    message: false,
    budget: false,
  });
  const [clicked, setClicked] = useState(false);

  const regexDiscord = /^((.+?)#\d{4})/gm;
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const form = useRef<HTMLFormElement>(null);

  const hasErrors = Object.values(orderErrors).every((error) => error === false);
  console.log(hasErrors);
  console.log('clicked:', clicked);

  const setValue = (field: keyof OrderData, e: FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setOrderData({
      ...orderData,
      [field]: value,
    });
  };

  const checkIsRequired = () => {
    Object.keys(orderData).forEach((key: string) => {
      if (orderData[key as keyof OrderData] === '') {
        setOrderErrors({
          ...orderErrors,
          [key]: 'This field is required',
        });
      } else {
        setOrderErrors({
          ...orderErrors,
          [key]: false,
        });
      }
    });
  };

  const validateForm = (e: FormEvent) => {
    e.preventDefault();

    checkIsRequired();

    if (regexEmail.exec(orderData.email) === null)
      setOrderErrors({
        ...orderErrors,
        email: 'Enter correct address email!',
      });
    if (regexDiscord.exec(orderData.discord) === null)
      setOrderErrors({
        ...orderErrors,
        discord: 'Enter correct discord tag!',
      });

    setClicked(true);
  };

  useEffect(() => {
    if (clicked && !hasErrors) {
      // emailjs
      //   .sendForm(
      //     EmailJsConf.serviceId,
      //     EmailJsConf.orderTemplate,
      //     form.current as HTMLFormElement,
      //     EmailJsConf.userId
      //   )
      //   .then(() => toast.success('Wysłano email.'))
      //   .catch(() => toast.error('Błąd przy wysyłaniu.'));
      console.log('wysłane');

      setOrderData({
        email: '',
        discord: '',
        package: '',
        message: '',
        budget: '',
      });
    }
    return () => setClicked(false);
  }, [clicked, hasErrors]);

  return (
    <form ref={form} onSubmit={validateForm} className="personal-order__form">
      <div>
        <label htmlFor="email">
          Email
          <input
            type="text"
            className={orderErrors.email ? 'input-error' : ''}
            name="email"
            id="email"
            placeholder={orderErrors.email ? `${orderErrors.email}` : 'Email'}
            value={orderData.email}
            onChange={(e) => setValue('email', e)}
          />
        </label>
        {orderErrors.email === 'Enter correct address email!' ? (
          <p className="p-error">{orderErrors.email}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="discord">
          Discord
          <input
            type="text"
            className={orderErrors.discord ? 'input-error' : ''}
            name="discord"
            id="discord"
            placeholder={orderErrors.discord ? `${orderErrors.discord}` : 'Discord'}
            value={orderData.discord}
            onChange={(e) => setValue('discord', e)}
          />
        </label>
        {orderErrors.discord === 'Enter correct discord tag!' ? (
          <p className="p-error">{orderErrors.discord}</p>
        ) : null}
      </div>

      <input type="hidden" name="timezone" id="timezone" defaultValue={moment.tz.guess()} />

      <label htmlFor="package">
        Package
        <select
          className={orderErrors.package ? 'input-error' : ''}
          name="package"
          id="package"
          defaultValue={orderData.package}
          onChange={(e) => setValue('package', e)}
        >
          <option value="" disabled hidden>
            Select package:
          </option>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </label>

      <label htmlFor="message">
        Message
        <textarea
          className={orderErrors.message ? 'input-error' : ''}
          name="message"
          id="message"
          placeholder={orderErrors.message ? `${orderErrors.message}` : 'Order description'}
          value={orderData.message}
          onChange={(e) => setValue('message', e)}
        />
      </label>

      <label htmlFor="budget">
        Budget (in $)
        <input
          type="number"
          className={orderErrors.budget ? 'input-error' : ''}
          name="budget"
          id="budget"
          placeholder={orderErrors.budget ? `${orderErrors.budget}` : 'Budget'}
          value={orderData.budget}
          onChange={(e) => setValue('budget', e)}
          min={0}
        />
      </label>

      <input type="submit" value="Send" />
    </form>
  );
}

export default OrderForm;
