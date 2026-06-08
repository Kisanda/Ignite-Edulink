// src/services/api.js
// Central API service – connects the React frontend to the Express backend

const BASE = "/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("adminToken");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });
  const data = await res.json();
  return data;
}

// ── Consultation Booking ───────────────────────────────────────────────────
export async function bookConsultation(payload) {
  return request("/consultations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Newsletter ─────────────────────────────────────────────────────────────
export async function subscribeNewsletter(email) {
  return request("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function unsubscribeNewsletter(email) {
  return request("/newsletter/unsubscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// ── Contact Form ───────────────────────────────────────────────────────────
export async function submitContact(payload) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Events ─────────────────────────────────────────────────────────────────
export async function getEvents(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(`/events${qs ? "?" + qs : ""}`);
}

export async function registerForEvent(slug, payload) {
  return request(`/events/${slug}/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Blog ───────────────────────────────────────────────────────────────────
export async function getBlogPosts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(`/blog${qs ? "?" + qs : ""}`);
}

export async function getBlogPost(slug) {
  return request(`/blog/${slug}`);
}

// ── University Enquiry ─────────────────────────────────────────────────────
export async function submitUniversityEnquiry(payload) {
  return request("/universities/enquire", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Cost Calculator Analytics ──────────────────────────────────────────────
export async function trackCalculatorSession(payload) {
  return request("/calculator/session", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Admin Auth ─────────────────────────────────────────────────────────────
export async function adminLogin(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function adminGetMe() {
  return request("/auth/me");
}

// ── Admin Dashboard ────────────────────────────────────────────────────────
export async function adminGetDashboardStats() {
  return request("/dashboard/stats");
}

// ── Admin Consultations ─────────────────────────────────────────────────────
export async function adminGetConsultations() {
  return request("/consultations");
}

export async function adminUpdateConsultationStatus(id, status) {
  return request(`/consultations/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function adminDeleteConsultation(id) {
  return request(`/consultations/${id}`, {
    method: "DELETE",
  });
}

// ── Admin Contact Enquiries ─────────────────────────────────────────────────
export async function adminGetContacts() {
  return request("/contact");
}

export async function adminUpdateContactStatus(id, status) {
  return request(`/contact/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function adminDeleteContact(id) {
  return request(`/contact/${id}`, {
    method: "DELETE",
  });
}

// ── Admin Blog CRUD ─────────────────────────────────────────────────────────
export async function adminGetBlogPosts() {
  return request("/blog/admin/all");
}

export async function adminCreateBlogPost(payload) {
  return request("/blog", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateBlogPost(id, payload) {
  return request(`/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteBlogPost(id) {
  return request(`/blog/${id}`, {
    method: "DELETE",
  });
}

// ── Admin Events CRUD ───────────────────────────────────────────────────────
export async function adminGetEvents() {
  return request("/events/admin/all");
}

export async function adminCreateEvent(payload) {
  return request("/events/admin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateEvent(id, payload) {
  return request(`/events/${id}/admin`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteEvent(id) {
  return request(`/events/${id}`, {
    method: "DELETE",
  });
}

export async function adminGetEventRegistrations(id) {
  return request(`/events/${id}/registrations`);
}

// ── Admin Newsletter Subscribers ────────────────────────────────────────────
export async function adminGetSubscribers() {
  return request("/newsletter");
}

export async function adminDeleteSubscriber(id) {
  return request(`/newsletter/${id}`, {
    method: "DELETE",
  });
}

// ── Admin University Enquiries ──────────────────────────────────────────────
export async function adminGetEnquiries() {
  return request("/universities");
}

export async function adminUpdateEnquiryStatus(id, status) {
  return request(`/universities/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

// ── Admin Cost Calculator History ───────────────────────────────────────────
export async function adminGetCalculatorStats() {
  return request("/calculator/stats");
}
