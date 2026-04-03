"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setCart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  rollbackCart,
} from "@/store/slices/cartSlice";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "react-toastify";
import Link from "next/link";
import { CartItem } from "@/store/slices/cartSlice";
import Loader from "@/components/ui/loader";

export default function Cart({ userId }: { userId: number }) {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity, lastSyncedAt } = useSelector(
    (state: RootState) => state.cart,
  );
  const [loading, setLoading] = useState(true);

  const snapshotRef = useRef(items);
  const debouncedItems = useDebounce(items, 600);
  const isMounted = useRef(false);

  useEffect(() => {
    const STALE_THRESHOLD = 5 * 60 * 1000; // 5 minutes
    const isStale =
      !lastSyncedAt || Date.now() - lastSyncedAt > STALE_THRESHOLD;

    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart/get");
        const data = await res.json();

        // console.log(data.data)

        const mapped: CartItem[] = data?.data?.map((item: any) => ({
          cartItemId: item.id,
          productId: item.productId,
          qty: item.qty,
          product: {
            name: item.product.name,
            image: item.product.image,
            price: Number(item.product.sellingPrice),
            stock: Number(item.product.stock),
          },
        }));

        dispatch(setCart(mapped));
        snapshotRef.current = mapped;
      } catch (error) {
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
        isMounted.current = true;
      }
    };

    if (isStale) {
      fetchCart();
    } else {
      snapshotRef.current = items;
      setLoading(false);
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) return;

    const syncWithDB = async () => {
      try {
        await Promise.all(
          debouncedItems.map((item) =>
            fetch("/api/cart/update-qty", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cartItemId: item.cartItemId,
                qty: item.qty,
              }),
            }),
          ),
        );
        snapshotRef.current = debouncedItems;
      } catch {
        dispatch(rollbackCart(snapshotRef.current));
        toast.error("Failed to sync cart, changes reverted");
      }
    };

    syncWithDB();
  }, [debouncedItems]);

  const handleAdd = (item: CartItem) => {
    if (item.qty >= item.product.stock) {
      toast.error("Cannot add more, stock limit reached");
      return;
    }

    dispatch(
      addToCart({
        cartItemId: item.cartItemId,
        productId: item.productId,
        qty: 1,
        product: {
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          stock: item.product.stock,
        },
      }),
    );
  };

  const handleDecrease = async (item: CartItem) => {
    if (item.qty === 1) {
      await handleRemove(item);
      return;
    }
    dispatch(decreaseQuantity(item.productId));
  };

  const handleRemove = async (item: CartItem) => {
    const snapshot = [...items];
    dispatch(removeFromCart(item.productId));

    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: item.cartItemId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();

      snapshotRef.current = snapshot.filter(
        (i) => i.productId !== item.productId,
      );
      toast.success("Item removed from cart");
    } catch {
      dispatch(rollbackCart(snapshot));
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          items: snapshotRef.current.map((item) => ({
            name: item.product.name,
            price: item.product.price,
            qty: item.qty,
            productId: item.productId,
          })),
        }),
      });

      const data = await res.json();

      if (!data.url) {
        toast.error("Checkout failed. Please try again.");
      } else {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error("Something went wrong during checkout.");
    }
  };

  if (loading) {
    return (
      <div className="bg-transparent min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background:
            "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #1a0e3a 100%)",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
          .font-display { font-family: 'Syne', sans-serif; }
          .font-body { font-family: 'DM Sans', sans-serif; }
        `}</style>
        <div className="text-center">
          <div
            className="w-28 h-28 mx-auto mb-8 rounded-3xl flex items-center justify-center text-5xl border border-white/10"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            🛒
          </div>
          <h2 className="font-display text-4xl font-black text-white mb-3">
            Cart is Empty
          </h2>
          <p className="font-body text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
            Looks like you haven't added anything yet. Browse our collection and
            find something you love!
          </p>
          <Link href="/shop">
            <button
              className="px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
              style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}
            >
              Browse Store →
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-4 md:px-10 py-16"
      style={{
        background:
          "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #1a0e3a 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .gradient-text {
          background: linear-gradient(90deg,#a78bfa,#f472b6,#fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-glow:hover { box-shadow: 0 0 35px rgba(167,139,250,0.15); }
      `}</style>

      <section className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-purple-400 font-semibold mb-3">
          Review & Checkout
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-black text-white">
          Your <span className="gradient-text">Cart</span>
        </h1>
        <p className="font-body text-gray-500 mt-3">
          {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} waiting for you
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="group flex gap-5 p-5 rounded-3xl border border-white/10 hover:border-purple-500/30 card-glow transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-xs text-purple-400 font-semibold uppercase tracking-widest">
                  Product
                </span>
                <h3 className="font-display text-white font-bold text-base mt-0.5 truncate">
                  {item.product.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-white text-sm font-semibold">
                    ₹{item.product.price}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="w-8 h-8 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-all duration-200 font-bold text-lg flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    −
                  </button>
                  <span className="font-display text-white font-bold w-6 text-center text-sm">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="w-8 h-8 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-all duration-200 font-bold text-lg flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between flex-shrink-0">
                <p className="font-display text-white font-black text-lg">
                  ₹{(item.product.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item)}
                  className="text-xs text-gray-600 hover:text-red-400 transition-colors duration-200 flex items-center gap-1 mt-2"
                >
                  <span>✕</span> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className="h-fit rounded-3xl border border-white/10 p-7 sticky top-24"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <h2 className="font-display text-white font-black text-2xl mb-6">
            Summary
          </h2>

          <div className="space-y-3 mb-5">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center"
              >
                <span className="font-body text-gray-500 text-sm truncate max-w-[140px]">
                  {item.product.name}{" "}
                  <span className="text-gray-600">×{item.qty}</span>
                </span>
                <span className="text-gray-400 text-sm font-semibold">
                  ₹{(item.product.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-5 space-y-3">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span className="text-gray-400">₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="text-emerald-400 font-semibold">Free</span>
            </div>
          </div>

          <div className="border-t border-white/10 my-5" />

          <div className="flex justify-between items-center mb-6">
            <span className="font-display text-white font-bold text-lg">
              Total
            </span>
            <span
              className="font-display font-black text-2xl text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg,#a78bfa,#f472b6)",
              }}
            >
              ₹{totalAmount.toFixed(2)}
            </span>
          </div>

          <button
            className="w-full py-4 rounded-2xl font-display font-bold text-white hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl text-base"
            style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}
            onClick={handleCheckout}
          >
            Proceed to Checkout →
          </button>

          <Link href="/shop">
            <button className="w-full mt-3 py-3 rounded-2xl text-sm font-semibold text-gray-500 border border-white/10 hover:border-purple-500/30 hover:text-gray-300 transition-all duration-200">
              ← Continue Shopping
            </button>
          </Link>

          <div className="mt-6 flex justify-center gap-4 text-center">
            {[
              ["🔒", "Secure"],
              ["↩️", "Free Returns"],
              ["⚡", "Fast Ship"],
            ].map(([icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-lg">{icon}</span>
                <span className="text-gray-600 text-[10px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
