import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

function Post({ post }) {
  const { _id, title, content, user, date, metadata } = post;

  console.log(content);

  return (
    <div className="flex flex-col gap-4 border-b">
      <div className="flex items-center gap-2">
        <img
          src={user.avatar}
          alt=""
          className="w-6 h-6 rounded-full ring-2 ring-red-500"
        />
        <div className="flex items-center gap-1">
          <p className="text-base">{user.name}</p>
          <span className="text-gray-400">-</span>
          <p className="text-sm text-gray-700">{formatDate(date)}</p>
        </div>
      </div>
      <Link to={`/posts/${_id}`}>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl text-gray-700 font-bold leading-7">
            {title}
          </h3>
          <p className="text-base leading-6">{content + "..."}</p>
          {/* <div>{ReactHtmlParser(content)}</div> */}
        </div>
      </Link>
      <div className="flex gap-4 items-center mt-4 mb-8">
        {metadata.tags?.map((tag, i) => (
          <span key={i} className="rounded-2xl bg-gray-300 p-2 text-xs">
            {tag}
          </span>
        ))}

        <span className="text-gray-600">{`${metadata.duration} read`}</span>
      </div>
    </div>
  );
}

export default Post;
