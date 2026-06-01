import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ImageGrid, ImageOverlay } from "@/components";
import { cartAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const navigate = useNavigate();
  const { cart, toggleCart, clearCart } = useUserContext();

  const cartItems = useMemo(() => Array.from(cart.values()), [cart]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.media === "movie" && typeof item.price === "number" ? item.price : 0), 0),
    [cartItems],
  );

  const tax = useMemo(() => subtotal * 0.13, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const handleCheckout = () => {
    clearCart();
    alert(`Thank you for your purchase! Total amount: $${total.toFixed(2)}`);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Cart</h1>
          <p className="text-slate-400 text-sm">
            {cartItems.length} item{cartItems.length === 1 ? "" : "s"}
          </p>
        </div>
        {cartItems.length > 0 && <Button onClick={() => clearCart()}>Clear cart</Button>}
      </div>

      {cartItems.length === 0 ? (
        <p className="mt-10 text-gray-400">Your cart is empty. Add items from movie lists or search results.</p>
      ) : (
        <>
          <ImageGrid images={cartItems} onClick={(image) => navigate(`/${image.media ?? "movie"}/${image.id}/summary`)}>
            {(image) => <ImageOverlay actions={[cartAction((item: ImageCell) => cart.has(item.id), toggleCart)]} image={image} />}
          </ImageGrid>

          <div className="mt-8 space-y-4 rounded-lg border border-gray-700 bg-gray-900 p-6 sm:ml-auto sm:w-80">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tax (13%):</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-gray-700 border-t pt-4 text-lg">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-indigo-400">${total.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout}>Checkout</Button>
          </div>
        </>
      )}
    </section>
  );
};
