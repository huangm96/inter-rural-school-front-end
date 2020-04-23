import "antd/dist/antd.css";
import { Modal,  } from "antd";



const { confirm } = Modal;

export function showDeleteConfirm(  id, props, title, cb ) {
  confirm({
    title: `Are you sure you want to delete ${ title }?`,
    //content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      // console.log("OK", props);

      props.deleteIssue(id, props);
      cb('clear');
    },
    onCancel() {
      // console.log("Cancel");
    }
  });
}


