

const Payment = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");


    return (
        <section className="payment-page container py-5">
            <div className="card mb-4">
                <h4 className="mb-3 card-header py-3">Payment</h4>
                <div className="card-body">
                    <div className="d-block mb-3">
                        <div className="custom-control custom-radio">
                            <input id="credit" name="paymentMethod" type="radio" className="custom-control-input"
                                   required=""/>
                            <label className="custom-control-label" htmlFor="credit">Carte de crédit</label>
                        </div>
                        <div className="custom-control custom-radio pt-2">
                            <input id="debit" name="paymentMethod" type="radio" className="custom-control-input"
                                   required=""/>
                            <label className="custom-control-label" htmlFor="debit">Carte de débit</label>
                        </div>
                        <div className="custom-control custom-radio pt-2">
                            <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input"
                                   required=""/>
                            <label className="custom-control-label" htmlFor="paypal">PayPal</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cc-name">Nom sur la carte</label>
                            <input type="text" className="form-control" id="cc-name" placeholder="" required=""/>
                            <small className="text-muted">Nom complet tel qu'indiqué sur la carte</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cc-number">Numéro de carte</label>
                            <input type="text" className="form-control" id="cc-number" placeholder="" required=""/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="cc-expiration">Expiration</label>
                            <input type="text" className="form-control" id="cc-expiration" placeholder="" required=""/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="cc-cvv">CVV</label>
                            <input type="text" className="form-control" id="cc-cvv" placeholder="" required=""/>
                        </div>
                    </div>
                    <hr className="mb-4"/>
                    <button className="btn btn-primary btn-lg btn-block cart-button" type="submit">Commander</button>
                </div>
                </div>
        </section>
)
};

export default Payment;
