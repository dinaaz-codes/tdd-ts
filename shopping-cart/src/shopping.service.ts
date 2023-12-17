export type ShoppingCart = {
  products: Product[];
};

export type Product = {
  name: string;
  primeEligible: boolean;
};

export class ShoppingService {
  private minimumShippingCost = 4.99;
  private costPerProduct = 3.5;

  /**
   * Fetches cost per product for a given  item in the shopping cart
   *
   * @returns cost per product
   */
  getCostPerProduct() {
    return this.costPerProduct;
  }

  /**
   * Fetches minimum shipping cost for a given shopping cart
   *
   * @returns minimum shipping cost
   */
  getMinimumShippingCost() {
    return this.minimumShippingCost;
  }

  private stripFreeShippingProducts(products: Product[]) {
    return products.filter((product) => !product.primeEligible);
  }

  /**
   * Calculates the shipping cost for a given shopping cart.
   *
   * @param cart Shopping cart with items
   * @param isPrime Boolean flag that tells if customer is prime member
   * @returns Total cost of shipping
   */
  calculateShipping(cart: ShoppingCart, isPrime: boolean): number {
    const costPerProduct = this.getCostPerProduct();
    const minimumCost = this.getMinimumShippingCost();
    let eligibleForShippingCost = cart.products;

    if (isPrime) {
      eligibleForShippingCost = this.stripFreeShippingProducts(cart.products);
    }

    const noOfProducts = eligibleForShippingCost.length;

    if (noOfProducts == 0) return 0;

    const calculatedCost = noOfProducts * costPerProduct;

    if (calculatedCost > minimumCost) {
      return calculatedCost;
    }

    return minimumCost;
  }
}
