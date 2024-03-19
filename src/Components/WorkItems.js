// WorkItems.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './workitems.scss';
import Work from './Work';
import MobileMainScreen from './MobileMainScreen';

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

    const handleExpand = (itemKey) => {
        setExpandedItem(expandedItem === itemKey ? null : itemKey);
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
            <Col key={item[0]} md={6} className="mb-3">
                <Card className="h-100">
                    <Card.Body>
                        <Card.Title>{item[0]}</Card.Title>
                        <Button onClick={() => handleExpand(item[0])} class="button-maroon">Expand</Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    const renderWorkItems = () => {
        return Object.entries(props.data).map((item) => (
            <React.Fragment key={item[0]}>
                {expandedItem === item[0] ? <Work data={item} /> : renderCard(item)}
            </React.Fragment>
        ));
    };

    return (
        <Container fluid>
            {width < 768 ? renderMobileMainScreen(props.data) : <Row className='justify-content-center'>{renderWorkItems()}</Row>}
            {Object.entries(props.data).length === 0 &&
                <div className='list-empty text-center'><h2>No ITEMS Available</h2></div>
            }
        </Container>
    );
}

export default WorkItems;