import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { FcComments } from "react-icons/fc";
import { BsFillPeopleFill } from "react-icons/bs";
import useProfile from "../../hooks/useProfile";

const items = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <MdDashboard />,
    role: ["Admin", "Author"]
  },
  {
    name: "Posts",
    link: "/admin/posts",
    icon: <IoMdListBox />,
    role: ["Admin", "Author"]
  },
  {
    name: "Comments",
    link: "/admin/comments",
    icon: <FcComments />,
    role: ["Admin"]
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: <BsFillPeopleFill />,
    role: ["Admin"]
  }
];

function Sidebar() {
  const profile = useProfile();

  return (
    <div className="bg-gray-800 text-white min-h-screen w-60 p-4">
      <div className="flex flex-col items-center">
        <img src={profile?.avatar} alt="" className="w-12 h-12 rounded-full" />
        <h2 className="mt-2">{profile?.role}</h2>

        <div className="flex flex-col gap-2 mt-4">
          {items.map((item, index) => {
            if (item.role.includes(profile?.role)) {
              return (
                <Link
                  to={item.link}
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
