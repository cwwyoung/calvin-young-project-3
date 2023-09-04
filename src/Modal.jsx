import React from "react";
import { useState } from "react";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        ?
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay">
            <div className="modal-content">
              <p>
                Use the drop down menu to select the Challenge Rating for the
                monsters you wish to see. Click the D20 next to the monster's
                name to see a new randomly chosen monster with the same
                Challenge Rating.
              </p>
              <button className="close-modal" onClick={toggleModal}>
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
