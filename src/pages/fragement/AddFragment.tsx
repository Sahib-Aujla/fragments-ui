import { getUser } from '../../auth';
import { postUserFragment } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const AddFragment = () => {
  const [text, setText] = useState('');
  const [type, setType] = useState('text/plain');
  const [file, setFile] = useState<File>();

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await getUser();
    if (user) {
      const formData = new FormData();
      formData.append('type', type);
      if (file && type.startsWith('image')) {
        formData.append('file', file);
      } else {
        formData.append('text', text);
      }

      const res = await postUserFragment(user, formData);
      console.log({ res });
      toast.success('Success Notification!', {
        position: 'top-right',
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/');
    } else {
      toast.error('Error adding fragment!', {
        position: 'top-right',
      });
    }
  };
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e?.target?.files[0]) {
      const selectedFile = e?.target?.files[0] || null;
      if (selectedFile) {
        setFile(selectedFile);

        setType(selectedFile.type);
      }
    }
  }

  return (
    <div>
      <h2>Add a Fragment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5',width: '40rem', height: '40rem' }}>
        <select
          name="type"
          onChange={(e) => setType(e.target.value)}
          style={{ margin: '1rem 0', padding: '1rem' }}
        >
          <option value="text/plain">Text </option>
          <option value="text/markdown">Markdown </option>
          <option value="text/html">HTML</option>
          <option value="text/csv">CSV</option>
          <option value="application/json">JSON</option>
          <option value="application/x-yaml">YAML</option>
          <option value="image/*">Image</option>
        </select>
        {type.startsWith('image/') ? (
          <input type="file" onChange={handleFile} style={{ width: '20rem', height: '5rem' }} />
        ) : (
          <textarea
            name="textData"
            rows={20}
            cols={100}
            style={{ padding: '1rem' }}
            placeholder="Please enter the text fragment"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          />
        )}
        <button style={{ margin: '2rem' }} type="submit">
          Add Fragment
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddFragment;
