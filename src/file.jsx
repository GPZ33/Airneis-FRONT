// <section className="cart-container">
//     <div className="container h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col">
//                 <div className="shopping-cart-header">
//                     <h2>Shopping Cart</h2>
//                     <span className="h4">({totalItems} items in your cart)</span>
//                 </div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-6">
//                             {imageData.length > 0 ? (
//                                 <>
//                                     {cart.map((item, index) => (
//                                         <article className="flex-column" key={index}>
//                                             <div className="cart-photo">
//                                                 <img
//                                                     src={apiUrl + imageData[index].contentUrl}
//                                                     alt={item.name}
//                                                 />
//                                             </div>
//                                             <div className="cart-description">
//                                                 <h2>{item.name}</h2>
//                                                 <h4>{item.description}</h4>
//                                             </div>
//                                             <div className="cart-price">
//                                                 <h2>{item.price}</h2>
//                                                 <button
//                                                     className="btn btn-light ms-2"
//                                                     onClick={() => incrementQuantity(item.id)}
//                                                 >
//                                                     +
//                                                 </button>
//                                                 <p className="lead fw-normal mb-0">{item.quantity}</p>
//                                                 <button
//                                                     className="btn btn-light me-2"
//                                                     onClick={() => decrementQuantity(item.id)}
//                                                 >
//                                                     -
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-danger"
//                                                     onClick={() => removeFromCart(item.id)}
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </article>
//                                     ))}
//                                 </>
//                             ) : (
//                                 <p>Une erreur s'est produite</p>
//                             )}
//                         </div>
//                         <div className="col-6">
//                             {/* Add content for the right side of the cart */}
//                             TWO
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card mb-5">
//                     <div className="card-body p-4">
//                         <div className="float-end">
//                             <p className="mb-0 me-5 d-flex align-items-center">
//                                 <span className="small text-muted me-2">Order total:</span>
//                                 <span className="lead fw-normal">${calculateTotal()}</span>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="d-flex justify-content-end">
//                     <button type="button" className="btn btn-light btn-lg me-2">
//                         Continue shopping
//                     </button>
//                     <button type="button" className="btn btn-primary btn-lg">
//                         Checkout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>