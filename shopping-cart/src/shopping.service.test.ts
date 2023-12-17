import { ShoppingCart, ShoppingService } from "./shopping.service";

const getProductStub = () => {
  return {
    name: "comb",
    primeEligible: true,
  };
};

const getShoppingCartStub = () => {
  return {
    products: [
      {
        name: "comb",
        primeEligible: false,
      },
      {
        name: "pin",
        primeEligible: false,
      },
    ],
  };
};

describe("ShoppingSerivce", () => {
  let shoppingService: ShoppingService;

  beforeEach(() => {
    shoppingService = new ShoppingService();
  });

  it("should have service defined", () => {
    expect(shoppingService).toBeDefined();
  });

  it("should have calculateShippingCost defined", () => {
    expect(shoppingService.calculateShipping).toBeDefined();
  });

  it("should return shipping cost $7 for two products", () => {
    const shoppingCart = getShoppingCartStub();

    expect(shoppingService.calculateShipping(shoppingCart, false)).toBe(7);
  });

  it("should return a minimum of $4.99 even on one product for non prime member", () => {
    const shoppingCart: ShoppingCart = {
      products: [getProductStub()],
    };

    expect(shoppingService.calculateShipping(shoppingCart, false)).toBe(4.99);
  });

  it("should return $7 for containing two prime eligible products in the cart of non prime member", () => {
    const shoppingCart: ShoppingCart = {
      products: [
        {
          name: "comb",
          primeEligible: true,
        },
        {
          name: "pin",
          primeEligible: true,
        },
      ],
    };

    expect(shoppingService.calculateShipping(shoppingCart,false)).toBe(7);
  });

  it("should return $7 for containing two non prime eligible products in the cart of non prime member",()=>{
    const shoppingCart = getShoppingCartStub();

    expect(shoppingService.calculateShipping(shoppingCart,false)).toBe(7);
  })

  it("should return 0 shipping cost for prime members containing only prime eligible products", () => {
    const shoppingCart = {
      products: [
        {
          name: "pin",
          primeEligible: true,
        },
        {
          name: "comb",
          primeEligible: true,
        },
      ],
    };

    expect(shoppingService.calculateShipping(shoppingCart, true)).toBe(0);
  });

  it("should return minimum cost for prime member holding one prime eligible product and one non prime eligible product", () => {
    const shoppingCart: ShoppingCart = {
      products: [
        {
          name: "pin",
          primeEligible: false,
        },
        {
          name: "comb",
          primeEligible: true,
        },
      ],
    };

    const expectedShippingCost = shoppingService.getMinimumShippingCost();

    expect(shoppingService.calculateShipping(shoppingCart, true)).toBe(
      expectedShippingCost
    );
  });

  it("should return $7 for holding two non prime eligible products", () => {
    const shoppingCart: ShoppingCart = {
      products: [
        {
          name: "pin",
          primeEligible: false,
        },
        {
          name: "comb",
          primeEligible: false,
        },
      ],
    };

    expect(shoppingService.calculateShipping(shoppingCart, true)).toBe(7);
  });
});
