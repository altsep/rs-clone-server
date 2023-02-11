import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { updatePendingFriendsIds } from '../../../services/user/updatePendingFriendsIds';
import { updateUser } from '../../../services/user/updateUser';
import { User } from '../../../types';
import { handleError } from '../../../utils';

export const handleUpdateUser: Handler = (req, res, next) => {
  const { refreshToken } = req.cookies as { refreshToken?: string };

  if (!refreshToken) {
    throw new Error('Unauthorized');
  }

  const errors = validationResult(req);
  const { id } = req.params;

  if (id == null || !errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const data = req.body as Partial<User>;

  if (Object.hasOwn(data, 'pendingFriendsIds') && Object.keys(data).length === 1) {
    updatePendingFriendsIds(id, data)
      .then((userData) => res.send(userData))
      .catch((e) => next(e));
  } else {
    updateUser(id, data, refreshToken)
      .then((userData) => res.send(userData))
      .catch((e) => next(e));
  }
};
