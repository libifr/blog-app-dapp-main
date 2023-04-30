export const fetchOnePost = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${id}`,
      {
        method: "GET",
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

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(postData)
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${id}`,
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
