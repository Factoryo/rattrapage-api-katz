import React, { useState } from "react";
import Jeu from "./Jeu";

function JoinJeu() {
    const [channel, setChannel] = useState(null);
    const [rivalUsername, setRivalUsername] = useState("");

    const createChannel = () => {
        setChannel({
            id: Math.random().toString(),
            name: rivalUsername
        });
    };

    return (
        <>
            {channel ? (
                <div>
                    <Jeu channel={channel} setChannel={setChannel} />
                </div>
            ) : (
                <div className="joinGame">
                    <h4>Création de session de jeu</h4>
                    <input
                        placeholder="Pseudonyme du rival..."
                        onChange={(event) => {
                            setRivalUsername(event.target.value);
                        }}
                    />
                    <button onClick={createChannel}>Joindre la session/créer une nouvelle session</button>
                </div>
            )}
        </>
    );
}

export default JoinJeu;
