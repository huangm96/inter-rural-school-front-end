import React from "react";
import { Button, Input, Icon,  Form } from "antd";
import styled from "styled-components";
import { withFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { savingSchools} from '../../store/actions'

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
`;

const InnerDiv = styled.div`
  position: absolute;
  padding: 50px;
  top: 50%;
  left: 50%;
  font-size: 50px;
  background-color: white;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;



const Btn = styled(Button)`

  border-radius: 10px;
  color: #fff;
  transition: background-color 0.5s;
  font-family: "Open Sans", sans-serif;
  margin: 1rem;

  &:hover {
    background-color: #fff;
    color: #6fa0d0;
  }

  &:focus {
    background-color: #fff;
    color: #6fa0d0;
  }
`;



const C = (props) => {
  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
  } = props;

  return (
    <Container>
      <InnerDiv>
        <h5 style={{ margin: "30px" }}>Add A School</h5>
        <form onSubmit={handleSubmit}>
          <Form.Item
            help={
              touched.school_name && errors.school_name
                ? errors.school_name
                : ""
            }
            validateStatus={
              touched.school_name && errors.school_name ? "error" : undefined
            }
          >
            <Input
              size="large"
              name="school_name"
              value={values.school_name}
              onChange={handleChange}
              placeholder="School Name"
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>
          <Form.Item
            help={touched.location && errors.location ? errors.location : ""}
            validateStatus={
              touched.location && errors.location ? "error" : undefined
            }
          >
            <Input
              size="large"
              name="location"
              placeholder="School Location"
              value={values.location}
              onChange={handleChange}
              prefix={
                <Icon type="environment" style={{ color: "rgba(0,0,0,.25)" }} />
              }
            />
          </Form.Item>
          <div>
            <Btn type="primary" htmlType="submit">
              Add
            </Btn>
            <Btn type="danger" onClick={props.showAddSchoolTrigger}>
              Cancel
            </Btn>
          </div>
        </form>
      </InnerDiv>
    </Container>
  );
};

const validationSchema = yup.object().shape({
  school_name: yup.string().required("Please provide a school name"),
  location: yup
    .string()
    .required("Please provide the location")
    
});

const AddSchoolsForm = withFormik({
  mapPropsToValues: () => ({ school_name: "", location: "" }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log(values);
    props.savingSchools(values);
      setSubmitting(false);
      props.showAddSchoolTrigger()
  },

  validationSchema: validationSchema,
})(C);

const mapStateToProps = (state) => {
  // console.log(state);
  return {

  };
};

export default connect(mapStateToProps, { savingSchools })(AddSchoolsForm);
