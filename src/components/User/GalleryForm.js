import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { uid } from 'uid';
import { db, storage } from '../configuration/firebase';

function GalleryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async ({ builder, title, desc, imgurAlbum, price, sale, image }) => {
    let url;
    const imageRef = ref(storage, `gallery/${new Date().getTime()} - ${image[0].name}`);
    const snapshot = await uploadBytes(imageRef, image[0]);
    const dlUrl = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
    url = dlUrl;

    await addDoc(collection(db, 'gallery'), {
      id: uid(15),
      imageSrc: url,
      builder,
      title,
      desc,
      imgurAlbum,
      price: Number(price),
      sale: Number(sale),
      createdAt: Timestamp.fromDate(new Date()),
    });

    reset();
    toast.success('Successfully added gallery image');
  };

  return (
    <details>
      <summary>Add gallery image</summary>
      <form onSubmit={handleSubmit(onSubmit)} className="addImage-form">
        <p>
          Before upload image use{' '}
          <span
            onClick={() => window.open('https://imagecompressor.com/')}
            role="link"
            onKeyDown={() => window.open('https://imagecompressor.com/')}
            tabIndex="0"
            className="pointer"
          >
            <u>https://imagecompressor.com/</u>
          </span>{' '}
          to compress the file.
        </p>
        <label htmlFor="builder">
          Builder*
          <input
            type="text"
            id="builder"
            className={errors.builder ? 'input-error' : ''}
            placeholder={errors.builder ? 'Builder is required!' : 'Builder'}
            {...register('builder', { required: true })}
          />
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
          Description*
          <textarea
            id="desc"
            className={errors.desc ? 'input-error' : ''}
            placeholder={errors.desc ? 'Description is required!' : 'Description'}
            {...register('desc', { required: true })}
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