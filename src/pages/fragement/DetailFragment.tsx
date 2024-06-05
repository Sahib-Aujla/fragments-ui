import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneFragment } from "../../api";
import { getUser } from "../../auth";
import { Fragment } from "../../models";

const DetailFragment = () => {
  const { id } = useParams();
  const [fragment, setFragment] = useState<Fragment>();
  const navigate = useNavigate();
  useEffect(() => {
    async function getFragment() {
      const user = await getUser();
      if (user && id) {
        const res = await getOneFragment(user, id);
        setFragment(res.fragment as Fragment);
      }
    }
    getFragment();
  }, [id]);
  return (
    <>
      <div style={{ margin: "2rem" }}>
        <h1 style={{ padding: "1rem" }}>Fragment Details</h1>
        <p>Fragment Id : {fragment?.id}</p>
        <p>Created at: {fragment?.created}</p>
        <p>Updated at: {fragment?.updated}</p>

        <p>Type: {fragment?.type}</p>
        <p>Size: {fragment?.size}</p>
      </div>
      <div style={{ margin: "2rem" }}>
        <button onClick={() => navigate("/")}>Home Page</button>
      </div>
    </>
  );
};

export default DetailFragment;
