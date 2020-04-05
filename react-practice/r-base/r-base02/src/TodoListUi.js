// import React, { Component } from "react";
import React from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
const TodoListUi = props => {
  return (
    <div style={{ margin: "10px" }}>
      <div>
        <Input
          style={{ width: "250px", marginRight: "10px" }}
          onChange={props.changeInputValue}
          value={props.inputValue}
        />
        <Button type="primary" onClick={props.clickBtn}>
          增加
        </Button>
      </div>
      <div style={{ margin: "10px 0 0 0", width: "300px" }}>
        <List
          bordered
          dataSource={props.list}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => {
                props.deleteItem(index);
              }}
            >
              {item}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
// class TodoListUi extends Component {
//   render() {
//     return (
//       <div style={{ margin: "10px" }}>
//         <div>
//           <Input
//             style={{ width: "250px", marginRight: "10px" }}
//             onChange={this.props.changeInputValue}
//             value={this.props.inputValue}
//           />
//           <Button type="primary" onClick={this.props.clickBtn}>
//             增加
//           </Button>
//         </div>
//         <div style={{ margin: "10px 0 0 0", width: "300px" }}>
//           <List
//             bordered
//             dataSource={this.props.list}
//             renderItem={(item, index) => (
//               <List.Item
//                 onClick={() => {
//                   this.props.deleteItem(index);
//                 }}
//               >
//                 {item}
//               </List.Item>
//             )}
//           />
//         </div>
//       </div>
//     );
//   }
// }

export default TodoListUi;
