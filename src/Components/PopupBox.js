import Popup from "reactjs-popup";
import { Stack, Row,Col, Container } from 'react-bootstrap';
import './PopupBox.scss'
import React from "react";

// the popup box which pops out on clicking the work
function PopupBox(props){
    
    return (
        <Popup  className="m-2" trigger={<p> {props.heading}</p>} position=" center center" modal>
            <Container className='popup  m-2 border  rounded-1'>
                <Row className='m-3'>
                    <strong>{props.heading}</strong>
                    {props.text}
                </Row>
            </Container>
        </Popup>

    );
  }
  
export default PopupBox;