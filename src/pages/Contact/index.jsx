import React, { useEffect } from "react";

import CommonTitle from "../../components/common/CommonTitle/index.jsx";
import ContactInfo from "../../components/ContactInfo/index.jsx";

const Contact = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <>
        <CommonTitle
         title="Contact with Us"
         subtitle="Let's Chat Sweetness!"
        />
        <ContactInfo />
        </>
    );
};

export default Contact;