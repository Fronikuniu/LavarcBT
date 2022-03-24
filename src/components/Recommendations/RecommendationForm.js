import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { uid } from 'uid';
import drummaks from '../../images/char.png';
import { db } from '../configuration/firebase';
import useRouter from '../helpers/useRouter';

function RecommendationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  const addOpinion = async (data) => {
    const docRef = await addDoc(collection(db, 'opinions'), {
      community: data.Community,
      from: data.Username,
      id: uid(),
      isAccepted: false,
      opinion: data.Opinion,
      rate: Number(data.Rate),
      created: Timestamp.fromDate(new Date()),
    });
    reset();
    router.push('/');
    toast.success('Wysłano opinie, zaczekaj na potwierdzenie!');
  };

  const onSubmit = (data) => addOpinion(data);

  return (
    <div className="recommendation">
      <div className="container">
        <h2 className="headerTextStroke">Leave</h2>
        <h3 className="headerwTextStroke">Feedback</h3>

        <div className="recommendation-content">
          <div className="recommendation__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="username">
                Username
                <input
                  type="text"
                  className={errors.Username?.type === 'required' ? 'input-error' : ''}
                  placeholder={
                    errors.Username?.type === 'required' ? 'Username is required!' : 'Username'
                  }
                  id="username"
                  {...register('Username', { required: true, maxLength: 20 })}
                />
              </label>
              <label htmlFor="community">
                Community
                <input
                  type="text"
                  className={errors.Community?.type === 'required' ? 'input-error' : ''}
                  placeholder={
                    errors.Community?.type === 'required' ? 'Community is required!' : 'Community'
                  }
                  id="community"
                  {...register('Community', { required: true, maxLength: 20 })}
                />
              </label>
              <label htmlFor="opinion">
                Opinion
                <textarea
                  type="text"
                  className={errors.Opinion?.type === 'required' ? 'input-error' : ''}
                  placeholder={
                    errors.Opinion?.type === 'required' ? 'Opinion is required!' : 'Opinion'
                  }
                  id="opinion"
                  {...register('Opinion', { required: true, maxLength: 300 })}
                />
              </label>
              <label htmlFor="rate">
                Rate
                <input
                  type="number"
                  className={errors.Rate?.type === 'required' ? 'input-error' : ''}
                  placeholder={errors.Rate?.type === 'required' ? 'Rate is required!' : 'Rate'}
                  id="rate"
                  min="1"
                  max="5"
                  {...register('Rate', { required: true, max: 5, min: 1 })}
                />
              </label>

              <input type="submit" />
            </form>
          </div>

          <div className="recommendation__image">
            <img src={drummaks} alt="Thanks for your opinion!" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationForm;
