import React, { Component } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { withClick } from '@/utils/hoc';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

// 表单单排格式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class UserModal extends Component {
  state = {
    visible: false,
  };

  handleOpenClick = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleOk = () => {
    // form校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 请求
        this.props.onAdd(values).then(res => {
          if (res.state == 'success') {
            // 关闭弹窗
            this.handleCancel();
            console.log(values);
          }
        });
      }
    });
  };
  render() {
    const { visible } = this.state;
    const { children, addLoading } = this.props;
    const { getFieldDecorator } = this.props.form; //表单验证

    return (
      // 空标签  <> </> 代替根节点
      <>
        {withClick(children, this.handleOpenClick)}
        <Modal
          title="添加用户"
          visible={visible}
          centered={true}
          maskClosable={false}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          confirmLoading={addLoading}
        >
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('nickname', {
                rules: [
                  {
                    required: true,
                    message: '昵称不能为空',
                  },
                ],
              })(<Input placeholder="请输入姓名" />)}
            </FormItem>
            <FormItem label="用户类型" {...formItemLayout}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '用户类型不能为空,请选择',
                  },
                ],
                initialValue: '1',
              })(
                <RadioGroup>
                  <Radio value={'0'}>管理员</Radio>
                  <Radio value={'1'}>普通用户</Radio>
                </RadioGroup>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </>
    );
  }
}
export default Form.create()(UserModal);