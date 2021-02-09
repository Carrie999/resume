import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, message, Col, Row } from 'antd';
import { Route, Link, Redirect } from 'react-router-dom'

// import { PrivateRoute } from "@/pages/Login";
import styles from './styles/index.module.less';
import logo from '@/assets/imgs/logo.png'
import Sidebar from '@/components/SideBar';
import data from '@/components/SideBar/sidebarData';
// import Example from '@/pages/Example/Loadable';
import BreadcrumbWrap from '@/components/Breadcrumb';
import autoPageRouter from '../index'
import NotFound from '@/pages/NotFount';


const { Header, Sider, Content } = Layout;
const Store = require('locallyjs').Store,
      store = new Store();


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
    };
  }
  componentDidMount = () =>{
  }

  plus(){
    console.log('plus')
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  signOut = () => {
    this.props.history.push('/login')
  }

  render() { 
    // 面包屑随route变化而变化
    let breadcrumbOne, breadcrumbTwo
    const pathname = this.props.location.pathname.slice(1,)
    data.forEach(element => {
      element.children.forEach(item => {
        if (item.link === pathname) {
          breadcrumbOne = item.tit
          if (item.parentTit) {
            breadcrumbOne =  <Link to={ item.parentLink }> {item.parentTit} </Link>
            breadcrumbTwo = item.tit
          }
        }
      })  
    });

  
    return (
      <Content style={{
        margin: '12px auto', width:'720px', padding: 0, background: '#fff', minHeight: '1018px',
      }}>
        <Route exact path="/" render={() => (
          <Redirect to="/resume"/>
        )}/>
        {Object.keys(autoPageRouter).map(item => (
          <Route path={item} key={item} exact component={autoPageRouter[item]} />
        ))}
        { ! Object.keys(autoPageRouter).includes(this.props.location.pathname)
            ? <Route path="*" component={NotFound} />
            : '' }
      </Content>
    );
  }
}

export default Home;
