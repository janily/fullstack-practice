/**
 * title: 登录
 */
import React from 'react';
// import { login } from './services/login';
import router from 'umi/router';
import { Layout, Icon, Form, Input, Button } from 'antd';
import styles from './index.scss';
import jwt_decode from 'jwt-decode';
import { connect } from 'dva';

const { Content, Footer } = Layout;
const iconStyle = { color: 'rgba(0,0,0,.25)' };

const index = ({ form, dispatch, loading }) => {
  const handleSubmit = () => {
    // form校验
    form.validateFields((err, values) => {
      if (!err) {
        // login(values).then(data => router.push('/'));
        dispatch({
          type: 'login/login',
          payload: values,
        }).then(res => {
          if (res && res.state === 'suc') {
            const token = jwt_decode(res.token);
            const { id, nickname, username, type } = token;
            localStorage.setItem('username', username);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('userId', id);
            localStorage.setItem('authority', type === '0' ? 'admin' : 'user');
            router.push('/');
          }
        });
      }
    });
  };
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.form}>
          <h1>管理系统</h1>
          {/* Form表单 */}
          <Form>
            <Form.Item>
              {form.getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={iconStyle} />}
                  placeholder="请输入用户名"
                  autoFocus
                />,
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '密码不能为空',
                  },
                ],
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock" style={iconStyle} />}
                  placeholder="请输入密码"
                  autoFocus
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                onClick={handleSubmit}
                type="primary"
                style={{ width: '100%' }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer className={styles.footer}>
        Copyright <Icon type="copyright" /> 2020 janily
      </Footer>
    </Layout>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['login/login'],
}))(Form.create()(index));
