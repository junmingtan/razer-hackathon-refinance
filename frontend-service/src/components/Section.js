import React from "react";

const Section = ({section, children, ...props}) => (
    <div className="section" {...props}>
        <h2>{section}</h2>
        {children}
    </div>
);

export default Section
