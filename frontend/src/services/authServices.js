export const login = async (email, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      }
    );
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
