import React, { useState } from 'react';
import { Popup } from './Popup'
export const SearchResult = ({ maxPopulation, planets }) => {

    const [show, setModel] = useState(false);
    const [planetInfo, setInfo] = useState(null);

    /**
    * 
    *@discription - This function will show model on cliking the row of the table
    @param planet -Object of planet selected
    */
    function showModal(planet) {
        setModel(true)
        setInfo(planet)
    };

    return (
        <>
            <Popup show={show} planetInfo={planetInfo} handleClose={() => setModel(false)} />

            <div className="grid">
                {planets && <div className="header">
                    <span className="search-head"><strong>Name</strong></span>
                    <span className="search-head"><strong>Population</strong></span>
                </div>}
                {planets && planets.map((planet, index) => {
                    console.log(planet)
                    return (
                        <div key = {index} className={`grid-container ${maxPopulation.name === planet.name ? "active" : ""}`} onClick={() => showModal(planet)}>
                            <span >{planet.name}</span>
                            <span>{planet.population}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}