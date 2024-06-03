import "./Contact.css";

const Contact = () => {
    return (
        <section className="mb-4 p-5">

            <h2 className="h1-responsive font-weight-bold text-center my-4">Contactez-nous</h2>
            <p className="text-center w-responsive mx-auto mb-5">Vous avez des questions ? N'hésitez pas à nous contacter directement. Notre équipe reviendra vers vous dans les plus brefs délais pour vous aider.</p>

            <div className="row">

                <div className="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                        <div className="row p-2">

                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="name" className="">Votre nom</label>
                                    <input type="text" id="name" name="name" className="form-control"/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="email" className="">Votre email</label>
                                    <input type="text" id="email" name="email" className="form-control"/>
                                </div>
                            </div>

                        </div>

                        <div className="row p-2">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <label htmlFor="subject" className="">Sujet</label>
                                    <input type="text" id="subject" name="subject" className="form-control"/>
                                </div>
                            </div>
                        </div>

                        <div className="row p-2">

                            <div className="col-md-12">

                                <div className="md-form">
                                    <label htmlFor="message">Votre message</label>
                                    <textarea type="text" id="message" name="message" rows="2"
                                              className="form-control md-textarea"></textarea>
                                </div>

                            </div>
                        </div>

                    </form>

                    <div className="text-center text-md-left p-2">
                        <a className="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Envoyer</a>
                    </div>
                    <div className="status"></div>
                </div>

                <div className="col-md-3 text-center p-5">
                    <ul className="list-unstyled mb-0">
                        <li><i className="fas fa-map-marker-alt fa-2x"></i>
                            <p>27-33 Av. des Champs-Élysées<br/>75008, Paris, France</p>
                        </li>

                        <li><i className="fas fa-phone mt-4 fa-2x"></i>
                            <p>01 00 00 00 00</p>
                        </li>

                        <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                            <p>airneis@hotmail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Contact;
