import React from 'react'
import { Row, Col  } from 'antd';
import { connect } from 'react-redux';
import styles from './IssueList.module.less'

import IssueListItem from './IssueList-Item.component'


function IssueList(props) {

  let showIssues = (props.winWidth >= 1200 || props.issueType === 'clear')? { display: 'flex' } : { display : 'none'} ;
    let isBM = false;
    if (localStorage.getItem("userType") === "Board Member") {
      isBM = true;
    }
  return (
    <div className={styles["issues--container"]} style={showIssues}>
      <div className={styles["issues--header"]}>
        {isBM ? (
          <p style={{ margin: 0 }}>
            Board Member: {localStorage.getItem("userName")}
          </p>
        ) : (
          <p style={{ margin: 0 }}>
            School Staff: {localStorage.getItem("userName")}
          </p>
        )}

        {!isBM && (
          <button
            onClick={() => props.Set_IssueType("createnew")}
            className={styles["issues--header--btn"]}
          >
            New Issue
          </button>
        )}
      </div>
      <Row className={styles["issues--col-names"]}>
        <Col xl={4} >
          Date Created
        </Col>
        <Col xl={6} >
          Title
        </Col>
        <Col xl={5}>
          Status
        </Col>
        <Col xl={2}>View</Col>
        {!isBM && <Col xl={2}>Delete</Col>}
      </Row>

      {props.issueList &&
        props.issueList
          .filter((issue) => issue.status.includes(props.query))
          .map((issue) => {
            return (
              <IssueListItem
                {...props}
                data={issue}
                key={issue.id}
                setIssue={props.setIssue}
                Set_IssueType={props.Set_IssueType}
              />
            );
          })}
    </div>
  );
}
const mapStateToProps = state => {
  
  return {
    issueList: state.issues,
  };
};

export default connect(
  mapStateToProps,
  {  }
)(IssueList);
