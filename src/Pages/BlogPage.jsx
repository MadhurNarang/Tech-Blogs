import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { AppContext } from "../Context/AppContext";
import Spinner from "../Components/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import BlogDetails from "../Components/BlogDetails";

const BlogPage = () => {
  const { loading, setLoading } = useContext(AppContext);
  const [blog, setBlog] = useState(null);
  const [reletedBlogs, setReletedBlogs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = "https://codehelp-apis.vercel.app/api/get-blog";
  const blogId = location.pathname.split("/").at(-1);

  async function fetchReleatedBlogs() {
    setLoading(true);
    const url = `${baseUrl}?blogId=${blogId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setBlog(data.blog);
      setReletedBlogs(data.relatedBlogs);
    } catch (err) {
      console.log(err);
      setBlog(null);
      setReletedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchReleatedBlogs();
  }, [location.pathname]);

  return (
    <div className="my-[100px]">

      <Header />

      <div className="max-w-3xl mx-auto w-11/12 -mb-[40px]">
        <button className="border-2 border-gray-300 py-1 px-4 rounded-md mb-6" onClick={() => navigate("/")}>Back</button>
      </div>

      <div className="my-[60px]">
        <div className="flex flex-col gap-y-10 my-4">
          {
            loading 
            ? (<Spinner />) 
            : blog 
              ? (
                  <div className="flex flex-col gap-10">
                    <BlogDetails post={blog} />
                    <h2 className="text-2xl font-bold mt-7 max-w-3xl mx-auto w-11/12">Related Blogs :</h2>
                    {
                      reletedBlogs.map((post) => (<BlogDetails post={post} key={post.id}/>))
                    }
                  </div>
                )
              : (<p className="max-w-3xl mx-auto w-11/12">No Blog Found</p>)
          }
        </div>
      </div>
      
    </div>
  )
};

export default BlogPage;
