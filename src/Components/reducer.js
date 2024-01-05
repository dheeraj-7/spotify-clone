export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    playing: false,
    item: null,
    token: 'BQDo4G9S9yexA4j4A4xqf0yVrJ8mmqIgokCf_5Ecqkk-NQCMYi…DaDq6igEUMZL64xCVzS8FKf-cVOiXrDVQVPCzwaY9NPN75Clc',
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token,
            };
            case "SET_PLAYLISTS":
                return {
                  ...state,
                  playlists: action.playlists,
                };
        default:
            return state;
    }
};

export default reducer;