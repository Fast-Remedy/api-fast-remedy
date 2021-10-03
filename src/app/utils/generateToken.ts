import jwt from 'jsonwebtoken';

function generateToken(params = {}) {
	const token = jwt.sign(params, `${process.env.SECRET}`, {
		expiresIn: 86400,
	});

	return token;
}

export default generateToken;
