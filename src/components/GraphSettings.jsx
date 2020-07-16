import React from 'react';
import { connect } from 'react-redux';
import { Menu, Form, Input, Switch, Row, Col } from 'antd';

const { SubMenu } = Menu;

class GraphSettings extends React.Component{
	constructor(props, context) {
		super(props, context);
		this.state = {
			openKeys: []
            
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
						name: this.props.name,
						autoX:false
					}}
				>
					<Form.Item
						label="Name"
						name="name"
					>
						<Input
							style={{ width: 200}}
							placeholder={this.props.name}
						/>
					</Form.Item>
					<Menu
						mode="inline"
						openKeys={this.state.openKeys}
						onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
						selectable={false}
						theme="dark"
					>
						<SubMenu key="sub1" title="X Axis">
							<Menu.Item key="1">
								<Form.Item
									label="Autoscale"
									name="autoX"
								>
									<Switch size="small"/>
								</Form.Item>
							</Menu.Item>
							<SubMenu key="sub3" title="Data sets">
								<Menu.Item key="2">Option 7</Menu.Item>
								<Menu.Item key="3">Option 8</Menu.Item>
							</SubMenu>
						</SubMenu>
						<SubMenu key="sub2" title="Y Axis">
							<Menu.Item key="5">Option 5</Menu.Item>
							<Menu.Item key="6">Option 6</Menu.Item>
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