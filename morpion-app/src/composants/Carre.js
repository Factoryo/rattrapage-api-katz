import React from "react";

function Carre({ choixCarre, val }) {
  return (
    <div className="carre" onClick={choixCarre}>
      {val}
    </div>
  );
}

export default Carre;

/**Pions du morpion */