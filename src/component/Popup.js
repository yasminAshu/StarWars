import React from 'react';
   /**
   * 
   *@discription - This function will return the jsx of model popup
   @param planetInfo -Object of planet selected
    @param handleClose -function to close popup
     @param show -variable to show and hide popup
     @return {String} - returns the jsx code of the popup
   */
export const Popup = ({ planetInfo, handleClose, show }) => {
    let showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2>Planet</h2>
                <div className="planet-info">
                    {planetInfo && Object.keys(planetInfo).map(function (key) {
                        return (
                            <>
                                <span><strong>{key}</strong></span>
                                <span >{planetInfo && planetInfo[key]}</span>
                            </>
                        )
                    })}
                </div>
                <button className="button-close" onClick={handleClose}>close</button>
            </section>
        </div>
    );
};