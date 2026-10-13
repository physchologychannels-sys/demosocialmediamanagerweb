import { describe, expect, it } from "vitest";
import { submitDemoInquiry } from "./demo-inquiry";

describe("Demo inquiry", () => {
  it("never reports a demo inquiry as delivered", () => {
    expect(submitDemoInquiry({ name: "Sam", email: "sam@example.com", message: "A campaign for our cafe" })).toEqual({ success: true, delivered: false });
  });
  it("rejects an invalid email", () => {
    expect(submitDemoInquiry({ name: "Sam", email: "invalid", message: "A campaign" }).success).toBe(false);
  });
});