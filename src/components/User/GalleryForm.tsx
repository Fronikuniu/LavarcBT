import { Timestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { uid } from 'uid';
import { GalleryFormImage, Member } from '../../types';
import useDocs from '../hooks/useDocs';
import { UseSetDoc } from '../hooks/useManageDoc';
import { UseAddImage } from '../hooks/useManageFiles';

function GalleryForm() {
  const { data: members } = useDocs<Member>('members', {});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GalleryFormImage>();

  const onSubmit = async ({
    builder,
    title,
    desc,
    imgurAlbum,
    price,
    sale,
    image,
  }: GalleryFormImage) => {
    const { url, path } = await UseAddImage('gallery', image[0]);

    const docId = uid(20);
    await UseSetDoc('gallery', [docId], {
      id: uid(15),
      doc_id: docId,
      imageSrc: url,
      imagePath: path,
      builder,
      title,
      desc,
      imgurAlbum,
      price: Number(price),
      sale: Number(sale),
      createdAt: Timestamp.fromDate(new Date()),
      bestseller: 0,
    });

    reset();
    toast.success('Successfully added image to gallery');
  };

  return (
    <details>
      <summary>Add gallery image</summary>
      <form onSubmit={handleSubmit(onSubmit)} className="addImage-form">
        <p>
          Before upload image use{' '}
          <span
            onClick={() => window.open('https://www.freeconvert.com/webp-converter')}
            role="link"
            onKeyDown={() => window.open('https://www.freeconvert.com/webp-converter')}
            tabIndex={0}
            className="pointer underline"
          >
            https://www.freeconvert.com/webp-converter
          </span>{' '}
          to compress the file.
        </p>
        <label htmlFor="builder">
          Builder*
          <select
            id="builder"
            className={errors.builder ? 'input-error' : ''}
            placeholder={errors.builder ? 'Builder is required!' : 'Builder'}
            {...register('builder', { required: true })}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select builder
            </option>
            {members.map((member) => (
              <option value={member.name} key={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="title">
          Title*
          <input
            type="text"
            id="title"
            className={errors.title ? 'input-error' : ''}
            placeholder={errors.title ? 'Title is required!' : 'Title'}
            {...register('title', { required: true })}
          />
        </label>
        <label htmlFor="imgurAlbum">
          Imgur album*
          <input
            type="text"
            id="imgurAlbum"
            className={errors.imgurAlbum ? 'input-error' : ''}
            placeholder={errors.imgurAlbum ? 'Imgur album is required!' : 'Imgur album'}
            {...register('imgurAlbum', { required: true })}
          />
        </label>
        <label htmlFor="desc">
          Shop description
          <textarea
            id="desc"
            className={errors.desc ? 'input-error' : ''}
            placeholder="Description"
            {...register('desc', {})}
          />
        </label>
        <label htmlFor="price">
          Price
          <input type="number" id="price" placeholder="price" {...register('price', {})} />
        </label>
        <label htmlFor="sale">
          Sale
          <input type="number" id="sale" placeholder="sale" {...register('sale', {})} />
        </label>
        <label htmlFor="image">
          Upload image*
          <input
            type="file"
            id="image"
            className={errors.image ? 'input-error' : ''}
            placeholder="image"
            {...register('image', { required: true })}
          />
        </label>

        <input type="submit" />
      </form>
    </details>
  );
}

export default GalleryForm;
