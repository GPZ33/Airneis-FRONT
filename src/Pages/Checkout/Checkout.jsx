import React, { useState } from 'react';
import Delivery from "../../Components/Delivery/Delivery";
import Payment from "../../Components/Payment/Payment";
import ThankYou from "../../Components/ThankYou/ThankYou";

const Checkout = () => {
    const [isPayment, setIsPayment] = useState(false);
    const [isThankYou, setIsThankYou] = useState(false);

    const handleContinueToPayment = () => {
        setIsPayment(true);
    };

    const handleContinueToThankYou = () => {
        setIsThankYou(true);
    }

    return (
        <>
            {!isThankYou ? (
                <>
                {!isPayment ? (
                <Delivery onContinueToPayment={handleContinueToPayment} />
            ) : (
                <Payment onContinueToThankYou={handleContinueToThankYou}/>
            )}
                </>
            ) : (
                <ThankYou />
                )}

        </>
    );
};

export default Checkout;
