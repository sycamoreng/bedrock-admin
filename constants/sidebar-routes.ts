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
        name: "Apartments",
        route: "/apartments",
        icon: "house",
      },
      {
        name: "Partners",
        route: "/partners",
        icon: "users",
      },
    ],
  },
  {
    name: "Financials",
    subroutes: [
      {
        name: "Expenses",
        route: "/expenses",
        icon: "chart-bar",
      },
      {
        name: "Revenue",
        route: "/revenue",
        icon: "chart-line-up",
      },
    ],
  },
];

export default sidebarRoutes;
