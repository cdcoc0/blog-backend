let postId = 1; //id의 초깃값

//posts 배열 초기 데이터
const posts = [
    {
        id: 1,
        title: 'title',
        body: 'content'
    },
];

/* 포스트 작성
POST /api/posts
{title, body}
*/
export const write = ctx => {
    //REST API의 Request Body는 ctx.request.body에서 조회 가능
    const {title, body} = ctx.request.body;
    postId += 1; //기존 id값에 1 더함
    const post = {id: postId, title, body};
    posts.push(post);
    ctx.body = post;
};

/* 포스트 목록 조회
GET api/posts
*/
export const list = ctx => {
    ctx.body = posts;
};

/* 특정 포스트 조회
GET api/posts/:id
*/
export const read = ctx => {
    const {id} = ctx.params;
    //주어진 id값으로 포스트를 찾음
    //파라미터로 받아 온 값은 문자열 형식이므로 파라미터를 숫자로 변환하거나
    //비교할 p.id 값을 문자열로 변경해야 함
    const post = posts.find(p => p.id.toString() === id);

    //포스트가 없으면 오류 반환
    if(!post) {
        ctx.status = 404;
        ctx.body = {
            message: 'post not found'
        };
        return;
    }
    ctx.body = post;
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = ctx => {
    const {id} = ctx.params;

    //해당 id를 가진 post가 몇 번째인지 확인
    const index = posts.findIndex(p => p.id.toString() === id);

    //포스트가 없으면 오류 반환
    if(!index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: 'post not found'
        };
        return;
    }
    //index번째 아이템 제거
    posts.splice(index, 1);
    ctx.status = 204; //No Content
};

/* 포스트 수정(교체)
PUT api/posts/:id
{title, body}
*/
export const replace = ctx => {
    //PUT 메서드는 전체 포스트 정보를 입력해 데이터를 통째로 교체할 떄 사용
    const {id} = ctx.params;

    //해당 id를 가진 post가 몇 번째인지 확인
    const index = posts.findIndex(p => p.id.toString() === id);

    //포스트 없으면 오류 반환
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: 'post not found'
        };
        return;
    }

    //전체 객체를 덮어 씌움
    //따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듦
    posts[index] = {
        id,
        ...ctx.request.body
    };
    ctx.body = posts[index];
};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{title, body}
*/
export const update = ctx => {
    //PATCH 메서드는 주어진 필드만 교체
    const {id} = ctx.params;
    
    //해당 id를 가진 post가 몇 번째인지 확인
    const index = posts.findIndex(p => p.id.toString() === id);

    //포스트가 없다면 오류 반환
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: 'post not found'
        };
        return;
    }

    //기존 값에 정보 덮어씀
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    };
    ctx.body = posts[index];
};