"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";

import { useUser } from "@/modules/context/UserContext";
import {
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearUserCart,
} from "@/modules/services/cart/cart.service";
import { createOrder } from "@/modules/services/orders/orders.service";

type CartItemType = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images?: string[];
    stock?: boolean;
  };
  quantity: number;
};

export default function CartPage() {
  const { userInfo } = useUser();

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [openClearConfirm, setOpenClearConfirm] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [confirming, setConfirming] = useState(false);

  /* ---------------- FETCH CART ---------------- */
  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const res = await getUserCart(userInfo?._id as string);
      const list = res?.data?.items || [];
      setCartItems(Array.isArray(list) ? list : []);
    } catch {
      toast.error("Failed to load cart ❌");
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?._id) fetchCart();
  }, [userInfo?._id]);

  /* ---------------- QUANTITY ---------------- */
  const updateQtyOptimistic = async (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity: qty } : i)),
    );

    const res = await updateCartItem(id, qty);
    if (!res?.status) fetchCart();
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [cartItems],
  );

  const total = subtotal;

  /* ---------------- EMPTY CART ---------------- */
  if (!cartLoading && cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white border rounded-3xl p-8 text-center shadow-sm max-w-md w-full">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-green-100 text-blue-600">
            <ShoppingBag className="h-7 w-7" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Add some products to continue shopping.
          </p>

          <Link
            href="/products"
            className="
              mt-6 block w-full rounded-full py-3 font-semibold text-white
              bg-gradient-to-r from-blue-600 to-green-600
              hover:from-blue-700 hover:to-green-700 transition
            "
          >
            Continue Shopping →
          </Link>
        </div>
      </section>
    );
  }

  /* ---------------- PAGE ---------------- */
  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="w-[90%] mx-auto px-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Review your items before ordering
            </p>
          </div>

          <button
            onClick={() => setOpenClearConfirm(true)}
            className="rounded-full px-5 py-2 text-sm border hover:bg-blue-50 hover:text-blue-600"
          >
            Clear Cart
          </button>
        </div>

        {/* LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const img = item.product.images?.[0] || "/placeholder.png";

              return (
                <div
                  key={item._id}
                  className="bg-white border rounded-2xl p-4 flex gap-4 shadow-sm"
                >
                  <div className="relative w-28 h-28 bg-gray-50 rounded-xl overflow-hidden">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.product.name}
                    </h3>

                    <p className="mt-1 font-bold text-gray-900">
                      ${item.product.price}
                    </p>

                    <div className="mt-4 inline-flex items-center overflow-hidden rounded-full border bg-white shadow-sm">
                      {/* Minus */}
                      <button
                        onClick={() =>
                          updateQtyOptimistic(
                            item._id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="
      h-10 w-10 flex items-center justify-center
      text-gray-600
      hover:bg-blue-50 hover:text-blue-600
      transition
      disabled:opacity-40 disabled:cursor-not-allowed
    "
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      {/* Quantity */}
                      <span className="min-w-[42px] text-center font-semibold text-gray-900 select-none">
                        {item.quantity}
                      </span>

                      {/* Plus */}
                      <button
                        onClick={() =>
                          updateQtyOptimistic(item._id, item.quantity + 1)
                        }
                        className="
      h-10 w-10 flex items-center justify-center
      text-gray-600
      hover:bg-blue-50 hover:text-blue-600
      transition
    "
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeCartItem(item._id).then(fetchCart)}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <Trash2 />
                  </button>
                </div>
              );
            })}
          </div>

          {/* SUMMARY */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="mt-4 flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setOpenOrderModal(true)}
              className="
                mt-6 w-full rounded-full py-3 font-semibold text-white
                bg-gradient-to-r from-blue-600 to-green-600
                hover:from-blue-700 hover:to-green-700 transition
              "
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* CLEAR CONFIRM */}
      {openClearConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-lg">Clear all items?</h3>
            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setOpenClearConfirm(false)}
                className="w-full rounded-full py-3 border"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await clearUserCart(userInfo?._id as string);
                  setCartItems([]);
                  setOpenClearConfirm(false);
                }}
                className="w-full rounded-full py-3 bg-red-600 text-white hover:bg-red-700"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER MODAL */}
      {openOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-4 flex justify-between border-b">
              <h3 className="font-bold">Confirm Order</h3>
              <button onClick={() => setOpenOrderModal(false)}>
                <X />
              </button>
            </div>

            <div className="p-4">
              <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
            </div>

            <div className="p-4 border-t flex gap-3">
              <button
                onClick={() => setOpenOrderModal(false)}
                className="w-full border rounded-full py-3"
              >
                Cancel
              </button>
              <button
                disabled={confirming}
                onClick={async () => {
                  setConfirming(true);
                  await createOrder({
                    user: userInfo?._id,
                    items: cartItems.map((i) => ({
                      product: i.product._id,
                      quantity: i.quantity,
                      price: i.product.price,
                    })),
                    totalAmount: total,
                  });
                  await clearUserCart(userInfo?._id as string);
                  setCartItems([]);
                  setOpenOrderModal(false);
                  setConfirming(false);
                  toast.success("Order placed successfully 🎉");
                }}
                className="
                  w-full rounded-full py-3 font-semibold text-white
                  bg-gradient-to-r from-blue-600 to-green-600
                  hover:from-blue-700 hover:to-green-700
                "
              >
                {confirming ? "Confirming..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
