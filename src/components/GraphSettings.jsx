import React from 'react';
import { connect } from 'react-redux';
import { Menu, Form, Input, Switch, Row, Col, InputNumber, Select} from 'antd';

const { SubMenu } = Menu;
const { Option } = Select;

class GraphSettings extends React.Component{
	constructor(props, context) {
		super(props, context);
		this.state = {
			openKeys: [],
			isXY: false
		};
		this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
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

	selectType(val){
		const bool = (val == 'XY');
		this.setState({ isXY: bool});
	}
    
	render() {

		const xOptions = [
			{ value: 'Index' },
			{ value: 'Timestamp' }
		];

		// const pd = true;


		return (
			<>
				<Form
					onValuesChange={(value, allvalues) => this.updateValues(allvalues)}
					initialValues={{
						title: this.props.title,
						autoX: false,
						type: 'time',
						maxPoints: 400
					}}
				>
					<Row>
						<Col span={12}>
							<Form.Item
								label="Title"
								name="title"
							>
								<Input
									style={{ width: 150 }}
									placeholder={this.props.title}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Type"
								name="type"
							>
								<Select	style={{ width: 150 }} onChange={(val) => this.selectType(val)}>
									<Option key="time">Time Series</Option>
									<Option key="XY">XY Line</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						label="Nb of Points"
						name="maxPoints"
					>
						<InputNumber size="small" style={{ width: 150 }} />
					</Form.Item>
					
					<Menu
						mode="inline"
						openKeys={this.state.openKeys}
						onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
						selectable={false}
						theme="dark"
					>
						{this.state.isXY ? <SubMenu key="sub1" title="X Axis">
							<Menu.Item>
								<Form.Item 
									label="X data" 
									name="xData"
								>
									<Select
										size="small"
										options={xOptions}
										style={{ width: 150}}
									/>
								</Form.Item>
							</Menu.Item>
						</SubMenu> : <></>}
						<SubMenu key="sub2" title="Y Axis">
							<Menu.Item key="2">
								<Form.Item
									label="Autoscale"
									name="autoX"
								>
									<Switch size="small" />
								</Form.Item>
							</Menu.Item>
							<Menu.Item key="6">Option 6</Menu.Item>
							<SubMenu key="sub3" title="Data sets">
								<Menu.Item key="2">Option 7</Menu.Item>
								<Menu.Item key="3">Option 8</Menu.Item>
							</SubMenu>
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