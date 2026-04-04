const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

try {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("admin", salt);
  console.log("Bcrypt works! Hash:", hash);
  const match = bcrypt.compareSync("admin", hash);
  console.log("Bcrypt compare works:", match);

  const token = jwt.sign({ userId: 'test' }, 'secret', { expiresIn: '1h' });
  console.log("JWT works! Token:", token);
} catch (err) {
  console.error("Test failed:", err);
}
