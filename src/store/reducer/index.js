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
  SAVING_SCHOOLS_START,
  SAVING_SCHOOLS_SUCCESS,
  SAVING_SCHOOLS_FAILURE,
  SAVE_ISSUE,
  FETCHING_ALLISSUES_START,
  FETCHING_ALLISSUES_SUCCESS,
  FETCHING_ALLISSUES_FAILURE,
  FETCHING_ISSUESBYSCHOOLID_START,
  FETCHING_ISSUESBYSCHOOLID_SUCCESS,
  FETCHING_ISSUESBYSCHOOLID_FAILURE,
  FETCHING_COMMENTBYID_START,
  FETCHING_COMMENTBYID_SUCCESS,
  FETCHING_COMMENTBYID_FAILURE,
  SAVING_COMMENTS_START,
  SAVING_COMMENTS_SUCCESS,
  FETCHING_COMMENTS_START,
  FETCHING_COMMENTS_SUCCESS,
  FETCHING_COMMENTS_FAILURE,
  UPDATING_COMMENTS_START,
  UPDATING_COMMENTS_SUCCESS,
  UPDATING_COMMENTS_FAILURE,
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
  comments: {},
  commentsList: [],
  schools: [],
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
        isFetching: false,
        schools: action.payload,
      };
    case GET_SCHOOLS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case SAVING_SCHOOLS_START:
      return {
        ...state,
        isFetching: true,
      };
    case SAVING_SCHOOLS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        schools: [...state.schools,action.payload],
      };
    case SAVING_SCHOOLS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case SAVE_ISSUE:
      return {
        ...state,
        issues: [...state.issues, action.payload],
      };
    case FETCHING_ALLISSUES_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_ALLISSUES_SUCCESS:
      return {
        ...state,
        issues: action.payload,
        isFetching: false,
      };
    case FETCHING_ALLISSUES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case FETCHING_ISSUESBYSCHOOLID_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_ISSUESBYSCHOOLID_SUCCESS:
      return {
        ...state,
        issues: action.payload,
        isFetching: false,
      };
    case FETCHING_ISSUESBYSCHOOLID_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case FETCHING_COMMENTBYID_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_COMMENTBYID_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        isFetching: false,
      };
    case FETCHING_COMMENTBYID_FAILURE:
      return {
        ...state,
        isFetching: false,
        comments: {},
      };
    case SAVING_COMMENTS_START:
      return {
        ...state,
      };
    case SAVING_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          id: action.payload.id,
          comment: action.payload.data.comment,
          board_id: action.payload.data.board_id,
          issue_id: action.payload.data.issue_id,
        },
      };
    case FETCHING_COMMENTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsList: action.payload,
        isFetching: false,
      };
    case FETCHING_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case UPDATING_COMMENTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATING_COMMENTS_SUCCESS:
      console.log(action.payload);
      state.comments.comment = action.payload.data.comment;
      state.comments.board_id = action.payload.data.board_id;

      return {
        ...state,
        isFetching: false,
      };
    case UPDATING_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default rootReducer;
