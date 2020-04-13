import React   from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { updateForm } from "../../store/actions";
import moment from "moment"

import { formatDate } from '../../utils/utils'

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
  // destructuring user data
  let { 
    first_name ,
    last_name,
    school,
    isBoardMember,
  } = props.userData;

  // destructuring user issue data
  let {
    id,
    status,
    issue_title,
    issue_description,
    date
  } = props.issue;

  let userName = ( first_name && last_name)? `${first_name.replace(/^[a-z]/, match=> match.toUpperCase())} ${last_name.replace(/^[a-z]/, match=> match.toUpperCase())}`: '';
  // inital values for new issues
  let InitNewIssue ={
    // create random number new issues
      id: Math.floor(Math.random()*10000),
      status: 'Needs Attention',
      createdBy: userName,
      description:  '',
      title:  '',
  } 
 
  //initial values for existing issues 
  let InitEdit = {
        id: id,
        status : status,
        createdBy: userName,
        date: moment(date).format('L'),
        description:  issue_description,
        title:  issue_title
  }

  let initObject = ( issueType === 'edit' ) ? InitEdit : InitNewIssue;

  // console.log( 'single-issue props.issue: ', props.issue);
  // console.log( 'single-issue props.userData: ',props.userData);
  // console.log('issueType prop of singleIssue:', props.issueType);

  return (
    // hide the single issue view on mobile until user clicks view or edit button
    <div 
      className={styles["singleIssue--container"]}
      style={ showSingle }
      >
      <div className={styles["singleIssue--header"]}>
        {showForm && props.issueType === 'edit' && <p>ID: {props.issue.id}</p>}
        {showForm && props.issueType === 'createnew' && <p>Create New Issue</p>}
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
          initialValues={{ ...initObject, props}}

          onSubmit={(values, { resetForm, setSubmitting  }) => {
            resetForm();
          }}

          validationSchema={yup.object().shape({
            title: yup.string().required("Please provide a title"),
            description: yup.string().required("Please provide decription")
          })}

          render={props => (
            <SingleIssueForm
              {...props}
              isBM={isBoardMember}
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
    getErrorMessage: state.getErrorMessage
  };
};

export default connect(
  mapStateToProps,
  { updateForm }
)(SingleIssue);
