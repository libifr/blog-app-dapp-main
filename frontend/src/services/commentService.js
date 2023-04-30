export const createNewComment = async (postId, text) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        post: postId,
        comment: text
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
