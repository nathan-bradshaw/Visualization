// WorkItems.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './workitems.scss';
import Work from './Work';
import MobileMainScreen from './MobileMainScreen';

//NEED TO DOCUMENT THIS BETTER

//list of all the work displayed. Responsive in nature. 

function WorkItems(props) {
    const [width, setWidth] = useState(window.innerWidth);

    const [expandedItem, setExpandedItem] = useState(null);

    function handleResize() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleExpand = (item) => {
        if (expandedItem === item) {
            setExpandedItem(null);
        } else {
            setExpandedItem(item);
        }
    };

    const renderMobileMainScreen = (item) => {
        return (
            <Row key={item.id} className='ml-5 justify-content-center'>
                <MobileMainScreen data={item} />
            </Row>

        );
    };

    const renderCard = (item) => {
        return (
            <Col key={item.id} md={6} className="mb-3">
                <Card className="h-100">
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Button onClick={() => handleExpand(item)}>Expand</Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    const renderWorkItems = () => {
        return Object.entries(props.data).map((item, index) => (
            <React.Fragment key={index}>
                {expandedItem === item ? <Work data={item} /> : renderCard(item)}
            </React.Fragment>
        ));
    };

    return (
        <Container fluid>
            {width < 768 ? renderMobileMainScreen(Object.entries(props.data)) : <Row className='justify-content-center'>{renderWorkItems()}</Row>}
            {Object.entries(props.data).length === 0 &&
                <div className='list-empty text-center'><h2>No ITEMS Available</h2></div>
            }
        </Container>
    );
}

export default WorkItems;
