import React from 'react';
import { connect } from 'react-redux';
import { Menu, Form, Input, Switch } from 'antd';

const { SubMenu } = Menu;

class GraphSettings extends React.Component{
	constructor(props, context) {
		super(props, context);
		this.state = {
			openKeys: ['sub1']
            
		};
		this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
	}
    
	onFinish(values) {
		// this.props.onSubmit(values);
		console.log(values);
	}

	updateValues(values) {
		this.props.values(values);
	}
    
	onOpenChange(openKeys) {
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	}
    
	render() {
		return (
			<>
				<Form
					onFinish={() => this.onFinish()}
					onValuesChange={(value, allvalues) => this.updateValues(allvalues)}
					initialValues={{
						autoscale:false
					}}
				>
					<Form.Item
						label="Name"
						name="name"
					>
						<Input/>
					</Form.Item>
					<Menu
						mode="inline"
						openKeys={this.state.openKeys}
						onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
						selectable={false}
						theme="dark"
					>
						<SubMenu key="sub1" title="Data 1">
							<Menu.Item key="1">
								<Form.Item
                                	label="Autoscale"
									name="autoscale"
								>
									<Switch size="small"/>
								</Form.Item>
							</Menu.Item>
							<Menu.Item key="2">Option 2</Menu.Item>
							<Menu.Item key="3">Option 3</Menu.Item>
							<Menu.Item key="4">Option 4</Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" title="Navigation Two" disabled>
							<Menu.Item key="5">Option 5</Menu.Item>
							<Menu.Item key="6">Option 6</Menu.Item>
							<SubMenu key="sub3" title="Submenu">
								<Menu.Item key="7">Option 7</Menu.Item>
								<Menu.Item key="8">Option 8</Menu.Item>
							</SubMenu>
						</SubMenu>
						<SubMenu key="sub4" title="Navigation Three">
							<Menu.Item key="9">Option 9</Menu.Item>
							<Menu.Item key="10">Option 10</Menu.Item>
							<Menu.Item key="11">Option 11</Menu.Item>
							<Menu.Item key="12">Option 12</Menu.Item>
						</SubMenu>
					</Menu>
				</Form>
                
			</>
		);
	}
    
}

function mapStateToProps({ settingsReducer }) {
	return {
		settings: settingsReducer.settings
	};
}

export default connect(mapStateToProps)(GraphSettings);