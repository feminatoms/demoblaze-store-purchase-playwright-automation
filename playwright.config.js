// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'console';
import { on } from 'events';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 60*1000,
  expect: {
   timeout: 60*1000 //Assertion timeout
  },
  reporter:'html',
  use: {
    browserName: 'chromium',
    headless: true, // previously : false, updated due the issue in Github
    screenshot : "on",
    trace : "on",

  }
  });
  module.exports = config;

