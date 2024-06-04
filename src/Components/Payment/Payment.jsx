import React, {useEffect, useState} from 'react';
import {orderApiService} from "../../service/orderApiService";
import {useNavigate} from "react-router-dom";


const Payment = ({onContinueToThankYou}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const orderId = localStorage.getItem("orderId");
    const [orders, setOrders] = useState("");
    const [cardInfo, setCardInfo] = useState({
        cardName: '',
        cardNumber: '',
        expiration: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        localStorage.setItem('cardInfo', JSON.stringify(cardInfo));
        console.log('Payment submitted:', cardInfo);
        setCardInfo({
            cardName: '',
            cardNumber: '',
            expiration: '',
            cvv: ''
        });

        await orderApiService.updateOrder(token, orderId, {state: "commandé"});
    };

    //get orders of user
    useEffect(() => {
        orderApiService.getOrdersOfUser(token).then(result => {
            setOrders(result["hydra:member"][orders.length - 1]);
            console.log(orders)
        })
    }, []);

    return (
        <section className="payment-page container py-5">
            <div className="card mb-4">
                <h4 className="mb-3 card-header py-3 text-black">Paiement</h4>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="d-block mb-3">
                            <div className="custom-control custom-radio">
                                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required />
                                <label className="custom-control-label text-black" htmlFor="credit">Carte de crédit</label>
                            </div>
                            <div className="custom-control custom-radio pt-2">
                                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                                <label className="custom-control-label text-black" htmlFor="paypal">PayPal</label>
                            </div>
                        </div>
                        <div className="row text-black">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-name">Nom du titulaire de la carte</label>
                                <input type="text" className="form-control" id="cc-name" name="cardName" value={cardInfo.cardName} onChange={handleChange} placeholder="" required />
                                <small className="text-muted">Nom complet tel qu'indiqué sur la carte</small>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-number">Numéro de carte</label>
                                <input type="number" className="form-control" id="cc-number" name="cardNumber" value={cardInfo.cardNumber} onChange={handleChange} placeholder="" required />
                            </div>
                        </div>
                        <div className="row text-black">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-expiration">Expiration</label>
                                <input type="date" className="form-control" id="cc-expiration" name="expiration" value={cardInfo.expiration}
                                       onChange={handleChange} placeholder="" required />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-cvv">CVV</label>
                                <input type="number" className="form-control" id="cc-cvv" name="cvv" value={cardInfo.cvv} onChange={handleChange} placeholder="" required />
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <button className="btn btn-primary btn-lg btn-block cart-button" type="submit" onClick={() => {
                            handleSubmit();
                            onContinueToThankYou();
                        }}>Valider le paiement</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Payment;
