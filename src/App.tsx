import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import './App.css';
import CustomForm from './CustomForm';

const App = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <div style={{ marginTop: 20 }}>
              <CustomForm />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ textAlign: 'center', alignContent: 'center', marginTop: 20 }}>
              <h4>Serbest Meslek Makbuzu Hesaplama</h4>
              <Image
                src="https://avatars3.githubusercontent.com/u/28728163?s=200&v=4"
                style={{ textAlign: 'center' }}
                width={90}
                height={90}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default App;
