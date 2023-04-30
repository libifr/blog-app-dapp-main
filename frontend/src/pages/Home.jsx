import React from "react";
import Post from "../components/Post";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

function Home() {
  const { data: posts, loading, error } = useFetch("/posts/approved");

  if (error) {
    return (
      <div className="bg-red-100 p-3 mx-20 my-5 rounded-sm text-red-500 text-center">
        {error}
      </div>
    );
  }

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <div className="w-11/12 sm:w-4/6 mx-auto py-8">
      <div className="w-full flex flex-col gap-6">
        {!posts?.length && (
          <div className="bg-red-100 p-3 mx-20 my-5 rounded-sm text-red-500 text-center">
            No posts found
          </div>
        )}
        {!error && posts?.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
}

export default Home;
