const avatars = [
  "https://avatars.githubusercontent.com/u/56452822",
  "https://avatars.githubusercontent.com/u/56452823",
  "https://avatars.githubusercontent.com/u/56452825",
  "https://avatars.githubusercontent.com/u/56452826",
  "https://avatars.githubusercontent.com/u/56452827",
  "https://avatars.githubusercontent.com/u/56452828",
  "https://avatars.githubusercontent.com/u/56452829",
  "https://avatars.githubusercontent.com/u/56452831",
  "https://avatars.githubusercontent.com/u/56452832",
  "https://avatars.githubusercontent.com/u/56452833",
  "https://avatars.githubusercontent.com/u/56452834",
  "https://avatars.githubusercontent.com/u/56452835",
  "https://avatars.githubusercontent.com/u/56452836",
  "https://avatars.githubusercontent.com/u/56452837",
  "https://avatars.githubusercontent.com/u/56452838",
  "https://avatars.githubusercontent.com/u/56452839",
  "https://avatars.githubusercontent.com/u/56452840"
];

export const randomAvatar = (id) => {
  return avatars[id % avatars.length];
};
