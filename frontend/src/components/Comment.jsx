import React from "react";
import formatDate from "../utils/formatDate";

function Comment({ comment }) {
  const { user, comment: text, date } = comment;

  return (
    <div className="flex flex-col gap-2 bg-white p-4 shadow-sm border">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-gray-700 font-bold">{user.name}</p>
          <div className="flex items-center gap-2 text-gray-600">
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>
      <p className="text-sm md:text-lg leading-7">{text}</p>
    </div>
  );
}

export default Comment;
