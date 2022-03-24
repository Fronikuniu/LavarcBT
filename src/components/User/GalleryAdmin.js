import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../configuration/firebase';

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

  return (
    <details className="gallery-admin">
      <summary>Manage Gallery/Shop</summary>
      {mainGallery.map((post) => (
        <div className="gallery-post-manage">
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
            <form className="form">
              <label htmlFor="price">
                Price
                <input type="number" name="price" id="price" value={post.price} />
              </label>
              <label htmlFor="sale">
                Sale
                <input type="number" name="sale" id="sale" value={post.sale} />
              </label>
              <label htmlFor="submit">
                <input type="submit" />
              </label>
            </form>
          </div>
        </div>
      ))}
    </details>
  );
}

export default GalleryAdmin;
