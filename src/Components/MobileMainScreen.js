import React from 'react'
import { Stack, Row,Col, Container } from 'react-bootstrap';
import './MobileMainScreen.scss'
import PopupBox from './PopupBox';

// responsive design mobile main screen for work items.

function MobileMainScreen(props) {
    const places = []
    const characters = []
    const miscs = []
    for(let i=0 ; i<props.data.places.length;i++){
        places.push(<li className='m-2 mobitems '>
            <PopupBox 
                text= {props.data.places[i].desc}
                heading= {props.data.places[i].name}
                >
            </PopupBox>
        </li>)
    }
    for (let j=0 ;j<props.data.characters.length;j++){
        characters.push(<li className='m-2 mobitems'>
            <PopupBox 
                text= {props.data.characters[j].desc}
                heading= {props.data.characters[j].name}
                >
            </PopupBox>
        </li>)
    }
    return (
        <div className='w-75 m-3 d-flex justify-content-center '>
        <Stack gap={3} className="work border rounded mb-0">
                <Row className='imageholder m-1'>
                    <div >
                    <img src={require('../Files/georgeeliot.jpg')} alt="This is a book cover"></img>
                    </div>               
                </Row>
                <Row>
                    <div className='m-2'>
                        <Row>
                            <h2 className='m-2'>{props.data.work_name}</h2>
                        </Row>
                        <Row className='m-2'></Row>
                        <Row>
                            <h5>Middlemarch, A Study of Provincial Life is a novel by the English author Mary Anne Evans, who wrote as George Eliot.......... </h5>
                        </Row>
                        <Row className='m-2'></Row>
                        <Row className='m-2'>
                           
                           <h5 className='text-center' style={{color:'#9F2B2B'}}>Places</h5>
                           <ul className='center'>
                                {places}
                                
                            </ul>
                           </Row>
                           
                           <Row className='m-2'>
                           <h5 className='text-center' style={{color:'#9F2B2B'}}>Scenes</h5>
                           <ul className='center'>
                                {characters}
                                
                            </ul>
                           
                        </Row>
                    </div>
                </Row>
            
        </Stack> 
        </div>
    );
}

export default MobileMainScreen