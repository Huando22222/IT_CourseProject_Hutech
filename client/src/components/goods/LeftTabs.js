import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import './LeftTabs.css';
import { useState } from 'react';
import Goods from './list/Goods';

function LeftTabs() {

  const [selectedEventKey, setSelectedEventKey] = useState('tất cả');

  const handleSelect = (eventKey) => {
    setSelectedEventKey(eventKey);
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first" activeKey={selectedEventKey} onSelect={handleSelect}>
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="tất cả">tất cả</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="thịt - trứng - cá">thịt - trứng - cá</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="rau">rau</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="gạo - bột - đồ khô">gạo - bột - đồ khô</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>

            <Tab.Pane eventKey="tất cả" className="custom-pane"> {/* Thêm lớp CSS cho Tab.Pane */}
              <Goods selectedEventKey={selectedEventKey}/>
            </Tab.Pane>

            <Tab.Pane eventKey="thịt - trứng - cá">
              <Goods selectedEventKey={selectedEventKey}/>
            </Tab.Pane>

            <Tab.Pane eventKey="rau">
              <Goods selectedEventKey={selectedEventKey}/>
            </Tab.Pane>

            <Tab.Pane eventKey="gạo - bột - đồ khô">
              <Goods selectedEventKey={selectedEventKey}/>
            </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default LeftTabs;
