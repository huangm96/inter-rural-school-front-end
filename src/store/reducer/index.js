import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_SCHOOLS_START,
  GET_SCHOOLS_SUCCESS,
  GET_SCHOOLS_FAILURE, 
  SAVE_ISSUE,
  FETCHING_ISSUES_START,
  FETCHING_ISSUES_SUCCESS,
  FETCHING_ISSUES_FAILURE,
  FETCHING_COMMENTS_START,
  FETCHING_COMMENTS_SUCCESS,
  //FETCHING_COMMENTS_FAILURE,
  SAVING_COMMENTS_START,
SAVING_COMMENTS_SUCCESS,
//SAVING_COMMENTS_FAILURE,
} from "../actions";

export const initialState = {
  isFetching: false,
  isLogined: false,
  loginIsLoading: false,
  registerIsLoading: false,
  getErrorMessageLogin: false,
  getErrorMessageRegister: false,
  userInfo: {},
  issues: [],
  comments: [],
  schools:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        registerIsLoading: true,
        getErrorMessageRegister: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerIsLoading: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        getErrorMessageRegister: true,
      };
    case LOGIN_START:
      return {
        ...state,
        getErrorMessageLogin: false,
        isLogined: false,
        loginIsLoading: true,
      };
    case LOGIN_SUCCESS:
      console.log("user information: ", action.payload);
      return {
        ...state,
        isLogined: true,
        userInfo: {
          admin_id: action.payload.admin_id,
          board_id: action.payload.board_id,
          email: action.payload.email,
          first_name: action.payload.first_name,

          isBoardMember: action.payload.isBoardMember,
          last_name: action.payload.last_name,
          school_id: action.payload.school_id,
        },
        loginIsLoading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        getErrorMessageLogin: true,
      };
    case GET_SCHOOLS_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_SCHOOLS_SUCCESS:
      return {
        ...state,
        isFetching:false,
        schools:action.payload
      };
    case GET_SCHOOLS_FAILURE:
      return {
        ...state,
        isFetching:false
      };
    case SAVE_ISSUE:
      return {
        ...state,
        issues: [...state.issues, action.payload],
      };
    case FETCHING_ISSUES_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_ISSUES_SUCCESS:
      return {
        ...state,
        issues: action.payload,
        isFetching: false
      };
    case FETCHING_COMMENTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        isFetching: false,
      };
    case SAVING_COMMENTS_START:
      return {
        ...state,
      };
    case SAVING_COMMENTS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    default:
      return state;
  }
}

export default rootReducer;
