import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { Image } from '../../types';
import { UseDeleteDoc, UseUpdateDoc } from '../hooks/useManageDoc';
import { UseRemoveImage } from '../hooks/useManageFiles';
import useDocsSnapshot from '../hooks/useDocsSnapshot';

function GalleryAdmin() {
  const { data: mainGallery } = useDocsSnapshot<Image>(`gallery`, [], {
    orderByArg: ['createdAt', 'desc'],
  });

  const updateGalleryImage = async (event: FormEvent, docId: string | undefined) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const price = Number((target[0] as HTMLInputElement).value);
    const sale = Number((target[1] as HTMLInputElement).value);
    if (!docId) return;
    await UseUpdateDoc('gallery', [docId], {
      sale,
      price,
    });
    toast.success('Successfully updated pricing');
  };

  const deletePost = async (post: Image) => {
    if (!post.doc_id) return;
    await UseDeleteDoc('gallery', [post.doc_id]);
    await UseRemoveImage(post.imagePath);
    toast.success('Successfully deleted post');
  };

  return (
    <details className="gallery-admin">
      <summary>Manage Gallery/Shop</summary>
      {mainGallery.map((post, i) => (
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
                  tabIndex={0}
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
              <label htmlFor={`price${i}`}>
                Price
                <input type="number" defaultValue={post.price} id={`price${i}`} name="price" />
              </label>
              <label htmlFor={`sale${i}`}>
                Sale
                <input type="number" defaultValue={post.sale} id={`sale${i}`} name="sale" />
              </label>
              <label htmlFor="submit">
                <input type="submit" value="Update" />
              </label>
              <button
                type="button"
                className="delete"
                title="Delete image"
                onClick={() => deletePost(post)}
              >
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
