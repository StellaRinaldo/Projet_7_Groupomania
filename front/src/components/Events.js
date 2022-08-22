import React from "react";

const Events = () => {
  return (
    <>
      <div className="events-bloc">
        <h2>Actualités</h2>
        <div className="event-card">
          <p>
            Réunions <span>0</span>
          </p>
        </div>
        <div className="event-card">
          <p>
            Conférences <span>0</span>
          </p>
        </div>
        <div className="event-card">
          <p>
            Salons <span>0</span>
          </p>
        </div>
        <div className="event-card">
          <p>
            Master Classes <span>0</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Events;
