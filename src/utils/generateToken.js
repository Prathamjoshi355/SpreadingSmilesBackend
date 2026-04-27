import jwt from 'jsonwebtoken';

export const generateToken = (id, role = 'admin') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};
