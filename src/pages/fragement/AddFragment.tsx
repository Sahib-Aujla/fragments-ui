import { getUser } from '../../auth';
import { postUserFragment } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const AddFragment = () => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await getUser();
    if (user) {
      const res = await postUserFragment(user, text, type);
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

  return (
    <div>
      <h2>Add a Fragment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5' }}>
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
        </select>

        <textarea
          name="textData"
          rows={20}
          cols={100}
          style={{ padding: '1rem' }}
          placeholder="Please enter the text fragment"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          required={true}
        />
        <button style={{ margin: '2rem' }} type="submit">
          Add Fragment
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddFragment;
