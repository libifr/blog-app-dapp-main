import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import * as userService from "../../services/userService";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const data = await userService.fetchOneUser(id);
      setLoading(false);
      setName(data.name);
      setEmail(data.email);
      setImage(data.image);
      setRole(data.role);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userService.updateUser(id, {
        name,
        email,
        role
      });

      if (res.status === "success") {
        toast.success("User updated successfully");
        navigate("/admin/users");
      } else {
        setError(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between w-[90%] md:w-full">
        <h1 className="text-xl">Update user</h1>
        <Link to="/admin/users">
          <button className="bg-red-500 text-sm text-gray-50 px-4 py-2 rounded-md">
            Cancel
          </button>
        </Link>
      </div>
      <div>
        <form
          className="w-full flex flex-col md:flex-row md:items-start gap-8"
          onSubmit={handleSubmit}
        >
          <div className="w-[90%] md:w-[60%] bg-white p-6">
            {error && (
              <div className="bg-red-100 p-2 rounded-md text-red-500 mb-2">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: John Doe"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: abc@email.com"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
            </div>
          </div>
          <div className="w-[90%] md:w-[40%] bg-white p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                >
                  <option value="User">User</option>
                  <option value="Author">Author</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {/* Submit button */}
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-teal-500 text-sm text-gray-50 px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
