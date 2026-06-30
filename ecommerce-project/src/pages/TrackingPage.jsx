import { Header } from "../components/Header";
import "./TrackingPage.css";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);

  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");

  useEffect(() => {
    const getTrackingData = async () => {
      if (!orderId) {
        setOrder(null);
        return;
      }

      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };

    getTrackingData();
  }, [orderId]);

  let trackedProduct = null;
  if (order && productId) {
    trackedProduct = order.products.find(
      (product) => product.productId === productId,
    );
  }

  let progressPercent = 0;
  if (order && trackedProduct) {
    const progress =
      ((Date.now() - order.orderTimeMs) /
        (trackedProduct.estimatedDeliveryTimeMs - order.orderTimeMs)) *
      100;

    progressPercent = Math.max(0, Math.min(progress, 100));
  }

  let currentStatus = "Preparing";
  if (progressPercent >= 100) {
    currentStatus = "Delivered";
  } else if (progressPercent >= 50) {
    currentStatus = "Shipped";
  }

  return (
    <>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link to="/orders" className="back-to-orders-link link-primary">
            View all orders
          </Link>

          {!trackedProduct && (
            <div className="product-info">Tracking details were not found.</div>
          )}

          {trackedProduct && (
            <>
              <div className="delivery-date">
                Arriving on{" "}
                {dayjs(trackedProduct.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="product-info">{trackedProduct.product.name}</div>

              <div className="product-info">
                Quantity: {trackedProduct.quantity}
              </div>

              <img
                className="product-image"
                src={trackedProduct.product.image}
              />

              <div className="progress-labels-container">
                <div
                  className={`progress-label ${currentStatus === "Preparing" ? "current-status" : ""}`}
                >
                  Preparing
                </div>
                <div
                  className={`progress-label ${currentStatus === "Shipped" ? "current-status" : ""}`}
                >
                  Shipped
                </div>
                <div
                  className={`progress-label ${currentStatus === "Delivered" ? "current-status" : ""}`}
                >
                  Delivered
                </div>
              </div>

              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
