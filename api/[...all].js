import app from "../server/index.js";

export default function handler(req, res) {
  // Normalize URL to always have '/api' prefix for Express routing
  if (!req.url.startsWith("/api")) {
    req.url = "/api" + (req.url.startsWith("/") ? req.url : "/" + req.url);
  }
  return app(req, res);
}
