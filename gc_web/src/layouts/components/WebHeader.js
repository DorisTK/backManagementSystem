import React from 'react';
import router from 'umi/router';
import {connect} from 'dva';
import {Layout, Popover, Icon, Avatar} from 'antd';
import * as styles from './WebHeader.less';

const namespace='webHeader';
const {Header} = Layout;

function mapStateToProps(state) {
    return{
        userInfo: state.webHeader.userInfo
    }
}

class WebHeader extends React.Component{
    constructor(props){
        super(props);
        let date = new Date();
        let formatTime = this.formatTime(date);
        let formatDate = this.formatDate(date);
        this.state = {
            formatTime: formatTime,
            formatDate: formatDate
        }
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 30000);
        const id = this.props.id;
        this.props.dispatch({type:`${namespace}/getUserInfo`, params: id});
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //获取格式化时间
    formatTime(date) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let fhour = hour < 10
            ? `0${hour}`
            : hour;
        let fminute = minute < 10
            ? `0${minute}`
            : minute;
        return fhour + ':' + fminute;
    }
    //获取格式化日期
    formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let formatMonth = month < 10
            ? `0${month}`
            : month;
        let formatDay = day < 10
            ? `0${day}`
            : day;
        return `${year}/${formatMonth}/${formatDay}`;
    }

    tick() {
        let date = new Date();
        let formatTime = this.formatTime(date);
        let formatDate = this.formatDate(date);
        this.setState({formatTime: formatTime, formatDate: formatDate});
    }
    render(){
        let storage=window.localStorage;
        const personMenu = (<div>
            <p  className={styles.personMenu} onClick={()=>{router.push('/web/personal')}}><Icon type="user" />个人中心</p>
            <p className={styles.personMenu} onClick={()=>{storage.clear();router.push("/login")}}><Icon type="logout" />退出登录</p>
        </div>);
        return(
            <Header className={styles.webHeader}>
                <div className={styles.header_right}>
                    <span className={styles.user}>欢迎你 {this.props.userInfo.name}</span>
                    <Popover content={personMenu}>
                        {this.props.userInfo.head_photo!=null? <img src={"http://localhost:8080/img/relative/"+storage.headPhoto}
                                                                    style={{borderRadius:'50%',width:'46px',height:'46px'}}/>:
                            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />}
                    </Popover>
                    <div className={styles.date_time}>
                        <p className={styles.time}>{this.state.formatTime}</p>
                        <p className={styles.date}>{this.state.formatDate}</p>
                    </div>
                </div>
            </Header>
        );
    }
}

export default connect(mapStateToProps)(WebHeader);