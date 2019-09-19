import React from 'react';
import home from '../../image/bg3.jpg'



class Home extends React.Component{
    render(){
        return(
            <img src={home} style={{width:'1000px', height: '550px'}}/>
        )
    }
}
export default Home;