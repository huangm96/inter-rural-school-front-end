import { axiosWithAuth } from "../../utils/axiosWithAuth";
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const getRegister = (info, props) => dispatch => {
  console.log(info);
  dispatch({ type: REGISTER_START });
  axiosWithAuth()
    .post("/auth/register", info)
    .then(res => {
      // console.log("Register action: ",res);
      dispatch({ type: REGISTER_SUCCESS });
      props.history.push("/login");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE });
    });
};

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const getLogin = (info, props) => dispatch => {
  //console.log(info);
  dispatch({ type: LOGIN_START });
  axiosWithAuth()
    .post("/auth/login", info)
    .then(res => {
      // console.log("Login action: ",res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
      localStorage.setItem("token", res.data.token);
      if (res.data.user.isBoardMember) {
        localStorage.setItem("userType", "Board Member");
        localStorage.setItem("board_id", res.data.user.id);
      } else {
        localStorage.setItem("userType", "School Staff");
        localStorage.setItem("school_id", res.data.user.school_id);
        
      }
      localStorage.setItem(
          "userName",
          `${res.data.user.first_name} ${res.data.user.last_name}`
        );
      props.history.push("/dashboard");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_FAILURE });
    });
};
export const GET_SCHOOLS_START = "GET_SCHOOLS_START";
export const GET_SCHOOLS_SUCCESS = "GET_SCHOOLS_SUCCESS";
export const GET_SCHOOLS_FAILURE = "GET_SCHOOLS_FAILURE";

export const getSchools = () => (dispatch) => {
  dispatch({ type: GET_SCHOOLS_START });
  axiosWithAuth()
    .get("/schools")
    .then((res) => {
      dispatch({ type: GET_SCHOOLS_SUCCESS, payload: res.data });
      
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_SCHOOLS_FAILURE });
    });
};
export const SAVING_SCHOOLS_START = "SAVING_SCHOOLS_START";
export const SAVING_SCHOOLS_SUCCESS = "SAVING_SCHOOLS_SUCCESS";
export const SAVING_SCHOOLS_FAILURE = "SAVING_SCHOOLS_FAILURE";

export const savingSchools = (info) => (dispatch) => {
  dispatch({ type: SAVING_SCHOOLS_START });
  console.log(info)
  axiosWithAuth()
    .post("/schools",info)
    .then((res) => {
      dispatch({ type: SAVING_SCHOOLS_SUCCESS, payload: res.data });
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SAVING_SCHOOLS_FAILURE });
    });
};
export const SAVE_ISSUE = "SAVE_ISSUE";

export const saveIssue = (info, props) => dispatch => {
  
  // console.log("save issue: ", info);
  
  axiosWithAuth()
    .post("/issues/", info)
    .then((res) => {
      // console.log("save issue action: ", res);
      props.updateIssues(info);
  
    })
    .catch((err) => {
      console.log(err);
    });
};

export const FETCHING_ALLISSUES_START = "FETCHING_ALLISSUES_START";
export const FETCHING_ALLISSUES_SUCCESS = "FETCHING_ALLISSUES_SUCCESS";
export const FETCHING_ALLISSUES_FAILURE = "FETCHING_ALLISSUES_FAILURE";

export const getAllIssueList = () => dispatch => {
  dispatch({ type: FETCHING_ALLISSUES_START });
  axiosWithAuth()
    .get("/issues")
    .then((res) => {
      dispatch({ type: FETCHING_ALLISSUES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCHING_ALLISSUES_FAILURE });
    });
};

export const FETCHING_ISSUESBYSCHOOLID_START =
         "FETCHING_ISSUESBYSCHOOLID_START";
export const FETCHING_ISSUESBYSCHOOLID_SUCCESS =
         "FETCHING_ISSUESBYSCHOOLID_SUCCESS";
export const FETCHING_ISSUESBYSCHOOLID_FAILURE =
         "FETCHING_ISSUESBYSCHOOLID_FAILURE";

