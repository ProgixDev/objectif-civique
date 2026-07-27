import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getOfferingsMock: vi.fn(),
  purchasePackageMock: vi.fn(),
  configureMock: vi.fn(),
  logInMock: vi.fn(),
  logOutMock: vi.fn(),
}));

vi.mock("react-native", () => ({
  Platform: { OS: "android" },
}));

vi.mock("react-native-purchases", () => ({
  default: {
    getOfferings: mocks.getOfferingsMock,
    purchasePackage: mocks.purchasePackageMock,
    configure: mocks.configureMock,
    logIn: mocks.logInMock,
    logOut: mocks.logOutMock,
  },
}));

import { findPackageForPlan, purchasePlan } from "./revenuecat";

describe("revenuecat purchase flow", () => {
  beforeEach(() => {
    mocks.getOfferingsMock.mockReset();
    mocks.purchasePackageMock.mockReset();
    mocks.configureMock.mockReset();
    mocks.logInMock.mockReset();
    mocks.logOutMock.mockReset();
  });

  it("finds a package by plan id or product id", async () => {
    const planPackage = { identifier: "gold", product: { identifier: "x1" } };
    const productPackage = { identifier: "other", product: { identifier: "vip" } };

    mocks.getOfferingsMock.mockResolvedValue({
      current: {
        availablePackages: [planPackage, productPackage],
      },
    });

    await expect(findPackageForPlan("gold")).resolves.toBe(planPackage);
    await expect(findPackageForPlan("vip")).resolves.toBe(productPackage);
    await expect(findPackageForPlan("missing")).resolves.toBeNull();
  });

  it("returns success when the native purchase resolves", async () => {
    const pkg = { identifier: "gold", product: { identifier: "gold" } };

    mocks.getOfferingsMock.mockResolvedValue({
      current: { availablePackages: [pkg] },
    });
    mocks.purchasePackageMock.mockResolvedValue(undefined);

    await expect(purchasePlan("gold")).resolves.toEqual({
      outcome: "success",
    });
    expect(mocks.purchasePackageMock).toHaveBeenCalledWith(pkg);
  });

  it("returns a canceled outcome when the SDK reports a user cancel", async () => {
    const pkg = { identifier: "gold", product: { identifier: "gold" } };

    mocks.getOfferingsMock.mockResolvedValue({
      current: { availablePackages: [pkg] },
    });
    mocks.purchasePackageMock.mockRejectedValue({ userCancelled: true });

    await expect(purchasePlan("gold")).resolves.toEqual({
      outcome: "canceled",
    });
  });

  it("returns an error when the package cannot be found", async () => {
    mocks.getOfferingsMock.mockResolvedValue({ current: { availablePackages: [] } });

    await expect(purchasePlan("gold")).resolves.toEqual({
      outcome: "error",
      message: "Ce forfait n'est pas disponible pour le moment.",
    });
  });
});