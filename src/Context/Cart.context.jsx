import { createContext, useEffect, useState } from "react";
import {
  addProductToCart,
  addProductToWishList,
  deleteAllCart,
  deleteCartItem,
  deleteProductFromWishList,
  getCartItems,
  getWishListItems,
  updateCartItem,
} from "../services/cart-services";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const [wishlist, setWishList] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [loadingProductId, setLoadingProductId] = useState(null);

  const [isError, setIsError] = useState(false);

  const [error, setError] = useState(null);

  // Add Product To Cart
  async function fetchAddProductToCart({ id }) {
    try {
      setLoadingProductId(id);

      const response = await addProductToCart({ id });

      if (response.success) {
        toast.success(response.data.message);

        setCartInfo(response.data);
      }

      return response;
    } catch (error) {
      setIsError(true);

      setError(error);
    } finally {
      setLoadingProductId(null);
    }
  }

  // Get Cart Items
  async function fetchCartItems() {
    try {
      setIsLoading(true);

      const response = await getCartItems();

      if (response.success) {
        setCartInfo(response.data);
      }

      return response;
    } catch (error) {
      setIsError(true);

      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Delete Cart Item
  async function fetchDeleteCartItem({ id }) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will remove the item from your cart!",
        icon: "warning",
        iconColor: "#DB1A1A",
        showCancelButton: true,
        confirmButtonColor: "#DB1A1A",
        cancelButtonColor: "#57595B",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting item...");

        const response = await deleteCartItem({ id });

        if (response.success) {
          toast.dismiss(toastId);

          toast.success(response.data.message);

          setCartInfo(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Update Cart Item
  async function fetchUpdateCartItem({ id, count }) {
    try {
      const toastId = toast.loading("Updating item...");

      const response = await updateCartItem({ id, count });

      if (response.success) {
        toast.dismiss(toastId);

        toast.success(response.data.message);

        setCartInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Delete All cart
  async function fetchDeleteAllCart() {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will remove all your cart!",
        icon: "warning",
        iconColor: "#DB1A1A",
        showCancelButton: true,
        confirmButtonColor: "#DB1A1A",
        cancelButtonColor: "#57595B",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting all items...");

        const response = await deleteAllCart();

        if (response.success) {
          toast.dismiss(toastId);

          toast.success(response.data.message);

          setCartInfo(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // WishList

  async function fetchAddProductToWishList({ id }) {
    try {
      setLoadingProductId(id);

      const response = await addProductToWishList({ id });

      if (response.success) {
        toast.success(response.data.message);

        setWishList(response.data);
      }

      return response;
    } catch (error) {
      setIsError(true);

      setError(error);
    } finally {
      setLoadingProductId(null);
    }
  }

  async function fetchWishListItems(showLoading = true) {
    try {
      if(showLoading = true){
      setIsLoading(true);

      }

      const response = await getWishListItems();

      if (response.success) {
        setWishList(response.data);
      }

      return response;
    } catch (error) {
      setIsError(true);

      setError(error);
    } finally {
      if (showLoading) {
   setIsLoading(false);
}
    }
  }
async function fetchDeleteProductFromWishList({ id }) {
    try {

      const toastId = toast.loading("Deleting item...");

      const response = await deleteProductFromWishList({ id });

      if (response.success) {

        toast.dismiss(toastId);

        toast.success(response.data.message);

        await fetchWishListItems();
      }

    } catch (error) {

      console.log(error);

    }
}


  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartInfo,
        fetchAddProductToCart,
        setCartInfo,
        isLoading,
        fetchCartItems,
        isError,
        error,
        fetchDeleteCartItem,
        fetchUpdateCartItem,
        loadingProductId,
        fetchDeleteAllCart,
        fetchAddProductToWishList,
        fetchWishListItems,
        fetchDeleteProductFromWishList,
        wishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
}