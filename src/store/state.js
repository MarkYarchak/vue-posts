import post from '../data/posts';

const posts = post;

export default {
  posts,
  answerOrComment: {
    inpAction: 'Write your comment',
    commentText: '',
    username: '',
    postId: null,
    commentId: null,
    answerId: null,
  },
  inputAction: {
    createCom: true,
    editCom: false,
    createAns: false,
    editAns: false,
    answerAns: false,
  },
  user: {
    displayName: 'Mark Yarchak',
    username: 'markyarchak',
    avatar: 'https://dogzone-tcwebsites.netdna-ssl.com/wp-content/uploads/2018/06/funny-dog-quotes-2.jpg',
    id: 777,
  },
  // onepost: {},
};

