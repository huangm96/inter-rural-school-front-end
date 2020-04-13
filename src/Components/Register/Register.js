import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Select } from "antd";
import { getSchools } from "../../store/actions";

const Container = styled.div`
  background-color: #c5dcd9;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InnerDiv = styled.div`
  height: 70vh;
  flex-basis: 40vw;
  background-color: white;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 10px 10px 0;
  @media (max-width: 1200px) {
    flex-basis: 100%;
    height: 100%;
    background-color: #c5dcd9;
  }
`;

const Image = styled.img`
  max-width: 100%;
  display: block;
  height: 70vh;
  width: 38.2%;
  border-radius: 10px 0 0 10px;
  object-fit: cover;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const BlueBtn = styled(Button)`
  background-color: #6fa0d0;
  border-radius: 10px;
  color: #fff;
  border: 2px solid #6fa0d0 !important;
  transition: background-color 0.5s;
  font-family: "Open Sans", sans-serif;

  &:hover {
    background-color: #fff;
    color: #6fa0d0;
  }

  &:focus {
    background-color: #fff;
    color: #6fa0d0;
  }
  @media (max-width: 1200px) {
    margin: 15px 0;
  }
`;
const { Option } = Select;

const Register = (props) => {
  const { schools, getSchools } = props;
  const [isBoardMember, setIsBoardMember] = useState(null);
  const [schoolid, setSchoolID] = useState(0);
  const [showButton, setShowButton]=useState(false)
  useEffect(() => {
    getSchools();
    if (isBoardMember === true) {
      setShowButton(true)
    } else if (isBoardMember === false && schoolid !== 0) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [getSchools,isBoardMember,schoolid]);
  return (
    <Container>
      <Image src="/images/rsz_school.jpg" alt="School" />
      <InnerDiv>
        {/* select user type */}
        <Select
          style={{ width: "80%" }}
          showSearch
          placeholder="Select your user type"
          onChange={(value) => {
            if (value === "Board Member") {
              setIsBoardMember(true);
              setSchoolID(0);
            } else {
              setIsBoardMember(false);
            }
          }}
        >
          <Option value="Board Member">Board Member</Option>
          <Option value="School Staff">School Staff</Option>
        </Select>
        {/* select school */}
        {isBoardMember === null || isBoardMember === true ? null : (
          <Select
            style={{ width: "80%", marginTop: "20px" }}
            showSearch
            placeholder="Select your school"
            onChange={(value) => {
              setSchoolID(value);
            }}
          >
            {schools.map((s) => {
              return (
                <Option key={s.id} value={s.id}>
                  {s.school_name}
                </Option>
              );
            })}
            <Option value="School Staff">Add School</Option>
          </Select>
        )}
        {
          showButton?(<div style={{ marginTop: "20px" }}>
          <Link
            to={{
              pathname: "/new_user/personalInfo",
              state: {
                school_id: schoolid,
                isBoardMember: isBoardMember,
              },
            }}
          >
            <BlueBtn htmlType="submit">Next</BlueBtn>
          </Link>
        </div>):null
}
        
        <div style={{ display: "flex", justifyContent: "center",marginTop:10 }}>
          <p>Already registered? </p>
          <Link to="/login">
            <span style={{ margin: "0 5px" }}>Login here!</span>{" "}
          </Link>
        </div>
      </InnerDiv>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { schools: state.schools };
};
export default connect(mapStateToProps, { getSchools })(Register);
