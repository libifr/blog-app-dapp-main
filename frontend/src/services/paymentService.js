export const paid = async (postId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/paid/${postId}`,
      {
        method: "POST",
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
