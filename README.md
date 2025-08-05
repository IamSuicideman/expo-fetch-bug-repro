# Bug Report: Critical Network Failure - All `fetch` Requests Hang Indefinitely on Android

## Summary

All network requests made via the global `fetch` API hang indefinitely without returning a response or an error. This occurs in all environments, including Expo Go, EAS Development Client builds, and even standalone EAS Production builds.

**This bug was originally discovered in a large, complex production application.** This repository contains a minimal reproducible example created to isolate and confirm the issue, proving it is not caused by application-specific code or dependencies.

The problem started occurring suddenly about a week ago after previously working correctly.

## Environment

- **Expo SDK:** ~53.0.20
- **React Native:** 0.79.5
- **Expo Go Version:** 2.33.21
- **Node.js Version:** 20.19.4 (LTS)
- **Yarn Version:** 1.22.22
- **Operating System:** Windows 11
- **Devices Tested:** Physical Android 9 device, Android 10 emulator.
- **Networks Tested:** Multiple Wi-Fi networks and mobile data (via hotspot).

## Expected Behavior

`fetch` requests to any valid endpoint (e.g., `https://jsonplaceholder.typicode.com/posts/1`) should either resolve with a successful response or reject with a network error.

## Actual Behavior

The `fetch` promise never resolves or rejects. It hangs indefinitely. If a timeout is implemented using an `AbortController`, the request aborts as expected with a `DOMException: Aborted`, but this only confirms the request is not completing.

## Steps to Reproduce

1.  Ensure you are on a Windows machine with Node.js v20.x LTS.
2.  Run `yarn create expo-app NetworkTest --template blank`.
3.  Replace the contents of `App.js` with the code in this repository.
4.  Run `yarn start` and open the project in Expo Go on an Android device.
5.  Press the "Run Test" button.

**Result:** The status text will remain "Fetching..." forever. No success or error logs will appear in the console.

## Exhaustive Troubleshooting Performed

The following steps have been taken, none of which resolved the issue, proving this is not a local configuration problem:

#### Multi-Environment Confirmation:
- The issue occurs on multiple different Windows PCs.
- The issue occurs on multiple different networks (Wi-Fi and mobile data).
- The issue occurs on multiple different Android devices and emulators.
- The issue occurs in Expo Go, EAS Dev Builds, and EAS Production Builds.

#### Local Environment & Tooling:
- Downgraded Node.js from an unstable version (v22) to the recommended LTS version (v20.19.4).
- Cleared the Metro cache (`--reset-cache`).
- Completely cleared the Yarn cache (`yarn cache clean`).
- Deleted and reinstalled `node_modules` and `yarn.lock`.
- Confirmed no global `.npmrc` or `.yarnrc` files are causing interference.

#### PC & Network Configuration:
- Completely disabled Windows Firewall.
- Disabled all "Reputation-based protection" features in Windows Security.
- Confirmed no third-party antivirus software is installed.
- Changed the PC's DNS server to Google's public DNS (8.8.8.8).
- Attempted to use Expo's `--tunnel` mode, which also failed to connect, further indicating a fundamental network block.

## Conclusion

This appears to be a critical, high-severity bug in the Expo SDK's native networking layer for Android or a related dependency. The fact that it is reproducible in a blank project and persists across all build types and environments suggests a regression was introduced recently. The issue is completely blocking all network-dependent app development.
