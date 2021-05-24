import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import Post from "./Post";
import { Container } from "@material-ui/core/";
import { getMyPost, getPosts } from "../../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";

const WINDOW_HEIGHT_20 = window.innerHeight / 5;

export default function Posts() {
  const dispatch = useDispatch();
  // const allPosts = useSelector((state) => state.post.allPosts);
  const posts = useSelector((state) => state.post.posts);
  const selectedTag = useSelector((state) => state.tag.selectedTag);
  const [skip, setSkip] = useState(0);

  //Load post when selectedTag changed
  useEffect(() => {
    setSkip(0);
    dispatch({ type: "RESET_POST" });
  }, [dispatch, selectedTag]);

  //Load next posts
  useEffect(() => {
    // console.log(skip);
    if (selectedTag === "โพสต์ของฉัน") getMyPost(dispatch, skip);
    else getPosts(dispatch, selectedTag, skip);
  }, [dispatch, selectedTag, skip]);

  //scroll
  useEffect(() => {
    const handleScroll = (e) => {
      const { clientHeight, scrollTop, scrollHeight } =
        e.target.scrollingElement;
      // console.log(clientHeight, scrollTop, scrollHeight, e);

      if (clientHeight + scrollTop + WINDOW_HEIGHT_20 >= scrollHeight) {
        setSkip(posts.length);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [posts.length]);

  return (
    <Container>
      {posts.map((post) => (
        <LazyLoad key={post._id} placeholder={<p>loading....</p>}>
          <Post key={post._id} post={post} />
        </LazyLoad>
      ))}
    </Container>
  );
}
