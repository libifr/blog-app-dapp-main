import React, { useState } from "react";
import Web3 from "web3";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import useProfile from "../hooks/useProfile";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import formatDate from "../utils/formatDate";
import * as paymentService from "../services/paymentService";
import * as commentService from "../services/commentService";

function PostDetails() {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [wallet, setWallet] = useState(null);
  const [dangerMessage, setDangerMessage] = useState(false);
  const profile = useProfile();

  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  const { data: post, loading, error } = useFetch(`/posts/approved/${id}`);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (error) {
    return (
      <div className="bg-red-100 p-3 mx-20 my-5 rounded-sm text-red-500 text-center">
        {error}
      </div>
    );
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
    comments,
    isPaid,
    receivedAddress: receiverAddress,
    amount
  } = post;

  const handlePay = async () => {
    let _account;
    if (!wallet) {
      _account = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
    }

    setWallet(_account[0]);
    setDangerMessage(true);

    web3.eth
      .sendTransaction({
        from: _account[0],
        to: receiverAddress,
        value: web3.utils.toWei(amount.toString(), "ether")
      })
      .on("transactionHash", function (hash) {
        // console.log(`Transaction hash: ${hash}`);
      })
      .on("receipt", async function (receipt) {
        // console.log(`Transaction receipt: ${JSON.stringify(receipt, null, 2)}`);
        await paymentService.paid(post._id);
        setDangerMessage(false);
        window.location.reload();
      })
      .on("error", function (error) {
        console.error(`Error sending transaction: ${error}`);
      });
  };

  const handleComment = async (e) => {
    if (!text) return;

    await commentService.createNewComment(post._id, text);
    // reload the page
    window.location.reload();
  };

  return (
    <div className="w-11/12 sm:w-4/6 mx-auto py-8">
      <div className="w-full flex flex-col gap-6">
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
        <h2 className="text-3xl font-semibold leading-7">{title}</h2>
        {image && <img src={image} alt="" className="block object-contain" />}
        {isPaid ? (
          <>
            <p className="text-lg leading-7 hyphens-auto">{content}</p>
            <div className="flex items-center gap-4 border-t pt-6">
              {metadata.tags?.map((tag, i) => (
                <span key={i} className="rounded-2xl bg-gray-300 p-2 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold mt-8">Comments</h3>

              <div className="flex items-center gap-2 bg-white p-5 border shadow-sm">
                <img
                  src={profile?.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Write a response..."
                  className="w-full bg-transparent border-none outline-none focus:ring-0"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleComment();
                  }}
                />
              </div>

              <div className="flex flex-col gap-4">
                {comments?.map((comment, i) => (
                  <Comment key={i} comment={comment} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="relative pb-28">
            <p className="text-lg leading-7 hyphens-auto">{content + "..."}</p>
            <div className="absolute left-0 bottom-0 access_control p-6 w-full flex gap-3 flex-col items-center">
              <h4 className="text-lg font-semibold text-gray-800">
                {dangerMessage ? (
                  <Loader
                    isLoading={dangerMessage}
                    text="Please don't reload the page"
                  />
                ) : (
                  <span className="text-gray-800">
                    You have to pay to read the full post
                  </span>
                )}
              </h4>
              <button
                className="bg-teal-600 text-white text-sm px-4 py-1 outline-none rounded-sm shadow-lg"
                onClick={handlePay}
              >
                Pay now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
