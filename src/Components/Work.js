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

    const imagePaths = {
        georgeeliot: require('../Images/georgeeliot.jpg'),
        adambede: require('../Images/adambede.jpg'),
        agatha: require('../Images/agatha.jpg'),
        amosbarton: require('../Images/amosbarton.jpg'),
        brotherjacob: require('../Images/brotherjacob.jpg'),
        danielderonda: require('../Images/danielderonda.jpg'),
        eliot: require('../Images/eliot.jpg'),
        felixholt: require('../Images/felixholt.jpg'),
        impressions: require('../Images/impressions.jpg'),
        janetsrepentance: require('../Images/janetsrepentance.jpg'),
        liftedveil: require('../Images/liftedveil.jpg'),
        middlemarch: require('../Images/middlemarch.jpg'),
        mrgilfil: require('../Images/mrgilfil.jpg'),
        romola: require('../Images/romola.jpg'),
        silasmarner: require('../Images/silasmarner.jpg'),
        spanishgypsy: require('../Images/spanishgypsy.jpg'),
        themill: require('../Images/themill.jpg')
    };
    const imagePath = imagePaths[props.data[1].image];


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

                            <img src={imagePath} alt="Book cover" />
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
                        {renderPopupBox({ name: 'Other Named Entities', data: props.data[1].misc, open: openMisc }, toggleMisc)}
                    </Col>

                </Row>
            </Stack>
        </Container>
    );
}

export default Work;