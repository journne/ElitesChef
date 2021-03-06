import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

import './footer.css';
import Logo from '../../assets/Logo.png';

const Footer = ({ history }) => (
  <Container fluid className='footer'>
    <Row className='footerInfo'>
      <Col xs={12} md={6} lg={4} className='description'>
        <Image src={Logo} width='200' />
        <small>An ingredient and recipe delivery service</small>
        <small>Made with ♥ in Lagos, Nigeria</small>
      </Col>
      <Col xs={6} md={3} lg={4} className='footerLinks'>
        <Nav>
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/menu'>Menu</Nav.Link>
          <Nav.Link as={Link} to='/pricing'>Pricing</Nav.Link>
          <Nav.Link as={Link} to='/signin'>Sign Up</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to='/'>Community</Nav.Link>
          <Nav.Link as={Link} to='/menu'>Articles</Nav.Link>
          <Nav.Link as={Link} to='/pricing'>Tips</Nav.Link>
          <Nav.Link as={Link} to='/signin'>Cookbook</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to='/'>Suppliers</Nav.Link>
          <Nav.Link as={Link} to='/menu'>Supply Chain Act</Nav.Link>
          <Nav.Link as={Link} to='/pricing'>Press</Nav.Link>
          <Nav.Link as={Link} to='/signin'>Donations</Nav.Link>
        </Nav>
      </Col>
      <Col xs={6} md={3} lg={4} className='socialIcons'>
        <div>About Us</div>
        <div>
          <span className='socialIcon'>
            <a href='https://twitter.com/eliteschef'>
              <i className='fa fa-twitter'></i>
            </a>
          </span>
          <span className='socialIcon'>
            <a href='https://github.com/eliteschef'>
              <i className='fa fa-instagram'></i>
            </a>
          </span>
          <span className='socialIcon'>
            <a href='https://www.facebook.com/eliteschef/'>
              <i className='fa fa-facebook'></i>
            </a>
          </span>
        </div>
      </Col>
    </Row>
    <Row>
      <Col xs={12} className='license mx-auto'>
        <small>© By The Modes Empire 2020</small>
      </Col>
    </Row>
  </Container>
);

export default Footer;
