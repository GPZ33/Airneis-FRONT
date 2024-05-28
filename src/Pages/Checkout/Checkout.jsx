import React, { useState } from 'react';
import Delivery from "../../Components/Delivery/Delivery";
import Payment from "../../Components/Payment/Payment";

const Checkout = () => {
    const [isPayment, setIsPayment] = useState(false);

    const handleContinueToPayment = () => {
        setIsPayment(true);
    };

    return (
        <>
            {!isPayment ? (
                <Delivery onContinueToPayment={handleContinueToPayment} />
            ) : (
                <Payment />
            )}
        </>
    );
};

export default Checkout;
