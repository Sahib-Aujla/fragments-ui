
import { getUser } from "../../auth";
import { postUserFragment } from "../../api";

const AddFragment = () => {
  const handleSubmit = async () => {
    const user = await getUser();
    if (user) {
      const res = await postUserFragment(user);
      console.log(res);
    }
  };
  return <button onClick={handleSubmit}>Add Fragment</button>;
};

export default AddFragment;
