"use client";

import Link from "next/link";
import { CheckCircle2, Package, Home, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  const orderId = "ORD-20260114-001";
  const estimatedDelivery = "2-3 Days";

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl bg-white border rounded-3xl shadow-sm p-8 md:p-10 text-center">
        {/* Success Icon */}
        {/* <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl
          bg-gradient-to-br from-blue-100 to-green-100 text-blue-600"
        >
          <CheckCircle2 className="h-8 w-8" />
        </div> */}

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-5">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Thank you for your purchase! Your order has been confirmed and will be
          processed shortly.
        </p>

        {/* Order Info */}
        <div className="mt-6 rounded-2xl border bg-gray-50 p-5 text-left">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-sm font-semibold text-gray-900">{orderId}</p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm text-gray-600">Estimated Delivery</p>
            <p className="text-sm font-semibold text-gray-900">
              {estimatedDelivery}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <Package className="h-4 w-4 text-blue-600" />
            <span>
              We’ll notify you via SMS or email when your order is shipped.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center gap-2 rounded-full
              border border-gray-300 py-3 font-semibold text-gray-800
              hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <ShoppingBag className="h-5 w-5" />
            Track Order
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full
              bg-gradient-to-r from-blue-600 to-green-600
              text-white py-3 font-semibold
              hover:from-blue-700 hover:to-green-700 transition"
          >
            <Home className="h-5 w-5" />
            Continue Shopping
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-6">
          Need help? Our support team is always here for you 💙
        </p>
      </div>
    </section>
  );
}
