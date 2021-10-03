import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: 'Token não informado' });
	}

	const parts = authHeader.split(' ');

	// @ts-ignore
	if (!parts.length === 2) {
		return res.status(401).json({ message: 'Token error' });
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({ message: 'Token mal formatado' });
	}

	jwt.verify(token, `${process.env.SECRET}`, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Token invalido' });
		}

		req.id = decoded.id;
		req.email = decoded.email;
		return next();
	});
}
