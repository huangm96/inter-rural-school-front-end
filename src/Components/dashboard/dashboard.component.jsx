import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../layout/layout.component';
import { connect } from 'react-redux';
import styles from './dashboard.module.less';
import axios from "axios";
import DashBoardMenu from '../dashboard-menu/dashboard-menu.component';
import SingleIssue from '../single-issue/single-issue.component';
import IssueList from '../IssueList/IssueList';
import { GetWindowSize } from '../../utils/window_size_hook'
import { getIssueList, getCommentList } from "../../store/actions";

function Dashboard(props) {
  const [currentIssue, setCurrentIssue ] = useState({})
  const [ issueType, setIssueType ] = useState('clear');
  const [query, setQuery] = useState('');
  // const [issuesList, setIssuesList] = useState([]);
  const [newIssues, setNewIssues] = useState({});

  // interactions with Redux Store
  
  const { getCommentList,getIssueList,issuesList } = props

  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getIssueList()
    }
  }, [newIssues]);
// fetch data from Redux Store
  useEffect(() => {
    
      getCommentList();
    
  }, []);

  function Set_IssueType( type ){
    /*
    clear : shows message
    edit: shows issue user clicked on
    createnew: blank form for creating  a new issue
    */
   console.log('setIssueType called');
    setIssueType( type )
  }

  function findIssue( id ){
    // return the issue object from the list of issues with an id attribute that matches 'id'
    return issuesList.reduce( ( match , issue) => {
        return issue.id === id ? match = issue : match;
    }, {})
  }

  function setIssue( id ){
    // a callback function to be passed down to buttons
    let result = findIssue(id);
    setCurrentIssue(  result );
    Set_IssueType('edit')
  }

  // used to show or hide IssueList and SingleIssue
  let windowSize = GetWindowSize()

  // console.log('issues in Redux state: ',props.issues);
  // console.log('Comments in Redux state: ',props.comments);
// console.log('User Info:', props.userInfo );
// console.log('currentIssue',currentIssue);
// console.log( 'issueType :', issueType);

  return (
    <LayoutWrapper>
      <div className={styles.contentContainer}>
        <DashBoardMenu setQuery={setQuery} />
        <div className={styles.issueContainer}>
          <IssueList
            Set_IssueType={Set_IssueType}
            winWidth={ windowSize[0]}
            issueType={issueType}
            setIssue={setIssue}
            userData={props.userInfo}
            issueData={issuesList}
            query={query}
            updateIssues={setNewIssues}
          />
          <SingleIssue
            userData={props.userInfo}
            issue={currentIssue}
            winWidth={ windowSize[0]}
            issueType={issueType}
            Set_IssueType={Set_IssueType}
            updateIssues={setNewIssues}
          />
        </div>
      </div>
    </LayoutWrapper>
  );
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    userInfo: state.userInfo,
    comments: state.comments,
    isFetching: state.isFetching,
    issuesList: state.issues,
  };
};
export default connect(
  mapStateToProps,
  {   getCommentList,getIssueList }
)(Dashboard);
