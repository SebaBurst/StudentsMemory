import React from 'react'
import styles from '../css/banner.css';
import Nav from 'react-bootstrap/Nav';
import Logo from '../img/bluelogo.png';

class Banner extends React.Component {
    render() {
      return (
        <div>
          <Nav className="banner">
            <Nav.Item as="li">
              <div className="bannerLogotipo">
                <img  src = {Logo} style={{
                  width: '310px',
                  marginLeft: '0em',
                }} alt="User avatar"
                />
              </div>                
              </Nav.Item>
          </Nav>
        </div>
      );
    }
  }
  
  export default Banner;
