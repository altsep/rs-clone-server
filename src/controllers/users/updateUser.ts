import { Handler } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { updateUser } from '../../services/user/updateUser';
import { User } from '../../types';
import { handleError } from '../../utils';

export const handleUpdateUser: Handler = (req, res, next) => {
  const { refreshToken } = req.cookies as { refreshToken?: string };

  if (!refreshToken) {
    throw new Error('Unauthorized');
  }

  const allData = matchedData(req);
  const errors = validationResult(req);
  const { id } = req.params;

  if (Object.hasOwn(allData, 'password') || !errors.isEmpty() || /\D/.test(id)) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const data = req.body as Partial<User>;

  updateUser(Number(id), data, refreshToken)
    .then((userData) => res.send(userData))
    .catch((e) => next(e));
};
