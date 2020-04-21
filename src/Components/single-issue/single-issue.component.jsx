import React, {  useEffect } from "react";
import { Formik } from 'formik'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { updateForm,getCommentById } from "../../store/actions";

import SingleIssueForm from './singleissue-form.component'

import styles from './single-issue.module.less'


function SingleIssue( props ) {
//console.log("singleIssue component:", props)
  let issueType = props.issueType;
  let showForm = ( issueType === 'clear')? false : true;
  //storing function in variable so that it can be passed to SingleIssueForm 
  const SIT = props.Set_IssueType; 
  const updateIssues = props.updateIssues;
  let showSingle = (props.winWidth >= 1200 || props.issueType !== 'clear')? { display: 'flex' } : { display : 'none'} ;

  // destructuring user issue data
  let {
    id,
    status,
    issue_title,
    issue_description,
    date,
    createdBy,
    school_name,
    comment_id,
    location,
  } = props.currentissue;

  // inital values for new issues
  let InitNewIssue = {
    id: null,
    status: "Needs Attention",
    createdBy: localStorage.getItem("userName"),
    description: "",
    date: new Date(),
    title: "",
    school_id: localStorage.getItem("school_id"),
    comment_id: "",
    BMcomment:""
  }; 
 
  //initial values for existing issues 
  let InitEdit = {
    id: id,
    status: status,
    createdBy: createdBy,
    date: date,
    issue_description: issue_description,
    issue_title: issue_title,
    school_id: localStorage.getItem("school_id"),
    comment_id: comment_id,
    BMcomment:props.BMcomment.comment
  };

  

  // console.log( 'single-issue props.issue: ', props.issue);
  // console.log('issueType prop of singleIssue:', props.issueType);
  useEffect(() => {
    
      props.getCommentById(comment_id);
   
  }, [props.currentissue.comment_id]);
  
  let initObject = ( issueType === 'edit' ) ? InitEdit : InitNewIssue;
  return (
    // hide the single issue view on mobile until user clicks view or edit button
    <div className={styles["singleIssue--container"]} style={showSingle}>
      <div className={styles["singleIssue--header"]}>
        {showForm && props.issueType === "edit" && (
          <div>
            <span> ID: {id}</span>
            <span style={{ marginLeft: 50 }}>
              School: {school_name} Location: {location}
            </span>
          </div>
        )}
        {showForm && props.issueType === "createnew" && (
          <span> Create New Issue School</span>
        )}
        {/* Message which shows when page first renders, user click 'close',  
    or submits the form, or deletes an issue */}
        {!showForm && (
          <p style={{ width: "100%" }}>
            Please select an issue from the list or create a new issue.
          </p>
        )}
      </div>

      {showForm && (
        <Formik
          enableReinitialize
          initialValues={{ ...initObject, props }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            resetForm();
          }}
          validationSchema={yup.object().shape({
            issue_title: yup.string().required("Please provide a title"),
            issue_description: yup
              .string()
              .required("Please provide decription"),
          })}
          render={(props) => (
            <SingleIssueForm
              {...props}
              issueType={issueType}
              Set_IssueType={SIT}
              updateIssues={updateIssues}
            />
          )}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    getErrorMessage: state.getErrorMessage,
    BMcomment: state.comments,
    commentsList :state.commentsList
  };
};

export default connect(
  mapStateToProps,
  { updateForm,getCommentById }
)(SingleIssue);
