const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res
        .status(401)
        .json({ msg: 'Không có token xác thực, Từ chối truy cập' });
    }

    const verified = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verified) {
      return res
        .status(401)
        .json({ msg: 'Token xác thực không thành công, Từ chối truy cập' });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
