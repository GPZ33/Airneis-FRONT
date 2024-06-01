import React, {useEffect, useState} from "react";
import "./Orders.css";
import {Link} from "react-router-dom";
import {apiService} from "../../service/apiService";


const Orders = () => {
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState([]);

    //get orders of user
    useEffect(() => {
        apiService.getOrdersOfUser(token).then(result => {
            setOrders(result["hydra:member"]);
        })
    }, []);

    const ordersByYear = orders.reduce((orderedOrders, order) => {
        const year = new Date(order.date).getFullYear();
        if (!orderedOrders[year]) {
            orderedOrders[year] = [];
        }
        orderedOrders[year].push(order);
        return orderedOrders;
    }, {});

    // Sort years in descending order
    const sortedYears = Object.keys(ordersByYear).sort((a, b) => b - a);

    return (
        <div className="orders-page container mt-5">
            <div className="my-5">
                <h3 className="text-center">Mes commandes</h3>
            </div>
            {sortedYears.map(year => (
                <div key={year}>
                    <div className="my-2">
                        <h4>{year}</h4>
                        <hr/>
                    </div>
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10">
                            <div className="rounded">
                                <div className="table-responsive table-borderless">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="text-center">
                                                <div className="toggle-btn">
                                                    <div className="inner-circle"></div>
                                                </div>
                                            </th>
                                            <th>N°</th>
                                            <th>Date</th>
                                            <th>Quantité</th>
                                            <th>Prix</th>
                                            <th>Etat</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-body">
                                        {ordersByYear[year].map(order => (
                                            <tr key={order.id} className="cell-1">
                                                <td className="text-center">
                                                    <div className="toggle-btn">
                                                        <div className="inner-circle"></div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="order-link">
                                                        <Link to={`/orders/${order.id}`}>{order.id}</Link>
                                                    </div>
                                                </td>
                                                <td>{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                                                <td>{order.orderProducts.reduce((acc, product) => acc + product.quantity, 0)}</td>
                                                <td>{order.priceTotal} €</td>
                                                <td>{order.state}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>

    )
};

export default Orders;