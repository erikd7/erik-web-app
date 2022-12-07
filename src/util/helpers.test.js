import helpers from "./helpers";

describe("splitter suite", () => {
  it("should split 4 ways nice math", () => {
    const perPersonBalance = { a: 15, b: 5, c: -5, d: -15 };

    const result = helpers.splitter(perPersonBalance);

    expect(result).toMatchObject({
      c: [{ amount: 5, to: "b" }],
      d: [{ amount: 15, to: "a" }]
    });
  });

  it("should split 3 ways", () => {
    const perPersonBalance = { a: 16, b: -29, c: 13 };

    const result = helpers.splitter(perPersonBalance);

    expect(result).toMatchObject({
      b: [
        { amount: 16, to: "a" },
        { amount: 13, to: "c" }
      ]
    });
  });

  it("should split 4 ways", () => {
    const perPersonBalance = { a: 16, b: -29, c: 21, d: -8 };

    const result = helpers.splitter(perPersonBalance);

    expect(result).toMatchObject({
      b: [
        { amount: 21, to: "c" },
        { amount: 8, to: "a" }
      ],
      d: [{ amount: 8, to: "a" }]
    });
  });
});
