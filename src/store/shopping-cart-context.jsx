import { createContext } from "react";

export const CartContext = createContext({
  //this is only for better auto-completion.
  //So, is no matter other than this.
  items: [],
  // this also dummy function
  // never gonna use
  // just for autocompletion.
  addItemToCart: () => {},
});
