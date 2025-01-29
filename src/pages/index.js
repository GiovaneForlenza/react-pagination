import Pagination from "@/components/Pagination";
import Posts from "@/components/Post";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const resPosts = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(resPosts.data);
      setLoading(false);
    };
    fetchPosts();
    fetchRandomPhoto();
    for (let index = 0; index < postsPerPage; index++) {
      fetchRandomPhoto();
    }
  }, []);

  const fetchRandomPhoto = () => {
    fetch("https://api.api-ninjas.com/v1/randomimage", {
      headers: {
        "X-Api-Key": "yRC+HV97KEEzYb9CgaFnVg==k13KLOdqnVyCpMgF",
        Accept: "image/jpg",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        // console.log(img);
        console.log(img.src);
        setPhotos([...photos, img.src]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="home-wrapper">
      <h1>My blog</h1>
      <Posts posts={currentPosts} loading={loading} />

      {photos.length === postsPerPage.length && photos.map((photo) => <img src={photo} alt="" />)}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}
