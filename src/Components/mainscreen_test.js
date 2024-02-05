import "./mainScreen.scss";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import data from '../Backend_Services/data_op.js';

function MainScreen() {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleAccordionSelect = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <div className="main">
      <Row className=" p-4">
        <Col className="jumbotron">
          <h1>Dictionary of People and Places in George Eliot's Fiction</h1>
        </Col>
      </Row>
      <div>
        <Accordion activeKey={activeIndex} onSelect={handleAccordionSelect}>
          {data.map((entry, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>

              <Accordion.Header>{entry.Source}</Accordion.Header>

              <Accordion.Body>
                <div className="row">
                  <div className="col-sm-4">
                    <h4>Source Text</h4>
                    <ul>
                      {entry.Subject.map((item, i) => (
                        <li key={i}>
                          <div className="entry-title">{item.Title}</div>
                          <div className="entry-desc">{item.desc}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-sm-2">
                    <h4>Characters</h4>
                    <ul>
                      {entry.Relation.map((item, i) => (
                        <li key={i}>
                          <div className="entry-title">{item.Title}</div>
                          <div className="entry-desc">{item.desc}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-sm-2">
                    <h4>Places</h4>
                    <ul>
                      {entry.Source.map((item, i) => (
                        <li key={i}>
                          <div className="entry-title">{item.Title}</div>
                          <div className="entry-desc">{item.desc}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default MainScreen;
