export const menuItems = [
  {
    title: "Users",
    subMenu: [
      {
        title: "Create new user",
      },
      {
        title: "Get all users",
      },
      {
        title: "Get User by Id",
      },
      {
        title: "Update authorization",
      },
      {
        title: "Delete User",
      },
    ],
  },
  { title: "Access Points" },
  {
    title: "Logs",
    subMenu: [
      { title: "Create Log" },
      {
        title: "Get Logs",
        subMenu: [{ title: "By  userId" }, { title: "By Access Point" }],
      },
    ],
  },
];
