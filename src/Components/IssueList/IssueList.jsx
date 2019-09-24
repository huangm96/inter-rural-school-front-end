import React from 'react'
import { Row, Col , Button, Icon} from 'antd';
import styled from 'styled-components'

import styles from './IssueList.module.less'

import IssueListItem from './IssueList-Item.component'
/*
const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin : 1rem;
  border: 1px solid #3cc93e;
  background-color: #fff;
`;
*/
/*
      <Icon type="close-circle" />
      <Icon type="clock-circle" />
      <Icon type="check-circle" />
      <Icon type="exclamation-circle" />
      */

export default function IssueList(props) {

  return (
    <div className={styles['issues--container']}>
      <div className={ styles['issues--header']}>
        <Row
        type='flex'
        align='middle'
        justify='space-between'
        style={{width: '100%', padding: '0.5rem 1rem'}}
        >
          <Col xs={14} xl={8} >
          <p style={{ margin: 0}}>{ props.userData.school }</p>
          </Col>
          <Col xs={10} xl={4}>
          <Button className={ styles['issues--header--btn']}>New Issue</Button>
          </Col>
        </Row>
        <Row className={ styles['issues--col-names'] }>
          <Col xl={5}>Date Created</Col>
          <Col xl={6}>Title</Col>
          <Col xl={5}>Status</Col>
          <Col xl={2}>View</Col>
          <Col xl={2}>Delete</Col>
        </Row>      
      </div>

      { props.issueData && props.issueData.map( issue => {
        return (
          <IssueListItem 
              data={ issue}
              key={ issue.id }
              setViewIssue={ props.setViewIssue }
          />
        )
      })}
    </div>
  )
}