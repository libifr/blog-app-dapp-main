import jwtDecode from "jwt-decode";

export default function useProfile() {
  const token = localStorage.getItem("token");
  if (token == undefined) return null;

  const profile = jwtDecode(token);
  return profile;
}
