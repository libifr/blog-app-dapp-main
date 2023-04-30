import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useProfile from "../../hooks/useProfile";
import Loader from "../../components/Loader";
import * as postService from "../../services/postService";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [receivedAddress, setReceivedAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const profile = useProfile();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await postService.fetchOnePost(id);
      setLoading(false);
      setTitle(data.title);
      setContent(data.content);
      setTags(data.metadata.tags.join(", "));
      setStatus(data.status);
      setDuration(data.metadata.duration);
      setReceivedAddress(data.receivedAddress);
      setAmount(data.amount);
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postService.updatePost(id, {
        title,
        content,
        status,
        metadata: {
          tags: tags.split(",").map((tag) => tag.trim()),
          duration
        },
        receivedAddress,
        amount
      });

      if (res.status === "success") {
        toast.success("Post updated successfully");
        navigate("/admin/posts");
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
        <h1 className="text-xl">Update post</h1>
        <Link to="/admin/posts">
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
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: How to create a blog using ReactJS"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="content">Content</label>
                <textarea
                  name="content"
                  id="content"
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start typing..."
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              {/* <div className="flex flex-col gap-2">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div> */}
              <div className="flex flex-col gap-2">
                <label htmlFor="tags">Tags</label>
                <span className="text-xs text-teal-500">
                  Seperated with comma (,)
                </span>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Ex: reactjs, javascript, blog"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
            </div>
          </div>
          <div className="w-[90%] md:w-[40%] bg-white p-6">
            <div className="flex flex-col gap-4">
              {profile?.role === "Admin" && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="status">Status</label>
                  <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  placeholder="Ex: 5 mins"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address">Received Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Ex: 0x1234567890"
                  value={receivedAddress}
                  onChange={(e) => setReceivedAddress(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  placeholder="Ex: 0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2"
                  required
                />
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

export default EditPost;
