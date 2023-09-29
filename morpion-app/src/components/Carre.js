import React from "react";

function Carre({ choisirCarre, val }) {
  return (
    <div className="carre" onClick={choisirCarre}>
      {val}
    </div>
  );
}

export default Carre;
