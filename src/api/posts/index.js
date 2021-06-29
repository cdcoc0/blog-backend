import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.update)

// posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read);
// posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove);
// posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update);
// posts.put('/:id', postsCtrl.replace);

posts.use('/:id', postsCtrl.checkObjectId, post.routes());


export default posts;

// const printInfo = ctx => {
//     ctx.body = {
//         method: ctx.method,
//         path: ctx.path,
//         params: ctx.params
//     };
// };