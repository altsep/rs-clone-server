import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError } from '../utils';

const deleteUserHandler: Handler = (req) => {
  const { param } = req.params;
};

app.delete('/api/users/:param', deleteUserHandler);
