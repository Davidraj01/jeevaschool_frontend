const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://api.jeevamatriculation.in/api"
).replace(/\/$/, "");
let csrfRequest;

function csrfCookie() {
  return document.cookie
    .split("; ")
    .find((item) => item.startsWith("csrftoken="))
    ?.split("=")[1];
}

async function ensureCsrfToken(forceRefresh = false) {
  if (csrfCookie() && !forceRefresh) return;
  if (!csrfRequest)
    csrfRequest = fetch(`${API_BASE_URL}/auth/csrf/`, {
      credentials: "include",
      cache: "no-store",
    })
      .catch(() => {
        // Silently handle if backend is not reachable at CSRF check stage; request() will handle connection failure
      })
      .finally(() => {
        csrfRequest = null;
      });
  await csrfRequest;
}

// Helper for fetch requests
async function request(endpoint, options = {}, retryingCsrf = false) {
  const method = options.method || "GET";
  if (!["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase()))
    await ensureCsrfToken();
  const url = `${API_BASE_URL}${endpoint}`;
  const csrfToken = csrfCookie();
  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken ? { "X-CSRFToken": csrfToken } : {}),
      ...options.headers,
    },
    ...options,
  };

  let response;
  try {
    response = await fetch(url, config);
  } catch (err) {
    throw new Error(
      `Unable to connect to the server. Please ensure the backend is running on ${API_BASE_URL}`,
    );
  }

  if (!response.ok) {
    const responseText = await response.text();
    const isCsrfFailure =
      response.status === 403 && /csrf|forbidden/i.test(responseText);
    if (isCsrfFailure && !retryingCsrf && method !== "GET") {
      await ensureCsrfToken(true);
      return request(endpoint, options, true);
    }
    const errorData = (() => {
      try {
        return JSON.parse(responseText || "{}");
      } catch {
        return {};
      }
    })();
    const error = new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
    error.status = response.status;
    error.data = errorData;
    error.locked = errorData.locked || false;
    error.remaining_seconds = errorData.remaining_seconds || 0;
    error.attempts_remaining = errorData.attempts_remaining;
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
}

export const apiService = {
  // Public APIs
  getSettings: () => request("/settings/"),
  getSEO: (pageName) => request(`/seo/?page_name=${pageName}`),
  getBlogs: () => request("/blogs/"),
  getBlogBySlug: (idOrSlug) => request(`/blogs/${idOrSlug}/`),
  getBlogCategories: () => request("/blog-categories/"),
  getGallery: () => request("/gallery/"),
  getVideos: () => request("/videos/"),
  getEvents: () => request("/events/"),
  getFeedback: () => request("/feedback/"),
  submitAdmission: (data) =>
    request("/admissions/", { method: "POST", body: JSON.stringify(data) }),
  submitContact: (data) =>
    request("/enquiries/", { method: "POST", body: JSON.stringify(data) }),
  submitFeedback: (data) =>
    request("/feedback/", { method: "POST", body: JSON.stringify(data) }),
  search: (query) => request(`/search/?q=${encodeURIComponent(query)}`),

  // Admin Auth
  login: (credentials) =>
    request("/auth/login/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  verify2FA: (data) =>
    request("/auth/verify-2fa/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  resend2FA: (data) =>
    request("/auth/resend-2fa/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getLockoutStatus: (username) =>
    request(
      `/auth/lockout-status/?username=${encodeURIComponent(username || "")}`,
    ),
  getCurrentUser: () => request("/auth/me/"),
  getSetupStatus: () => request("/auth/setup-status/"),
  setupAdmin: (credentials) =>
    request("/auth/setup/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  logout: () => request("/auth/logout/", { method: "POST" }),
  getDashboardStats: () => request("/admin/dashboard-stats/"),

  // Admin Management CRUD
  getAdmissions: () => request("/admissions/"),
  updateAdmissionStatus: (id, status) =>
    request(`/admissions/${id}/`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  deleteAdmission: (id) => request(`/admissions/${id}/`, { method: "DELETE" }),

  createBlog: (data) =>
    request("/blogs/", { method: "POST", body: JSON.stringify(data) }),
  updateBlog: (id, data) =>
    request(`/blogs/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlog: (id) => request(`/blogs/${id}/`, { method: "DELETE" }),

  createGalleryItem: (data) =>
    request("/gallery/", { method: "POST", body: JSON.stringify(data) }),
  deleteGalleryItem: (id) => request(`/gallery/${id}/`, { method: "DELETE" }),

  createVideoItem: (data) =>
    request("/videos/", { method: "POST", body: JSON.stringify(data) }),
  deleteVideoItem: (id) => request(`/videos/${id}/`, { method: "DELETE" }),

  createEvent: (data) =>
    request("/events/", { method: "POST", body: JSON.stringify(data) }),
  updateEvent: (id, data) =>
    request(`/events/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  deleteEvent: (id) => request(`/events/${id}/`, { method: "DELETE" }),

  getSEOList: () => request("/seo/"),
  updateSEO: (id, data) =>
    request(`/seo/${id}/`, { method: "PUT", body: JSON.stringify(data) }),

  toggleFeedbackApproval: (id, is_approved) =>
    request(`/feedback/${id}/`, {
      method: "PATCH",
      body: JSON.stringify({ is_approved }),
    }),
  deleteFeedback: (id) => request(`/feedback/${id}/`, { method: "DELETE" }),

  getStudents: () => request("/students/"),

  getUsers: () => request("/users/"),
  createUser: (data) =>
    request("/users/", { method: "POST", body: JSON.stringify(data) }),
  updateUser: (id, data) =>
    request(`/users/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  deleteUser: (id) => request(`/users/${id}/`, { method: "DELETE" }),
};
