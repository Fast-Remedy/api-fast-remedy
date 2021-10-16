import jwt from 'jsonwebtoken';

function generateToken(params = {}) {
	const token = jwt.sign(params, `${process.env.SECRET}`);

	return token;
}

export default generateToken;
