import { getUser } from "../../auth";
import { postUserFragment } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const AddFragment = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = await getUser();
    if (user) {
      const res = await postUserFragment(user,text);
      console.log(res);
      toast.success("Success Notification!", {
        position: "top-right",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    } else {
      toast.error("Error adding fragment!", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <h2>Add a Text Fragment</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "5" }}
      >
        <textarea
          name="textData"
          rows={5}
          cols={30}
          placeholder="Please enter the text fragment"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          required={true}
        />
        <button style={{ margin: "2rem" }} type="submit">
          Add Fragment
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddFragment;
