// Centralized route constants — never hardcode paths in components
export const ROUTES = {
  home: "/",
  services: "/services",
  technicians: "/technicians",
  howItWorks: "/how-it-works",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",

  login: "/login",
  register: "/register",

  payment: {
    success: "/payment/success",
    failed: "/payment/failed",
    cancel: "/payment/cancel",
  },

  dashboard: {
    root: "/dashboard",
    customer: {
      root: "/dashboard/customer",
      bookings: "/dashboard/customer/bookings",
      booking: (id: string) => `/dashboard/customer/bookings/${id}`,
      payments: "/dashboard/customer/payments",
      reviews: "/dashboard/customer/reviews",
      profile: "/dashboard/customer/profile",
    },
    technician: {
      root: "/dashboard/technician",
      profile: "/dashboard/technician/profile",
      services: "/dashboard/technician/services",
      availability: "/dashboard/technician/availability",
      bookings: "/dashboard/technician/bookings",
      booking: (id: string) => `/dashboard/technician/bookings/${id}`,
      reviews: "/dashboard/technician/reviews",
    },
    admin: {
      root: "/dashboard/admin",
      users: "/dashboard/admin/users",
      bookings: "/dashboard/admin/bookings",
      categories: "/dashboard/admin/categories",
    },
  },
} as const;

export const ROLE_HOME = {
  CUSTOMER: ROUTES.dashboard.customer.root,
  TECHNICIAN: ROUTES.dashboard.technician.root,
  ADMIN: ROUTES.dashboard.admin.root,
} as const;
