import { invoke } from "lodash";
import { ConsoleReporter } from "../../../src";

const getReporter = (): ConsoleReporter =>
  new ConsoleReporter({
    globalTags: { globalTag1: "global_one", globalTag2: "global_two" }
  });

const reportsOf = (
  method: keyof ConsoleReporter,
  ...args: unknown[]
): ReturnType<typeof jest.spyOn> => {
  const reporter = getReporter();
  const mockOutput = jest.spyOn(reporter, "output").mockImplementation();

  invoke(reporter, method, ...args);
  return mockOutput.mock.calls;
};

describe("ConsoleReporter", (): void => {
  describe("Constructor", (): void => {
    it("Creates a ConsoleReporter", (): void => {
      const reporter = new ConsoleReporter();
      expect(reporter).toMatchSnapshot();
    });

    it("Creates a ConsoleReporter with global tags", (): void => {
      const reporter = new ConsoleReporter({
        globalTags: { globalTag1: "global_one", globalTag2: "global_two" }
      });
      expect(reporter).toMatchSnapshot();
    });

    it("Creates a ConsoleReporter with a format", (): void => {
      const format = { format: (): object => ({ format: "Format" }) };
      const reporter = new ConsoleReporter({ format });
      expect(reporter).toMatchSnapshot();
    });

    it("Creates a ConsoleReporter with an output", (): void => {
      const output = (): void => {};
      const reporter = new ConsoleReporter({ output });
      expect(reporter).toMatchSnapshot();
    });
  });

  describe("timing", (): void => {
    it("Reports a timing metric", (): void => {
      expect(reportsOf("timing", "timing_test", 20)).toMatchSnapshot();
    });

    it("Reports a timing metric with a sample rate", (): void => {
      expect(reportsOf("timing", "timing_test", 20, 0.5)).toMatchSnapshot();
    });

    it("Reports a timing metric with tags", (): void => {
      expect(
        reportsOf("timing", "timing_test", 20, undefined, {
          tag1: "one",
          tag2: "two"
        })
      ).toMatchSnapshot();
    });
  });

  describe("increment", (): void => {
    it("Reports a counter metric", (): void => {
      expect(reportsOf("increment", "increment_test")).toMatchSnapshot();
    });

    it("Reports a counter metric with a sample rate", (): void => {
      expect(reportsOf("increment", "increment_test", 0.5)).toMatchSnapshot();
    });

    it("Reports a counter metric with tags", (): void => {
      expect(
        reportsOf("increment", "increment_test", undefined, {
          tag1: "one",
          tag2: "two"
        })
      ).toMatchSnapshot();
    });
  });

  describe("incrementBy", (): void => {
    it("Reports a counter metric", (): void => {
      expect(
        reportsOf("incrementBy", "increment_by_test", 10)
      ).toMatchSnapshot();
    });

    it("Reports a counter metric with tags", (): void => {
      expect(
        reportsOf("incrementBy", "increment_by_test", 10, {
          tag1: "one",
          tag2: "two"
        })
      ).toMatchSnapshot();
    });
  });

  describe("decrement", (): void => {
    it("Reports a counter metric", (): void => {
      expect(reportsOf("decrement", "decrement_test")).toMatchSnapshot();
    });

    it("Reports a counter metric with a sample rate", (): void => {
      expect(reportsOf("decrement", "decrement_test", 0.5)).toMatchSnapshot();
    });

    it("Reports a counter metric with tags", (): void => {
      expect(
        reportsOf("decrement", "decrement_test", undefined, {
          tag1: "one",
          tag2: "two"
        })
      ).toMatchSnapshot();
    });
  });

  describe("decrementBy", (): void => {
    it("Reports a counter metric", (): void => {
      expect(
        reportsOf("decrementBy", "decrement_by_test", 10)
      ).toMatchSnapshot();
    });

    it("Reports a counter metric with tags", (): void => {
      expect(
        reportsOf("decrementBy", "decrement_by_test", 10, {
          tag1: "one",
          tag2: "two"
        })
      ).toMatchSnapshot();
    });
  });

  describe("gauge", (): void => {
    it("Reports a gauge metric", (): void => {
      expect(reportsOf("gauge", "gauge_test", 10)).toMatchSnapshot();
    });

    it("Reports a gauge metric with a sample rate", (): void => {
      expect(reportsOf("gauge", "gauge_test", 10, 0.5)).toMatchSnapshot();
    });

    it("Reports a gauge metric with tags", (): void => {
      expect(
        reportsOf("gauge", "gauge_test", 10, 0.5, {
          tag1: "one",
          tag2: "two"
        })
      ).toMatchSnapshot();
    });
  });

  describe("histogram", (): void => {
    it("Reports a histogram metric", (): void => {
      expect(reportsOf("histogram", "histogram_test", 20)).toMatchSnapshot();
    });

    it("Reports a histogram metric with a sample rate", (): void => {
      expect(
        reportsOf("histogram", "histogram_test", 20, 0.5)
      ).toMatchSnapshot();
    });

    it("Reports a histogram metric with tags", (): void => {
      expect(
        reportsOf("histogram", "histogram_test", 20, undefined, {
          tag1: "one",
          tag2: "two"
        })
      ).toMatchSnapshot();
    });
  });
});
