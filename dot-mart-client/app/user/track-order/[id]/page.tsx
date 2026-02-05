"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  MapPin,
} from "lucide-react";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  shippingAddress: string;
  items: OrderItem[];
};

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = String(params?.id || "");

  // Demo order (replace with API)
  const order: Order = {
    id: orderId,
    status: "shipped",
    createdAt: "2026-01-14",
    estimatedDelivery: "2026-01-16",
    shippingAddress: "123 Gift Street, Love City, LC 12345",
    items: [
      {
        _id: "1",
        name: "Wireless Mouse",
        price: 25,
        quantity: 1,
        image:
          "https://www.startech.com.bd/image/cache/catalog/mouse/havit/ms989gt/ms989gt-black-blue-002-500x500.webp",
      },
      {
        _id: "2",
        name: "Gaming Keyboard",
        price: 45,
        quantity: 2,
        image:
          "https://www.startech.com.bd/image/cache/catalog/keyboard/havit/hv-kb488l/hv-kb488l-01-500x500.webp",
      },
    ],
  };

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const steps = [
    {
      key: "processing",
      title: "Order Processing",
      desc: "We are preparing your order",
      icon: Clock,
    },
    {
      key: "shipped",
      title: "Shipped",
      desc: "Your order is on the way",
      icon: Truck,
    },
    {
      key: "delivered",
      title: "Delivered",
      desc: "Order delivered successfully",
      icon: CheckCircle2,
    },
  ] as const;

  const currentStepIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="w-[90%] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Track Order
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Order ID:{" "}
              <span className="font-semibold text-gray-900">{order.id}</span>
            </p>
          </div>

          <Link
            href="/orders"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium
              hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-blue-100 to-green-100 text-blue-600"
                >
                  <Package className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Delivery Status
                  </h2>
                  <p className="text-sm text-gray-600">
                    Estimated Delivery:{" "}
                    <span className="font-semibold text-gray-900">
                      {order.estimatedDelivery}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const active = index <= currentStepIndex;

                  return (
                    <div key={step.key} className="flex items-start gap-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0
                          ${
                            active
                              ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                      >
                        <StepIcon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            active ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            active ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {step.desc}
                        </p>

                        {index !== steps.length - 1 && (
                          <div className="mt-4 h-6 border-l border-gray-200 ml-5" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Order Items</h2>

              <div className="mt-5 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border rounded-2xl p-4 bg-gray-50"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Order Date</span>
                <span className="font-medium text-gray-900">
                  {order.createdAt}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-semibold text-blue-600 capitalize">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between border-t pt-3">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 rounded-2xl border bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <MapPin className="h-4 w-4 text-blue-600" />
                Shipping Address
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {order.shippingAddress}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center w-full rounded-full
                  bg-gradient-to-r from-blue-600 to-green-600
                  text-white py-3 font-semibold
                  hover:from-blue-700 hover:to-green-700 transition"
              >
                Continue Shopping →
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full rounded-full
                  border border-gray-300 py-3 font-semibold text-gray-800
                  hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Need Help? Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// /track-order/DOR - 20260114 - 001;
// fetch(/api/orders/:id)
