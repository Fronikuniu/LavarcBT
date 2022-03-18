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
    router.push('/');
    toast.success('Wysłano opinie, zaczekaj na potwierdzenie!');
  };

  const onSubmit = (data) => addOpinion(data);

  return (
    <div className="recommendation">
      <div className="container">
        <h2 className="headerTextStroke">Opinions</h2>
        <h3 className="headerwTextStroke">About us</h3>

        <div className="recommendation-content">
          <div className="recommendation__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className={errors.Username?.type === 'required' ? 'input-error' : ''}
                placeholder={
                  errors.Username?.type === 'required' ? 'Username is required!' : 'Username'
                }
                name="name"
                id="name"
                {...register('Username', { required: true, maxLength: 20 })}
              />
              <input
                type="text"
                className={errors.Community?.type === 'required' ? 'input-error' : ''}
                placeholder={
                  errors.Community?.type === 'required' ? 'Community is required!' : 'Community'
                }
                name="community"
                id="community"
                {...register('Community', { required: true, maxLength: 20 })}
              />
              <textarea
                type="text"
                className={errors.Opinion?.type === 'required' ? 'input-error' : ''}
                placeholder={
                  errors.Opinion?.type === 'required' ? 'Opinion is required!' : 'Opinion'
                }
                name="opinion"
                id="opinion"
                {...register('Opinion', { required: true, maxLength: 300 })}
              />
              <input
                type="number"
                className={errors.Rate?.type === 'required' ? 'input-error' : ''}
                placeholder={errors.Rate?.type === 'required' ? 'Rate is required!' : 'Rate'}
                name="rate"
                id="rate"
                min="1"
                max="5"
                {...register('Rate', { required: true, max: 5, min: 1 })}
              />

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
