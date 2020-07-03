import React from 'react';
import { Form, Input, Button } from 'antd';


const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

class LoginForm extends React.Component{

	onFinish = (values) => {
		this.props.onSubmit(values);
	}
	
	onFinishFailed(err){
		console.error(err);
	}

	render() {
		return (
			<div>
				<Form
					{...layout}
					name="basic"
					initialValues={{
						host: '192.168.1.78', 
						username: 'pi',
						password: 'raspberry'
					}}
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
				>
					<Form.Item
						label="Host"
						name="host"
						rules={[
							{
								required: true,
								message: 'Please enter a host ip!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
                Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

export default LoginForm;