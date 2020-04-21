import React from "react";
import { Row, Col, Input } from "antd";
import { Form, Field, ErrorMessage } from "formik";
import {
  updateForm,
  saveIssue,
  deleteIssue,
  saveComment,
  updatingComment,
} from "../../store/actions";
import { connect } from "react-redux";
import styles from "./singleissue-form.module.less";
import { showDeleteConfirm } from "../../utils/utils";
import { differenceInCalendarDays } from "date-fns";
import moment from "moment";

function Stat({ label, data }) {
  return (
    <div className={styles.statRow}>
      <p>{label}</p>
      <p>{data}</p>
    </div>
  );
}

function SingleIssueForm(props) {
  // console.log("SingleIssueForm props", props);
  let { values, handleChange } = props;
  let {
    id,
    createdBy,
    issue_title,
    date,
    issue_description,
    status,
    comment_id,
  } = props.values;

  let isBM = false;
  if (localStorage.getItem("userType") === "Board Member") {
    isBM = true;
  }

  
  return (
    <Form className={styles["singleIssue-form"]}>
      <Row className={styles["form--body-container"]}>
        <Col xs={24} xl={8} className={styles["form--stats"]}>
          {/*issue status for Boardmember */}
          {isBM && (
            <>
              <label
                htmlFor="status"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Status:
              </label>
              <Field
                name="status"
                render={(props) => (
                  <BMSelectStatus {...props} placeholder={status} />
                )}
              />
            </>
          )}

          {/* issue status for SS */}
          {!isBM && <Stat label="Status: " data={status} />}

          {/* issue 'created by'  */}
          <Stat label="Created By: " data={createdBy} />

          {/* issue 'date created'  */}
          <Stat label="Date Created:" data={moment(date).format("L")} />

          {/* issue 'days passed'  */}
          <Stat
            label="Days Passed:"
            data={differenceInCalendarDays(new Date(), new Date(date))}
          />
        </Col>
        <Col xs={24} xl={16} className={styles["form--body"]}>
          {/*issue title for BM */}
          {isBM && <Stat label="Title: " data={issue_title} />}

          {/*issue description for BM */}
          {isBM && <Stat label="Description: " data={issue_description} />}

          {/*issue comment for BM */}

          {isBM  && (
            <div className={styles.bmCommentDiv}>
              <label
                htmlFor="BMcomment"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Board Comment:{" "}
              </label>
              <Input.TextArea
                id="BMcomment"
                name="BMcomment"
                placeholder={"Board Member Comment"}
                onChange={handleChange}
                value={values.BMcomment}
                autoSize={{
                  minRows: 2,
                  maxRows: 2,
                }}
              />
              <ErrorMessage component="p" name="BMcomment" />
            </div>
          )}
          {/* issue title for SS */}
          {!isBM && (
            <div className={styles.bmCommentDiv}>
              <label
                htmlFor="issue_title"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Title:{" "}
              </label>
              <Input
                placeholder={"issue title"}
                onChange={handleChange}
                value={values.issue_title}
                id="issue_title"
                name="issue_title"
              />
              <ErrorMessage component="p" name="title" />
            </div>
          )}

          {/* issue description for SS */}
          {!isBM && (
            <div className={styles.bmCommentDiv}>
              <label
                htmlFor="description"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Description:{" "}
              </label>
              <Input.TextArea
                name="issue_description"
                placeholder={"issue description"}
                onChange={handleChange}
                value={values.issue_description}
                autoSize={{
                  minRows: 4,
                  maxRows: 4,
                }}
              />
              <ErrorMessage component="p" name="issue_description" />
            </div>
          )}
          {/* issue comment for SS */}
          {!isBM && <Stat label="Comment: " data={values.bmComment} />}
          {/* {(!isBM && currentIssue.boardComment) &&<Stat label='Board Comment: ' data={ currentIssue.boardComment }/> } */}
        </Col>
      </Row>
      <div className={styles["singleIssue--footer"]}>
        {!isBM && props.issueType === "edit" && (
          <button
            onClick={() => {
              showDeleteConfirm(id, props, issue_title, props.Set_IssueType);
            }}
          >
            Delete
          </button>
        )}

        <button type="button" onClick={() => props.Set_IssueType("clear")}>
          Close
        </button>

        {/* submit button for SS- updating the issue_title and issue_description*/}

        {!isBM && props.issueType === "edit" && (
          <button
            type="submit"
            onClick={() => {
              const issueInfo = {
                id: id,
                issue_title: issue_title,
                issue_description: issue_description,
                status: status,
              };
              // console.log("submit button update", props.values);
              // console.log("update form", issueInfo);
              props.updateForm(id, issueInfo, props);
              props.Set_IssueType("clear");
            }}
          >
            Submit
          </button>
        )}

        {/* submit button for BM- updating the issue_status and comment*/}

        {isBM && (
          <button
            type="submit"
            onClick={() => {
              const issueInfo = {
                id: id,
                status: status,
              };

              props.updateForm(id, issueInfo, props);
              if (comment_id) {
                props.updatingComment(comment_id, {
                  comment: values.BMcomment,
                  board_id: localStorage.getItem("board_id"),
                });
              } else {
                props.saveComment({
                  comment: values.BMcomment,
                  issue_id: id,
                  board_id: localStorage.getItem("board_id"),
                });
              }
              props.Set_IssueType("clear");
            }}
          >
            Submit
          </button>
        )}

        {props.issueType === "createnew" && (
          <button
            type="submit"
            onClick={() => {
              const issueInfo = {
                issue_title: issue_title,
                issue_description: issue_description,
                status: status,
                school_id: localStorage.getItem("school_id"),
                createdBy: localStorage.getItem("userName"),
              };
              // console.log("submit button", props.values);
              props.saveIssue(issueInfo, props);
              props.Set_IssueType("clear");
            }}
          >
            Create
          </button>
        )}
      </div>
    </Form>
  );
} // end SingleIssueForm

function BMSelectStatus({ field, form, ...props }) {
  return (
    <select
      {...field}
      {...props}
      style={{ width: "100%", paddingLeft: "1rem" }}
    >
      <option value="Needs Attention">Needs Attention</option>
      <option value="Resolution In Progress">In Progress</option>
      <option value="Resolved">Resolved</option>
      <option value="Dismissed">Dismissed</option>
    </select>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    getErrorMessage: state.getErrorMessage,
  };
};

export default connect(mapStateToProps, {
  updateForm,
  saveIssue,
  deleteIssue,
  saveComment,
  updatingComment,
})(SingleIssueForm);
