import React from 'react';
import NavBarMenu from '../components/layout/NavBarMenu';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';

const About = () => {
  return (
    <div>
      <NavBarMenu>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" rounded />
            </Col>
            <Col>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Accordion Item #1</Accordion.Header>
                  <Accordion.Body>
                  PTE Magic Technical Support: support@ptemagic.com
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </NavBarMenu>
      About
    </div>
  );
}

export default About