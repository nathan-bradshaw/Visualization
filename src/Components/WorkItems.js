import { Container, Row } from 'react-bootstrap';
import Work from './Work';
import React, { useEffect, useState } from "react";
import MobileMainScreen from './MobileMainScreen';
import './workitems.scss'

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

    console.log(props.data.length)

    if(width< 768){
        for(let i = 0; i <props.data.length; i++) {
            rows.push(<Row className='ml-5 justify-content-center'><MobileMainScreen data = {props.data[i]}  /></Row>);
        }
    }
    else{
    
        for(let i = 0; i <props.data.length; i++) {
            rows.push(<Row className='ml-5 justify-content-center'><Work data = {props.data[i]} /></Row>);
        }
    }
    console.log(rows)
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
  