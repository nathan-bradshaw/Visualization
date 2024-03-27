import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import WorkItems from './WorkItems';
import data from '../Backend_Services/data_op.js';
import './mainScreen.scss';
import { search } from '../Backend_Services/search_data';

// Main screen with header and search bar
function MainScreen() {
    const [list, setList] = useState(data);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    function handleChange(e) {
        const value = e.target.value;
        if (value === "") {
            setSuggestions([]);
        } else {
            const res = search(value);

            // Extracting suggestions from the result object
            const suggestedWorks = Object.keys(res).reduce((accumulator, workName) => {
                const work = res[workName];
                const suggestions = [];

                // Add places to suggestions
                work.places.forEach(place => suggestions.push({
                    type: 'Place',
                    path: `${workName}/places/${place.name}`,
                    name: place.name,
                    description: place.desc
                }));

                // Add characters to suggestions
                work.characters.forEach(character => suggestions.push({
                    type: 'Character',
                    path: `${workName}/characters/${character.name}`,
                    name: character.name,
                    description: character.desc
                }));

                // Add misc items to suggestions
                work.misc.forEach(misc => suggestions.push({
                    type: 'Misc',
                    path: `${workName}/misc/${misc.name}`,
                    name: misc.name,
                    description: misc.desc
                }));

                return accumulator.concat(suggestions);
            }, []);

            setSuggestions(suggestedWorks);
        }
    }

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setSelectedSuggestion(suggestion);
    };

    // Render suggestions in a list
    const renderSuggestions = () => {
        return (
            <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        <span dangerouslySetInnerHTML={{ __html: suggestion.path }} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className='main'>
            <Container>
                <Row className='m-3'></Row>
                <Row>
                    <Col md={9}></Col>
                    <Col md={3}>
                        <div className="search-container">
                            <input
                                placeholder="Search"
                                type="search"
                                onChange={handleChange}
                                className='rounded-3 m-1 border-0 w-100 search'
                            />
                            {suggestions.length > 0 && renderSuggestions()}
                        </div>
                    </Col>
                </Row>
                <Row className='m-4'></Row>
                <Row className='d-flex justify-content-center'>
                    <WorkItems data={list} />
                </Row>
            </Container>
            {/* Popup box */}
            <Modal show={selectedSuggestion !== null} onHide={() => setSelectedSuggestion(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedSuggestion && selectedSuggestion.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p dangerouslySetInnerHTML={{ __html: selectedSuggestion && selectedSuggestion.path }}></p>
                    <p>{selectedSuggestion && selectedSuggestion.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedSuggestion(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MainScreen;
