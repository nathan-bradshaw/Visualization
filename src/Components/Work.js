// Work.js
import React, { useState } from 'react';
import { Stack, Row, Col, Container, Collapse } from 'react-bootstrap';
import './work.scss'
import PopupBox from './PopupBox';
import ShowMoreText from './ShowMoreText';

function Work(props) {
    const [openPlaces, setOpenPlaces] = useState(false);
    const [openCharacters, setOpenCharacters] = useState(false);
    const [openMisc, setOpenMisc] = useState(false);

    const togglePlaces = () => setOpenPlaces(!openPlaces);
    const toggleCharacters = () => setOpenCharacters(!openCharacters);
    const toggleMisc = () => setOpenMisc(!openMisc);
    const images = {
        'Adam Bede': require('../Files/georgeeliot.jpg')
    }

    const renderPopupBox = (items, toggleFunc) => {
        return (
            <React.Fragment>
                <button onClick={toggleFunc} className='btn btn-link' style={{ color: '#9F2B2B' }}>
                    {items.name}
                </button>
                <Collapse in={items.open}>
                    <div className='center'>
                        {items.data.map((item, index) => (
                            <p key={index} className='m-2 items hover-zoom'>
                                <PopupBox text={item.desc} heading={item.name} />
                            </p>
                        ))}
                    </div>
                </Collapse>
            </React.Fragment>
        );
    };

    return (
        <Container fluid>
            <Stack gap={3} className="work border rounded mb-0">
                <Row>
                    <Col>
                        <div className='imageholder m-3'>
                            <img src={images['Adam Bede']} alt="Book cover" />
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <h2 className='m-2 p-2'><p className='p-2 m-2'>{props.data[0]}</p></h2>
                        </Row>
                        <Row className='m-2'></Row>
                        <Row>
                            <ShowMoreText text={props.data[1].desc} maxLength={150} />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderPopupBox({ name: 'Places', data: props.data[1].places, open: openPlaces }, togglePlaces)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderPopupBox({ name: 'Characters', data: props.data[1].characters, open: openCharacters }, toggleCharacters)}
                    </Col>
                </Row>
                <Row>

                    <Col>
                        {renderPopupBox({ name: 'Misc', data: props.data[1].misc, open: openMisc }, toggleMisc)}
                    </Col>

                </Row>
            </Stack>
        </Container>
    );
}

export default Work;
