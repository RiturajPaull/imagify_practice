export const baseURL = "https://imagify-server-beta.vercel.app";

export const SummaryAPI = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  credit: {
    url: "/api/user/credits",
    method: "GET",
  },
  generateImage: {
    url: "/api/generate/image",
    method: "POST",
  },
  validate: {
    url: "/api/user/validate",
    method: "GET",
  },
  pay: {
    url: "/api/user/pay",
    method: "POST",
  },
  verify: {
    url: "/api/user/verify",
    method: "POST",
  },
};
