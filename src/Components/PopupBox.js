import Popup from "reactjs-popup";
import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import './PopupBox.scss'
import React, {useState} from "react";

// the popup box which pops out on clicking the work
function PopupBox(props){

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        props.onHide(); // Call onHide prop to handle closing in the parent component
    };
    
    return (
        /** <Popup  className="m-2" trigger={<p> {props.heading}</p>} position=" center center" modal>
            <Container className='popup  m-2 border  rounded-1'>
                <Row className='m-3'>
                    <Col xs={12}>
                        <strong>{props.heading}</strong>
                    </Col>
                    <Col xs={12}>
                        {props.text}
                    </Col>
                </Row>
            </Container>
        </Popup> **/

        <>
            <p onClick={handleOpenModal}>{props.heading}</p>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='m-3'>
                        {props.text}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
  
export default PopupBox;