import React, { useState, useEffect } from "react";
import useProfile from "../hooks/useProfile";
import { toast } from "react-toastify";
import * as userService from "../services/userService";
import * as authService from "../services/authServices";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const profile = useProfile();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userService.updateProfile({
        name,
        email
      });

      if (res.status === "success") {
        toast.success("Profile updated successfully");
        authService.logout();
        window.location.reload();
      } else {
        setError(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-11/12 sm:w-4/6 mx-auto py-8 flex flex-col gap-8">
      <h1 className="text-xl">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-[80%] md:w-[30%] bg-white rounded-md p-6 flex gap-3 flex-col justify-center items-center">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-full"
          />
          <h3 className="text-lg">{profile.name}</h3>
          <h4 className="text-sm bg-red-200 p-1 rounded-lg">{profile.role}</h4>
        </div>
        <div className="w-full md:w-[60%] bg-white rounded-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-500 text-sm text-gray-50 px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
