import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './workitems.scss';
import Work from './Work';

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

    const renderWorkItems = () => {
        return Object.entries(props.data).map((item) => (
            <React.Fragment key={item[0]}>
                <Col md={6} className="mb-3">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title dangerouslySetInnerHTML={{ __html: item[0] }} />
                            <Button onClick={() => handleExpand(item[0])} className="button-maroon">Expand</Button>
                        </Card.Body>
                    </Card>
                </Col>
                {expandedItem === item[0] && (
                    <Col md={12} className="mb-3">
                        <Work data={item} />
                    </Col>
                )}
            </React.Fragment>
        ));
    };

    return (
        <Container fluid>
            <Row className='justify-content-center'>{renderWorkItems()}</Row>
            {Object.entries(props.data).length === 0 &&
                <div className='list-empty text-center'><h2>No ITEMS Available</h2></div>
            }
        </Container>
    );
}

export default WorkItems;
