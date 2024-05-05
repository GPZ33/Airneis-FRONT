import React from 'react';
import { useCart } from '../../Context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    const calculateTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        return (<section className="cart-container">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        {/* Header */}
                        <div className="shopping-cart-header">
                            <h2>Shopping Cart</h2>
                            <span className="h4">Your cart is empty</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    } else {
        return (
            <section className="cart-container">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            {/* Header */}
                            <div className="shopping-cart-header">
                                <h2>Shopping Cart</h2>
                                <span className="h4">({totalItems} items in your cart)</span>
                            </div>

                            {/* Products in the cart list */}
                            <div className="card mb-4">
                                <div className="card-body p-4">
                                    {cart.map((item, index) => (
                                        <div className="row align-items-center" key={index}>
                                            <div className="col-md-2">
                                                <img
                                                    src={item.img[0]}
                                                    className="img-fluid"
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted mb-4 pb-2">Name</p>
                                                    <p className="lead fw-normal mb-0">{item.name}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted mb-4 pb-2">Quantity</p>
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn btn-light me-2"
                                                            onClick={() => decrementQuantity(item.id)}
                                                        >
                                                            -
                                                        </button>
                                                        <p className="lead fw-normal mb-0">{item.quantity}</p>
                                                        <button
                                                            className="btn btn-light ms-2"
                                                            onClick={() => incrementQuantity(item.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted mb-4 pb-2">Price</p>
                                                    <p className="lead fw-normal mb-0">${item.price}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted mb-4 pb-2">Total</p>
                                                    <p className="lead fw-normal mb-0">${item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card mb-5">
                                <div className="card-body p-4">
                                    <div className="float-end">
                                        <p className="mb-0 me-5 d-flex align-items-center">
                                            <span className="small text-muted me-2">Order total:</span>
                                            <span className="lead fw-normal">${calculateTotal()}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-light btn-lg me-2">
                                    Continue shopping
                                </button>
                                <button type="button" className="btn btn-primary btn-lg">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Cart;
