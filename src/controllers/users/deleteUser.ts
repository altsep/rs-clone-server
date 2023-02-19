import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { deleteUser } from '../../services/user/deleteUser';
import { User } from '../../types';
import { handleError } from '../../utils';

export const handleDeleteUser: Handler = (req, res, next) => {
  const { refreshToken } = req.cookies as { refreshToken?: string };

  if (!refreshToken) {
    throw new Error('Unauthorized');
  }

  const errors = validationResult(req);
  const { id } = req.params;
  const { password } = req.body as Pick<User, 'password'>;

  if (/\D/.test(id) || !errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  deleteUser(Number(id), password, refreshToken)
    .then(() => res.end())
    .catch(next);
};