export const getIssuesBySchoolId = (id) => (dispatch) => {
  dispatch({ type: FETCHING_ISSUESBYSCHOOLID_START });
  axiosWithAuth()
    .get(`/issues/school/${id}`)
    .then((res) => {
      dispatch({ type: FETCHING_ISSUESBYSCHOOLID_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCHING_ISSUESBYSCHOOLID_FAILURE });
    });
};
export const FETCHING_COMMENTS_START = "FETCHING_COMMENTS_START";
export const FETCHING_COMMENTS_SUCCESS = "FETCHING_COMMENTS_SUCCESS";
export const FETCHING_COMMENTS_FAILURE = "FETCHING_COMMENTS_FAILURE";

export const getCommentList = () => (dispatch) => {
  dispatch({ type: FETCHING_COMMENTS_START });
axiosWithAuth()
  .get("/comments/")
  .then((res) => {
    // console.log("comments  from server :", res);
      dispatch({ type: FETCHING_COMMENTS_SUCCESS, payload: res.data });
  })
  .catch((err) => {
    console.log(err);
      dispatch({ type: FETCHING_COMMENTS_FAILURE });

  });
};
export const FETCHING_COMMENTBYID_START = "FETCHING_COMMENTBYID_START";
export const FETCHING_COMMENTBYID_SUCCESS = "FETCHING_COMMENTBYID_SUCCESS";
export const FETCHING_COMMENTBYID_FAILURE = "FETCHING_COMMENTBYID_FAILURE";

export const getCommentById = (id) => dispatch => {
  dispatch({ type: FETCHING_COMMENTBYID_START });
  axiosWithAuth()
    .get(`/comments/${id}`)
    .then((res) => {
      // console.log("comments  from server :", res);

      dispatch({ type: FETCHING_COMMENTBYID_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCHING_COMMENTBYID_FAILURE });
    });
};



export const updateForm = (id, data, props) => dispatch => {

    axiosWithAuth()
      .put(`/issues/${id}`, data)
      .then((res) => {
        // console.log("updateform :", res);
        props.updateIssues(data);
      })
      .catch((err) => {
        console.log(err);
      });
};

export const deleteIssue = (id, props) => dispatch => {
    axiosWithAuth()
      .delete(`/issues/${id}`)
      .then((res) => {
        // console.log("Delete Issue action: ",res);
        props.updateIssues({ id });

      })
      .catch((err) => {
        console.log(err);
      });
};


export const SAVING_COMMENTS_START = "SAVING_COMMENTS_START";
export const SAVING_COMMENTS_SUCCESS = "SAVING_COMMENTS_SUCCESS";
export const SAVING_COMMENTS_FAILURE = "SAVING_COMMENTS_FAILURE";

export const saveComment = (data) => dispatch => {
  dispatch({ type: SAVING_COMMENTS_START });
  axiosWithAuth()
    .post("/comments/", data)
    .then((res) => {
      // console.log("comments saving action :", res);

      dispatch({ type: SAVING_COMMENTS_SUCCESS, payload: {id:res.data,data:data} });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const UPDATING_COMMENTS_START = "UPDATING_COMMENTS_START";
export const UPDATING_COMMENTS_SUCCESS = "UPDATING_COMMENTS_SUCCESS";
export const UPDATING_COMMENTS_FAILURE = "UPDATING_COMMENTS_FAILURE";

export const updatingComment = (id,data) => (dispatch) => {
  // console.log("comments updating from server :", data);
    dispatch({ type: UPDATING_COMMENTS_START });

  axiosWithAuth()
    .put(`/comments/${id}`, data)
    .then((res) => {
      // console.log("comments updating action :", res);
      dispatch({ type: UPDATING_COMMENTS_SUCCESS, payload: {id,data} });

    })
    .catch((err) => {
      console.log(err);
       dispatch({ type: UPDATING_COMMENTS_FAILURE });
    });
};

