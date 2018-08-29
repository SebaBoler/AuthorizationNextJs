import React from "react";
// import stylesheet from 'antd/dist/atd.min.css'
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import LayoutMain from "../components/LayoutMain";
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import { relative } from "path";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export default class App extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <LayoutMain>
        <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ minHeight: "600px"}}>
            <div style={{height: "32px", background: "rgba(255,255,255,.2)", margin: "16px"}} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Icon type="dashboard" />
                    <span>Menu 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="global" />
                    <span>Menu 2</span>
                </Menu.Item>
                <SubMenu key="sub1" title={<span>
                    <Icon type="appstore" />
                    <span>Calatog</span></span>} >
                    <Menu.Item key="3"><Icon type="solution" />Contractor</Menu.Item>
            <Menu.Item key="4"><Icon type="user" />Users</Menu.Item>
                </SubMenu>
            </Menu>
            
            </Sider>
            <Layout>
            <Header style={{background: '#fff', padding: 0}}>
            <div>
                <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold': 'menu-fold'} onClick={this.toggle}
                style={{"font-size": "18px", "line-height": "64px", padding: "0 12px", cursor: "pointer", transition: "color .3s"}}/>
              <div style={{float: "right", height: "100%"}}>  
                <HeaderSearch
                className="searchbox"
                placeholder="Search"
                dataSource={['Warszawa', 'Poznań', 'Wrocław']}
                onSearch={value => {
                  console.log('input', value); // eslint-disable-line
                }}
                onPressEnter={value => {
                  console.log('enter', value); // eslint-disable-line
                }}
              />
              </div>
            </div>
                </Header>
            <Content style={{margin: "12px 8px", padding: "24", background: "#fff", minHeight: "480"}}>
                content
            </Content>
            </Layout>
        </Layout>
      </LayoutMain>
    );
  }
}
