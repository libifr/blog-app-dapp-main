import React from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import formatDate from "../../utils/formatDate";

function ViewPost() {
  const { id } = useParams();
  const { data: post, loading } = useFetch(`/posts/${id}`);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (!post) {
    return <h1>Post not found</h1>;
  }

  const {
    title,
    content,
    image,
    user,
    date,
    metadata,
    receivedAddress,
    amount
  } = post;

  return (
    <div className="w-11/12 md:w-3/4 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Post details</h1>
        <Link to="/admin/posts">
          <button className="bg-red-500 text-sm text-gray-50 px-4 py-2 rounded-md">
            Back
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
          <div>
            <p className="text-gray-700 font-bold">{user.name}</p>
            <div className="flex items-center gap-2 text-gray-600">
              <span>{formatDate(date)}</span>
              <span>·</span>
              <span>{`${metadata.duration} read`}</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg">
            Received Address:
            <span className="text-gray-600 text-sm ml-2">
              {receivedAddress}
            </span>
          </p>
          <p className="text-lg">
            Amount:
            <span className="text-gray-800 font-semibold text-xl ml-2">
              {amount}
            </span>
          </p>
        </div>
        <h2 className="text-3xl font-semibold leading-7">{title}</h2>
        <img src={image} alt="" className="block object-contain" />

        <p className="text-lg leading-7 hyphens-auto">{content}</p>
        <div className="flex items-center gap-4 border-t pt-6">
          {metadata.tags?.map((tag, i) => (
            <span key={i} className="rounded-2xl bg-gray-300 p-2 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
