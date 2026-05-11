import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import { configure } from "passmark";

dotenv.config();

configure({
  ai: {
    gateway: "openrouter"
  }
});

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  expect: {
    timeout: 20_000
  },
  reporter: [["html"], ["list"]],
  use: {
    baseURL: process.env.BASE_URL || "https://lysergic-systems.vercel.app",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
