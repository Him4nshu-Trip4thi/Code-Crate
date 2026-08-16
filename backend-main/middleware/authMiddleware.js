const jwt = require('jsonwebtoken');

function getJwtSecret(){
  return process.env.JWT_SECRET_KEY || 'dev_jwt_secret';
}

function verifyAuth(req, res, next){
  try{
    const token = (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if(!token) return res.status(401).json({ message: 'Unauthorized' });
    const payload = jwt.verify(token, getJwtSecret());
    req.user = payload;
    next();
  }catch(err){
    console.error('Auth error', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { verifyAuth };
