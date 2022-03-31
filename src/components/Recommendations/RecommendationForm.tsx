import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { uid } from 'uid';
import drummaks from '../../images/char.png';
import { Opinion } from '../../types';
import { db } from '../configuration/firebase';
import useRouter from '../helpers/useRouter';

function RecommendationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Opinion>();
  const router = useRouter();

  const addOpinion = async (data: Opinion) => {
    await addDoc(collection(db, 'opinions'), {
      community: data.community,
      from: data.username,
      id: uid(),
      isAccepted: false,
      opinion: data.opinion,
      rate: Number(data.rate),
      created: Timestamp.fromDate(new Date()),
    });
    reset();
    router.push('/');
    toast.success('Wysłano opinie, zaczekaj na potwierdzenie!');
  };

  const onSubmit = (data: Opinion) => addOpinion(data);

  return (
    <div className="recommendation">
      <div className="container">
        <h2 className="headerTextStroke">Leave</h2>
        <h3 className="headerwTextStroke">Feedback</h3>

        <div className="recommendation-content">
          <div className="recommendation__form">
            <form onSubmit={() => handleSubmit(onSubmit)}>
              <label htmlFor="username">
                username
                <input
                  type="text"
                  className={errors.username?.type === 'required' ? 'input-error' : ''}
                  placeholder={
                    errors.username?.type === 'required' ? 'username is required!' : 'username'
                  }
                  id="username"
                  {...register('username', { required: true, maxLength: 20 })}
                />
              </label>
              <label htmlFor="community">
                community
                <input
                  type="text"
                  className={errors.community?.type === 'required' ? 'input-error' : ''}
                  placeholder={
                    errors.community?.type === 'required' ? 'community is required!' : 'community'
                  }
                  id="community"
                  {...register('community', { required: true, maxLength: 20 })}
                />
              </label>
              <label htmlFor="opinion">
                opinion
                <textarea
                  className={errors.opinion?.type === 'required' ? 'input-error' : ''}
                  placeholder={
                    errors.opinion?.type === 'required' ? 'opinion is required!' : 'opinion'
                  }
                  id="opinion"
                  {...register('opinion', { required: true, maxLength: 300 })}
                />
              </label>
              <label htmlFor="rate">
                rate
                <input
                  type="number"
                  className={errors.rate?.type === 'required' ? 'input-error' : ''}
                  placeholder={errors.rate?.type === 'required' ? 'rate is required!' : 'rate'}
                  id="rate"
                  min="1"
                  max="5"
                  {...register('rate', { required: true, max: 5, min: 1 })}
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
