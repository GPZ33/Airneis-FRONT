import React, {createContext, useState, useContext, useEffect} from 'react';

// Create a context for the cart
const CartContext = createContext();

// Provide the context with the necessary functions
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex((item) => item.id === product.id);
            if (productIndex >= 0) {
                // If the product is already in the cart, increase the quantity
                const updatedCart = [...prevCart];
                updatedCart[productIndex].quantity += 1;
                return updatedCart;
            } else {
                // If not, add the product with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
    const incrementQuantity = (productId) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const productIndex = updatedCart.findIndex((item) => item.id === productId);
            if (productIndex >= 0) {
                updatedCart[productIndex].quantity += 1;
            }
            return updatedCart;
        });
    };

    const decrementQuantity = (productId) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const productIndex = updatedCart.findIndex((item) => item.id === productId);

            if (productIndex >= 0) {
                updatedCart[productIndex].quantity -= 1;

                // If quantity becomes zero, remove the item from the cart
                if (updatedCart[productIndex].quantity === 0) {
                    return updatedCart.filter((item) => item.id !== productId);
                }
            }
            return updatedCart;
        });
    };
// Load cart items from localStorage when component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart items to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
const useCart = () => {
    return useContext(CartContext);
};

export { CartProvider, useCart };
