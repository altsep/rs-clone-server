import { handleGetComment as getComment } from './getComment';
import { handleAddComment as addComment } from './addComment';
import { getComments } from './getComments';
import { handleUpdateComment as updateComment } from './updateComment';
import { handleRemoveComment as removeComment } from './removeComment';

const commentsController = { addComment, getComments, getComment, updateComment, removeComment };

export { commentsController };
