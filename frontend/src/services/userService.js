export const fetchOneUser = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${id}`,
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

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(userData)
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${id}`,
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

export const updateProfile = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(userData)
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
