const sidebarRoutes = [
  {
    name: "Overview",
    route: "/",
    icon: "gauge",
  },
  {
    name: "Operations",
    subroutes: [
      {
        name: "Bookings",
        route: "/bookings",
        icon: "calendar",
      },
      {
        name: "Properties",
        route: "/properties",
        icon: "house",
      },
      {
        name: "Partners",
        route: "/partners",
        icon: "users",
      },
      {
        name: "Discounts",
        route: "/discounts",
        icon: "seal-percent",
      },
      {
        name: "Ancillary",
        route: "/ancillary",
        icon: "check-square-offset",
      },
    ],
  },
  {
    name: "Settings",
    subroutes: [
      {
        name: "Roles & Permissions",
        route: "/permissions",
        icon: "users-three",
      },
      {
        name: "User management",
        route: "/user-management",
        icon: "user-plus",
      },
      {
        name: "Channels",
        route: "/channels",
        icon: "globe",
      },
    ],
  },
  {
    name: "Financials",
    route: "/financials",
    icon: "currency-ngn",
  },
];

export default sidebarRoutes;
