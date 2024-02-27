import { Stack, Row,Col, Container } from 'react-bootstrap';
import './work.scss'
//import Popup from 'reactjs-popup';
import PopupBox from './PopupBox';

// the work tiles representing each work.
function Work(props) {
    const places = []
    const characters = []
    const miscs = []

    for(const value of props.data[1].places){
        places.push(<p className='m-2 items hover-zoom'>
            <PopupBox 
                text= {value.desc}
                heading= {value.name}
                >
            </PopupBox>
        </p>)
    }

    for (const value of props.data[1].characters){
        characters.push(<p className='m-2 items hover-zoom'>
            <PopupBox 
                text= {value.desc}
                heading= {value.name}
                >
            </PopupBox>
        </p>)
    }

    for (const value of props.data[1].misc){
        miscs.push(<p className='m-2 items hover-zoom'>
            <PopupBox 
                text= {value.desc}
                heading= {value.name}
                >
            </PopupBox>
        </p>)
    }
    return (
        <div className='w-75 m-3 d-flex justify-content-center '>
        <Stack gap={3} className="work border rounded mb-0">
            <Row>
                <Col>
                    <div className='imageholder m-3'>
                    <img src={require('../Images/georgeeliot.jpg')} alt="This is a book cover"></img>
                    </div>               
                </Col>
                <Col>
                    <div>
                        <Row>
                            <h2 className='m-2 p-2'><p className='p-2 m-2'>{props.data[0]}</p></h2>
                        </Row>
                        <Row className='m-2'></Row>
                        <Row>
                            <h5>Middlemarch, A Study of Provincial Life is a novel by the English author Mary Anne Evans, who wrote as George Eliot.......... </h5>
                        </Row>
                        <Row className='m-2'></Row>
                        <Row>
                           <Col>
                           
                           </Col>
                           
                           <Col>
                           
                           </Col>
                        </Row>
                    </div>
                </Col>
                <Row>
                <h5 className='text-center' style={{color:'#9F2B2B'}}>Places</h5>
                           <div className='center '>
                                {places}
                                
                            </div>
                </Row>
                <Row>
                <h5 className='text-center' style={{color:'#9F2B2B'}}>Characters</h5>
                           <div className='center '>
                                {characters}
                                
                            </div>
                </Row>
                <Row>
                <h5 className='text-center' style={{color:'#9F2B2B'}}>Other Named Entities</h5>
                           <div className='center '>
                                {miscs}
                                
                            </div>
                </Row>
            </Row>
        </Stack> 
        </div>
    );
  }
  
export default Work;