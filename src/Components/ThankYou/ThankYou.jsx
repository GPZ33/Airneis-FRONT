import {Link} from "react-router-dom";
import React from "react";


const ThankYou = () => {
    const orderId = localStorage.getItem("orderId");


    return (
        <section className="h-100 gradient-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h3 className="mb-0 text-center">Commande effectuée !</h3>
                            </div>

                            <div className="card-body text-center">
                                <h5>Merci de votre achat !</h5>
                                <h5>Votre commande a bien été enregistrée sous le numéro {orderId}.</h5>
                                <h5>Vous pouvez suivre son état depuis votre espace client.</h5>
                            </div>

                            <div className="card-body d-flex justify-content-center">
                                <Link to="/">
                                    <button type="button"
                                            className="cart-button btn btn-primary btn-lg btn-block "
                                    >Continuer mes achats
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ThankYou;