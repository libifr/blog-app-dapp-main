import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FiEdit, FiTrash } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import useProfile from "../../hooks/useProfile";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import formatDate from "../../utils/formatDate";
import * as postService from "../../services/postService";

function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const profile = useProfile();

  const { data: posts, loading, error } = useFetch("/posts");

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (error) {
    <div className="bg-red-100 p-3 mx-20 my-5 rounded-sm text-red-500 text-center">
      {error}
    </div>;
  }

  const columns = [
    // {
    //   name: "Image",
    //   selector: (row) => row.image,
    //   cell: (row) => (
    //     <img
    //       src={row.image}
    //       alt={row.title}
    //       className="w-12 h-12 object-cover rounded-md"
    //     />
    //   )
    // },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true
    },
    {
      name: "Content",
      selector: (row) => row.content,
      cell: (row) => (
        <div className="text-sm leading-7">
          {row.content.substring(0, 40) + "..."}
        </div>
      )
    },
    {
      name: "Author",
      selector: (row) => row.author,
      sortable: true
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div className="flex flex-row gap-2">
          <div className="text-xs text-gray-50 bg-teal-400 rounded-xl p-1">
            {row.status}
          </div>
        </div>
      )
    },
    {
      name: "Action",
      selector: (row) => row._id,
      cell: (row) => (
        <div className="flex flex-row gap-4">
          {profile.role === "Admin" && (
            <Link to={`/admin/posts/${row._id}/view`}>
              <AiFillEye size={24} className="text-green-500 cursor-pointer" />
            </Link>
          )}
          <Link to={`/admin/posts/${row._id}/edit`}>
            <FiEdit size={20} className="text-blue-500 cursor-pointer" />
          </Link>
          <FiTrash
            size={20}
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setDeletedId(row._id);
              setIsModalOpen(true);
            }}
          />
        </div>
      )
    }
  ];

  const data = posts?.map((post) => ({
    _id: post._id,
    title: post.title,
    image: post.image,
    content: post.content,
    author: post.user.name,
    date: formatDate(post.date),
    status: post.status
  }));

  const handleDelete = async () => {
    if (!deletedId) return;

    await postService.deletePost(deletedId);
    setIsModalOpen(false);
    // reload page
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Post Lists</h1>
        <Link to="/admin/posts/create">
          <button className="bg-green-400 text-sm text-gray-50 px-4 py-2 rounded-md">
            Create Post
          </button>
        </Link>
      </div>
      <div className="w-[42%] md:w-full overflow-hidden">
        <PerfectScrollbar>
          <DataTable
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            columns={columns}
            data={data}
          />
        </PerfectScrollbar>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Posts;
