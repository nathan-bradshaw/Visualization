import { Container, Row } from 'react-bootstrap';
import Work from './Work';
import React, { useEffect, useState } from "react";
import MobileMainScreen from './MobileMainScreen';
import './workitems.scss'

//NEED TO DOCUMENT THIS BETTER

//list of all the work displayed. Responsive in nature. 
function WorkItems(props) {
    const rows=[];
    const [width, setWidth] = useState(window.innerWidth);
    function handleResize() {
        setWidth(window.innerWidth);
        window.location.reload(false);
      }
    useEffect(() => {
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, [width]);
    if(width< 768){
        //CHANGE TO BE AN OBJECT, NOT ARRAY
        for(const work of Object.entries(props.data)) {
            //CHANGE props.data[i] TO BE AN OBJECT, NOT ARRAY ITEM
            rows.push(<Row className='ml-5 justify-content-center'><MobileMainScreen data = {work}  /></Row>);
        }
    }
    else{
    
        for(const work of Object.entries(props.data)) {
            //CHANGE props.data[i] TO BE AN OBJECT, NOT ARRAY ITEM
            rows.push(<Row className='ml-5 justify-content-center'><Work data = {work} /></Row>);
        }
    }
    if(rows.length == 0){
        return(
            <div className='list-empty '><h2 className='text-align-center' >No ITEMS Available</h2></div>
        );
    }
    return (
        
        <Container className='justify-content-center '>{rows}</Container>

    );
  }
  
export default WorkItems;
  