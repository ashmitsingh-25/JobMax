// Mock JWT / Role-based Authentication Middleware
// This establishes the structural RBAC enforcement required for separate portals.

export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    // In a real app, this would extract a JWT and verify the embedded role.
    // Here we read a mock header passed by the frontend or simulate token validation.
    const userRole = req.headers['x-user-role'];

    if (!userRole) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No credentials provided' });
    }

    if (userRole !== requiredRole) {
      return res.status(403).json({ success: false, message: `Forbidden: Requires ${requiredRole} role` });
    }

    // Role authorized, attach to request context and proceed
    req.user = { role: userRole };
    next();
  };
};

export const requireDeveloper = requireRole('developer');
export const requireCompany = requireRole('company');
