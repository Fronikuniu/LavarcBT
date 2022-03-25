import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../configuration/firebase';

function GalleryAdmin() {
  const [mainGallery, setMainGallery] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const gallery = [];
      querySnapshot.forEach((document) => {
        gallery.push({ doc_id: document.id, ...document.data() });
      });
      setMainGallery(gallery);
    });
    return () => unsubscribe();
  }, []);

  const updateGalleryImage = async (event, docId) => {
    event.preventDefault();
    const price = Number(event.target[0].value);
    const sale = Number(event.target[1].value);

    if (!!price || !!sale) {
      await updateDoc(doc(db, 'gallery', docId), {
        sale,
        price,
      });
    }
    toast.success('Successfully updated pricing');
  };

  const deletePost = async (post) => {
    await deleteDoc(doc(db, 'gallery', post.doc_id));
    await deleteObject(ref(storage, post.imagePath));
    toast.success('Successfully deleted post');
  };

  return (
    <details className="gallery-admin">
      <summary>Manage Gallery/Shop</summary>
      {mainGallery.map((post) => (
        <div className="gallery-post-manage" key={post.id}>
          <div className="post-top">
            <img src={post.imageSrc} alt={post.title} />
            <div className="text">
              <p>Title: {post.title}</p>
              <p>Builder: {post.builder}</p>

              <p>
                Album:{' '}
                <span
                  onClick={() => window.open(post.imgurAlbum)}
                  role="link"
                  onKeyDown={() => window.open(post.imgurAlbum)}
                  tabIndex="0"
                  className="pointer"
                >
                  <u>{post.imgurAlbum}</u>
                </span>
              </p>
              <p>Desc: {post.desc}</p>
            </div>
          </div>
          <div className="post-bot">
            <form onSubmit={(e) => updateGalleryImage(e, post.doc_id)} className="form">
              <label htmlFor="price">
                Price
                <input type="number" defaultValue={post.price} id="price" name="price" />
              </label>
              <label htmlFor="sale">
                Sale
                <input type="number" defaultValue={post.sale} id="sale" name="sale" />
              </label>
              <label htmlFor="submit">
                <input type="submit" value="Update" />
              </label>
              <button type="button" className="delete" onClick={() => deletePost(post)}>
                <MdDelete />
              </button>
            </form>
          </div>
        </div>
      ))}
    </details>
  );
}

export default GalleryAdmin;
