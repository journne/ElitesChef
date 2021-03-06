import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Admin from '../models/admin.js';

/**
 * Creates a JSON web token with the given data and a cookie:
 * token: [created token]
 *
 * params:
 *  - user: ID of the user to connect
 *  - res: response obj of middleware function
 */
function generateToken(user, res) {
  const token = jwt.sign(
    user,
    process.env.TOKEN_SECRET,
    { expiresIn: '24h' },
  );
  res.cookie('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
  res.json({ user, token });
}

/**
 * Middleware function for routes that need to authenticate a user
 * verifies the token sent in the Authorization header
 */
export function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userData) => {
      if (err) return res.status(403).json({ error: 'Incorrect token' });
      req.user = userData;
      next();
    });
  } else res.status(401).json({ error: 'No user is logged in' });
}

/**
 * Middleware function for POST /api/auth/register
 * User sign-up, registers user to database
 * JSON body:
 *  - email
 *  - password
 *  - name: user name
 */
export async function registerUser(req, res) {
  if (!req.body.name) res.status(401).json({ error: 'Your name is required' });
  if (!req.body.email || !req.body.password) res.status(401).json({ error: 'Email and password are required' });

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (user) return res.status(400).json({ error: 'Email already exists' });
    const newUser = new User(req.body);

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ error: 'Could not encrypt password' });
        newUser.password = hash;
        newUser.save((err) => {
          if (err) return res.status(400).json({ error: err.message });
          generateToken({ id: newUser.id }, res);
        });
      });
    });
  });
}

export async function registerAdmin(req, res) {
  if (!req.body.email || !req.body.password) res.status(401).json({ error: 'Email and password are required' });

  Admin.findOne({ email: req.body.email }, async (err, admin) => {
    if (err) return res.status(400).json({ error: err });
    if (admin) return res.status(400).json({ error: 'Email already exists' });
    const newAdmin = new Admin({ email: req.body.email });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ error: 'Could not encrypt password' });
        newAdmin.password = hash;
        newAdmin.save((err) => {
          if (err) return res.status(400).json({ error: err.message });
          generateToken({ id: newAdmin.id }, res);
        });
      });
    });
  });
}

/**
 * Middleware function for POST /api/auth/login
 * Logs in a user by creating connection with token and cookie
 *
 * JSON body:
 *  - email
 *  - password
 */
export async function login(req, res) {
  if (!req.body.email || !req.body.password) return res.status(401).json({ error: 'Email and password are required' });

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).json({ error: 'Failed to log in' });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) return res.status(400).json({ error: 'Wrong password' });
        generateToken({ id: user.id }, res);
      });
    } else return res.status(400).json({ error: 'Email not found' });
  });
}

/**
 * Middleware function for GET /api/auth/logout
 * Logs out a user by deleting thcookie with the token
 */
export async function logout(req, res) {
  const token = req.cookies.token;
  // if (!token) return res.status(401).json({ error: 'No user is connected' });

  res.cookie('token', '', { expires: new Date(Date.now()), sameSite: true });
  res.status(200).send('Logged out successfully');
}

export async function adminLogin(req, res) {
  if (!req.body.email || !req.body.password) return res.status(401).json({ error: 'Email and password are required' });

  Admin.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).json({ error: 'Failed to log in' });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) return res.status(400).json({ error: result });
        generateToken({ id: user.id }, res);
      });
    } else return res.status(400).json({ error: 'Email not found' });
  });
}

export function findAdmin(req, res) {
  const adminId = req.params.id;
  Admin.findById(adminId, (err, admin) => {
    if (err) return res.status(404).json({ error: err });
    res.status(200).json({ name: admin.name, email: admin.email });
  });
}

export async function putAdmin(req, res) {
  try {
    // let newBody;
    // if (req.body.name) newBody.name = await req.body.name;
    // if (req.body.email) newBody.email = await req.body.email;
    // if (req.body.password) {
    //   await bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(req.body.password, salt, async (err, hash) => {
    //       if (err) return res.status(400).json({ error: 'Could not encrypt password' });
    //       else newBody.password = await hash;
    //     });
    //   });
    // }
    const updateAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await updateAdmin.save();
    await res.status(200).send({ updateAdmin: updateAdmin });
  } catch (err) {
    res.status(400).send({ error: err });
  }
}
