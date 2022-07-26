import React from "react";

const Loader = ({ cwidth, cheight }) => {
    return (
        <>
            <div className="loader-container">
                <span
                    style={{ width: cwidth, height: cheight }}
                    className="loader-circle"
                ></span>
                <span
                    style={{ width: cwidth, height: cheight }}
                    className="loader-circle"
                ></span>
                <span
                    style={{ width: cwidth, height: cheight }}
                    className="loader-circle"
                ></span>
                <span
                    style={{ width: cwidth, height: cheight }}
                    className="loader-circle"
                ></span>
            </div>
        </>
    );
};

export default Loader;
