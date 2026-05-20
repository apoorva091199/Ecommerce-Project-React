import { it, expect, describe, vi } from "vitest";
import { render,screen  } from "@testing-library/react";
import { Product} from "./Product";

describe("Product Component", () => {
  it("displays the product details correctly", () => {
    const product = {
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/2-slot-toaster-white.jpg",
      name: "2 Slot Toaster - White",
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      keywords: ["toaster", "kitchen", "appliances"],
    };
    const loadCart = vi.fn();
    render(<Product product={product} loadCart={loadCart} />);

    expect(screen.getByText('2 Slot Toaster - White')).toBeInTheDocument();

    expect(screen.getByText('$18.99')).toBeInTheDocument();

    expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/2-slot-toaster-white.jpg');

    expect(screen.getByTestId('product-rating-stars-image')).toHaveAttribute('src', 'images/ratings/rating-50.png');

    expect(screen.getByText('2197')).toBeInTheDocument();
  });
});
