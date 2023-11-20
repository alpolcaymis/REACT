import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";

import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header
      // cart={shoppingCart}
      // onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop />
    </CartContextProvider>
  );
}

export default App;
