# A simple p5.js boilerplate

This is a very simple boilerplate to start coding p5.js locally with auto-reload using [Browsersync](https://browsersync.io/).

## Install node and npm
First make sure that you have npm installed. Easiest way is to [install node](https://nodejs.org/en/download/), npm is bundled with node.

## Install Browsersync
Install globally using npm.
```
npm install -g browser-sync
```

## Run Browsersync
Run browser-sync in the project folder. Whenever you modify and save a file in the project folder, browser will reload the page.
```
browser-sync start --files "*"
```
