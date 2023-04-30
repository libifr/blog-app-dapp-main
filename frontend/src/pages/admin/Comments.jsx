import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FiTrash } from "react-icons/fi";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import formatDate from "../../utils/formatDate";
import * as commentService from "../../services/commentService";

function Comments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const { data: comments, loading, error } = useFetch("/comments");

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (error) {
    <div className="bg-red-100 p-3 mx-20 my-5 rounded-sm text-red-500 text-center">
      {error}
    </div>;
  }

  const columns = [
    {
      name: "Post Title",
      selector: (row) => row.title,
      sortable: true
    },
    {
      name: "User Avatar",
      selector: (row) => row.avatar,
      sortable: true,
      cell: (row) => (
        <img src={row.avatar} alt="avatar" className="w-10 h-10 rounded-xl" />
      )
    },
    {
      name: "User Name",
      selector: (row) => row.name
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      sortable: true
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => row._id,
      cell: (row) => (
        <div className="flex flex-row gap-4">
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

  const data = comments?.map((comment) => ({
    _id: comment?._id,
    title: comment?.post?.title,
    name: comment?.user?.name,
    avatar: comment?.user?.avatar,
    date: formatDate(comment?.date),
    comment: comment?.comment
  }));

  const handleDelete = async () => {
    if (!deletedId) return;

    await commentService.deleteComment(deletedId);
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Comment Lists</h1>
      </div>
      <div className="w-[45%] md:w-full overflow-hidden">
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

export default Comments;
