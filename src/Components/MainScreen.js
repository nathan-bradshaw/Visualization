// MainScreen.jsx
import './mainScreen.scss';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import data from '../Backend_Services/data_op.js';
import { Accordion } from 'react-bootstrap';

function MainScreen() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionSelect = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="main">
      <Row className=' p-4'>
        <Col className='border rounded mb-0 heading m-0'><h1>Dictionary of GE People and Places</h1></Col>
      </Row>
      {/* ... */}
      <Row>
        <div className="container-fluid">
          <div className="row content">
            <div className="col-sm-3 sidenav">
              <Accordion activeKey={activeIndex} onSelect={handleAccordionSelect}>
              {data.map((source, sourceIndex) => (
                  <Accordion.Item eventKey={sourceIndex.toString()} key={sourceIndex}>
                    <Accordion.Header>{source.Title}</Accordion.Header>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
            <div className="col-sm-9">
              <Accordion activeKey={activeIndex} onSelect={handleAccordionSelect}>
              {data.map((source, sourceIndex) => (
                  <Accordion.Item eventKey={sourceIndex.toString()} key={sourceIndex}>
                    <Accordion.Header>Subject</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {source.Subject.map((subject, subjectIndex) => (
                          <li key={`${subjectIndex}-subject-${subjectIndex}`}>
                            <h4 > {source.Relation.map((relation, relationIndex) => (
                          <><li key={`${s}-relation-${relationIndex}`}>
                            </h4>
                            <p>{subject.desc}</p></>
                          </li>
                        ))}
                      </ul>
                   </Accordion.Body>
                    <Accordion.Header>Relation</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {source.Relation.map((relation, relationIndex) => (
                          <li key={`${s}-relation-${relationIndex}`}>
                            <h4>{relation.name}</h4>
                            <p>{relation.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                    {/* <Accordion.Header>Miscellaneous</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {work.characters.map((misc, miscIndex) => (
                          <li key={`${workIndex}-misc-${miscIndex}`}>
                            <h4>{misc.name}</h4>
                            <p>{misc.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body> */}
                  </Accordion.Item>
                ))}
                    </Accordion>
            </div>
          </div>
        </div>
      </Row>

    </div >
  );
}

export default MainScreen;