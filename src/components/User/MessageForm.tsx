import { IoSend } from 'react-icons/io5';
import { BiImageAdd } from 'react-icons/bi';

interface MessageFormProps {
  handleSubmit: () => void;
  messageText: string;
  setMessageText: (data: string) => void;
  setMessageImage: (data: File) => void;
}

function MessageForm({
  handleSubmit,
  messageText,
  setMessageText,
  setMessageImage,
}: MessageFormProps) {
  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <BiImageAdd role="button" />

        <input
          type="file"
          name="img"
          id="img"
          accept="image/*"
          onChange={(e) => setMessageImage((e.target.files as FileList)[0])}
        />
      </label>

      <div className="chat-form-message">
        <textarea
          rows={1}
          placeholder="Message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />

        <label htmlFor="enter-message">
          <IoSend className="send" role="button" />
          <input type="submit" id="enter-message" />
        </label>
      </div>
    </form>
  );
}

export default MessageForm;
