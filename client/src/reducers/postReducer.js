export const postReducer = (state, action) => {
    const {type, payload} = action
    switch(type) {
        case 'POST_LOADED_SUCCESS':
        return {
            ...state,
            posts: payload,
            postLoading: false
        }
        case 'POST_LOADED_FAILED':
        return {
            ...state,
            posts: [],
            postLoading: false
        }
        case 'ADD_POST':
        return {
            ...state,
            posts: [...state.posts, payload]
        }
        case 'DELETE_POST':
        return {
            ...state,
            posts: state.posts.filter(post => post._id !== payload)
        }
        case 'FIND_POST':
        return {
            ...state,
            post: payload
        }
        case 'UPDATE_POST':
            const newPostsAfterUpdate = state.posts.map(post => post._id === payload._id ? payload : post);
        return {
            ... state,
            posts: newPostsAfterUpdate
        }
        default: 
        return state;
    }
}