const initState = {
  posts: [],
  newPostNumber: 0,
  skip: 0,
  dbPostsLength: 0,
  loading: true,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_POST_BY_TAG":
      const data = action.data;
      if (state.posts.length === 0) {
        return {
          ...state,
          posts: [...state.posts, ...data],
          loading: false,
          dbPostsLength: action.postsLength,
        };
      }
      return {
        ...state,
        posts: [...state.posts, ...data],
        loading: false,
      };
    case "NEXT_PAGE_POST":
      if (state.posts.length === 0 && state.skip < state.dbPostsLength) {
        return {
          ...state,
          skip: state.skip + 10,
          dbPostsLength: action.postsLength,
        };
      } else if (state.skip < state.dbPostsLength) {
        return {
          ...state,
          skip: state.skip + 10,
        };
      }
      return {
        ...state,
        loading: false,
      };
    case "RESET_POST":
      return {
        ...state,
        posts: [],
        skip: 0,
        dbPostsLength: 0,
        newPostNumber: 0,
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.post._id ? action.post : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => action.post._id !== post._id),
      };
    case "COUNT_NEW_POST":
      return {
        ...state,
        newPostNumber: state.newPostNumber + 1,
      }
    case "isLoading":
      return {
        ...state,
        loading: true,
      };
    case "NOT_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default postReducer;
