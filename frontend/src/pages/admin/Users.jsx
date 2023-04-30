import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FiEdit, FiTrash } from "react-icons/fi";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import * as userService from "../../services/userService";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const { data: users, loading, error } = useFetch("/users");

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
      name: "Avatar",
      selector: (row) => row.avatar,
      cell: (row) => (
        <img
          src={row.avatar}
          alt={row.name}
          className="w-10 h-10 object-cover rounded-md"
        />
      )
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => (
        <div className="flex flex-row gap-2">
          <div className="text-xs text-gray-50 bg-teal-400 rounded-xl p-1">
            {row.role}
          </div>
        </div>
      )
    },
    {
      name: "Action",
      selector: (row) => row._id,
      cell: (row) => (
        <div className="flex flex-row gap-4">
          <Link to={`/admin/users/${row._id}/edit`}>
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

  const data = users?.map((user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  }));

  const handleDelete = async () => {
    if (!deletedId) return;

    await userService.deleteUser(deletedId);
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">User Lists</h1>
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

export default Users;
