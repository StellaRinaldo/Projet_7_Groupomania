import React from "react";

const Scroll = () => {
    
    const handleScroll = (e) => {
        window.scrollTo({
            top: 0, 
            left: 0,
            behavior: "smooth",
        })
    };

  return (
    <div id="back-top" onClick={handleScroll}>
      <i className="fa-solid fa-circle-arrow-up arrow-up fa-2x"></i>
    </div>
  );
};

export default Scroll;
