function encode(id: string) {
  return encodeURIComponent(id);
}

export const apiPaths = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
  },
  services: {
    list: "/services",
    create: "/services",
    update: (id: string) => `/services/${encode(id)}`,
    delete: (id: string) => `/services/${encode(id)}`,
  },
  technicians: {
    list: "/technicians",
    detail: (id: string) => `/technicians/${encode(id)}`,
    profile: "/technicians/profile",
    availability: "/technicians/availability",
    bookings: "/technicians/bookings",
    updateBookingStatus: (id: string) => `/technicians/bookings/${encode(id)}`,
  },
  categories: {
    list: "/categories",
  },
  bookings: {
    create: "/bookings",
    list: "/bookings",
    detail: (id: string) => `/bookings/${encode(id)}`,
    cancel: (id: string) => `/bookings/${encode(id)}/cancel`,
  },
  payments: {
    create: "/payments/create",
    syncSession: "/payments/sync-session",
    list: "/payments",
    detail: (id: string) => `/payments/${encode(id)}`,
  },
  reviews: {
    create: "/reviews",
  },
  admin: {
    users: {
      list: "/admin/users",
      updateStatus: (id: string) => `/admin/users/${encode(id)}`,
    },
    bookings: {
      list: "/admin/bookings",
    },
    categories: {
      list: "/admin/categories",
      create: "/admin/categories",
      update: (id: string) => `/admin/categories/${encode(id)}`,
      delete: (id: string) => `/admin/categories/${encode(id)}`,
    },
  },
} as const;
