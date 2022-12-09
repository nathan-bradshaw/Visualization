import './mainScreen.scss'
import { Container, Row,Col } from 'react-bootstrap';
import WorkItems from './WorkItems';
import data from '../Backend_Services/data_op.js'
import { useState } from 'react';
import {search} from '../Backend_Services/search_data'


// The main screen with header and search bar
function MainScreen() {
    const [list,setList] = useState(data)
    
    function handleChange(e)
    {
        if(e.target.value === ""){
            setList(data)
        }
        else{
            const res = search(e.target.value);
        setList(res)
        }
        
        
    }
    return (
        <div className='main ' >
        <Container >
            
            <Row className=' p-4'>
                <Col className='border rounded mb-0 heading m-0'><h1>Encyclopedia of Places and Scenes</h1></Col>
            </Row>
            <Row className='m-3'></Row>
            <Row> 
                <Col md={9}></Col>
                <Col md = {3}> 
                    <div>
                    <input placeholder="Search..........."  type="search"  onChange={handleChange}  className='rounded-3 m-1  border-0 w-100 search' />
                    </div>   

                </Col>
            </Row>
            <Row className='m-4'></Row>
            <Row className=' d-flex justify-content-center'>
                <WorkItems data = {list}/>
            </Row>
        </Container> 
        </div>
    );
  }
  
export default MainScreen;
  