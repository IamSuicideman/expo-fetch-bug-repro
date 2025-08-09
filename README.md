# Minimal Reproduction for Critical Android Network Failure

This repository contains a minimal reproducible example for a critical bug where all `fetch` requests hang indefinitely on Android.

This issue occurs in all React Native environments, including Expo Go, EAS Development Client builds, and standalone EAS Production builds.

## Bug Reports

For a complete understanding of the issue, diagnostic steps, and findings, please see the detailed reports:

*   **[Summary of the Bug](./summary%20of%20bug.md)**: A high-level overview of the problem, impact, and conclusions.
*   **[Detailed Bug Report](./detailed%20bug%20report.md)**: A comprehensive, step-by-step log of all diagnostic tests, native code workarounds, and analysis.

## How to Run

1.  Clone this repository.
2.  Run `yarn install`.
3.  Run `yarn start` and open the project in Expo Go on an Android device.
4.  Press the "Run Test" button.

**Expected Result:** The status text will remain "Fetching..." indefinitely, demonstrating the bug.
