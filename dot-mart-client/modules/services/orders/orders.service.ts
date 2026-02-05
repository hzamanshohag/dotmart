"use server";

import { OrderStatus, PaymentStatus } from "@/modules/Type/order.types";
import { cookies } from "next/headers";

const BASE_URL = `${process.env.BACKEND_URL}`;

/** ✅ Get token from cookies */
const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

/** ✅ Auth headers */
const authHeaders = async () => {
  const token = await getToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `${token}` } : {}),
  };
};

/** ✅ Create Order */
export const createOrder = async (payload: any) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      ...(await authHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json();
};


/** ✅ Get User Orders */
export const getUserOrders = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/orders/user/${userId}`, {
    method: "GET",
    headers: await authHeaders(),
    cache: "no-store",
  });

  return res.json();
};



/** ✅ Get All Orders (Admin) */
export const getAllOrdersAdmin = async () => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    headers: await authHeaders(),
    cache: "no-store",
  });

  return res.json();
};

/** ✅ Get Single Orders (Admin) */
export const getSinglelOrdersAdmin = async (orderId: string) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "GET",
    headers: await authHeaders(),
    cache: "no-store",
  });

  return res.json();
};

/** ✅ Update Order Status (Admin) */
export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  return res.json();
};

/** ✅ Update Payment Status (Admin) */
export const updatePaymentStatus = async (
  orderId: string,
  status: PaymentStatus
) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/payment`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  return res.json();
};
