import style from "../styles/pages/Company.module.scss";
import Link from "next/link";
import Empty from "../comps/empty";
import { ActivateBar } from "../functions/ActivateBar";
import { postArray, getPosts } from "../functions/Api/posts";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Spinner from "../comps/Spinner";

const CompanyHome = () => {
  const { auth } = useContext(AuthContext);

  // state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    // Fetch data from external API
    await getPosts(auth);

    setPosts(postArray);

    setLoading(false);
  };

  useEffect(() => {
    getData();
    ActivateBar("bar1");
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <main className={`container `}>
      <div className={style.header}>
        <h4>Hello!</h4>
        <Link href="/post-job" passHref>
          <button className="btn--global btn--blue btn--detail">
            Add New Post
          </button>
        </Link>
      </div>
      <div className={` ${style.ContentWrap}`}>
        <section className={`${style.content} `}>
          <Empty
            txt1="There is no posted jobs for now!"
            btn="Add New Post"
            path="/post-job"
            isCompany={true}
          />
        </section>
        <section className={`${style.content} `}></section>
      </div>
    </main>
  );
};
export default CompanyHome;
