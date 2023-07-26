# Dynamic Mathler

![](https://raw.githubusercontent.com/gpuente/dynamic-mathler/develop/demo-mathler.gif)

## How to run this project:
If you have an Android device, the easiest way to run this project is by installing the Preview Build (.apk) on your device. You can download the latest build from this link:
- https://expo.dev/accounts/dev.gpuente/projects/mathler-mobile/builds/26790b55-4f6b-442b-b40f-d9e8b214a043

Just follow the instructions on the build webpage.

Alternatively, you can run this project on your machine using an Android or iOS emulator. Follow these instructions: https://reactnative.dev/docs/environment-setup to set up React Native properly on your machine before continuing with the project setup instructions.

Now that you have React Native installed and configured on your machine (along with the simulators), let's run this project:
- Clone this repo on your machine: `git clone https://github.com/gpuente/dynamic-mathler.git`
- Install the project dependencies: `yarn install`
- That's it! Now you can run the project by executing: `yarn workspace mathler-mobile start`. This command will start the app in development - mode (from here you can follow the instructions from the terminal to launch the app in an iOS or Android simulator).

## CI
This project is configured with Github Actions and EAS. Every time you push a change to the master branch, the CI triggers a new Android Preview build (that you can download from Expo). You can check the Github action config here: https://github.com/gpuente/dynamic-mathler/blob/master/.github/workflows/preview.yml

## Storybook:
This project is configured with Storybook. You can explore all the components in the Storybook navigator by running:
```bash
  yarn workspace mathler-mobile storybook
```

## Tests:
This project is configured with Jest and some other testing libraries. You can run all the tests available (for all the projects) by running:
```bash
  yarn test
```
Also, you can run specific workspace tests by running: `yarn workspace mathler-mobile test` or `yarn workspace mathler-core test` (you can replace `test` with `test:watch` if you want to keep running the tests after code changes).


## Features: 
Here are listed some of the features implemented in this project:

- Instructions: You can click the ℹ️ icon to trigger a modal with detailed instructions on how to play the game.
- Color Themes: This app supports theme colors (Dark and Light by default). You can change the app colors by clicking ☀️ or 🌑.
- Start a New Game: You can start a new game by pressing the 🔄 icon.
- Internationalization: This app supports i18n (EN and ES by default). You can change the app language by clicking the 🌎 icon.
- Debug Secret Modal: If you want to see the solution for the game, you can click on the title (the one with the 🎲 icon) five times quickly. This would trigger a secret modal with the solution for the game.
- Error Messages: If you try to validate an incorrect formula (like: "1/-*23"), you will get a Toast message with the error.
- Finish Modal: If you finish the game in <= 6 attempts, you will get a Congratulations modal (with a little surprise).
- Game Over Modal: If you can't finish the game in <= 6 attempts, then you will get the Game Over modal (from here you can start a new game).

## Github Project
You can check all the tasks, issues and development process in the Github project: https://github.com/users/gpuente/projects/2

## Monorepo:
This project is structured as a monorepo (using TurboRepo). This makes it easy to develop different components that share business logic. One example is the mathler-core package (it contains mathler game logic), which is being used by the app mathler-mobile. If you want to build a web version of the game, you just need to create a new app and integrate the mathler-core lib.

## Project Structure:
As mentioned before, this project is configured as a monorepo, making it easier to develop different components, apps, and libraries that interact with each other (of course, this is intended for small projects). Here is a brief description of the project structure:
- apps/* : This directory is intended to allocate all the different apps related to the project. Currently, `mathler-mobile` is the only app available, but if you need to build a web version of this mathler game, here you should put your app (e.g., React app, Electron app, etc.).
- packages/* : Here you will find all the packages that are shared with other packages or apps (used to share code).
  - packages/mathler-core: This is the library that handles the mathler game. Keeping this as an isolated library allows implementing the same game and logic in different apps (so your apps only have to worry about the UI).
  - packages/tsconfig: Shared typescript configuration.
  - packages/jest-config: Shared jest configuration.
  - packages/eslint-config-custom: Shared eslint configuration.

This project is also configured with `husky` to run eslint and prettier every time you commit new changes.

## Why Expo?
Since this is a small project, Expo suits perfectly for fast development and shipping. It also allows you to change to a pure React Native project (without Expo dependencies) really easily (in case it's needed).

## What can be improved in this project
- Auto generated calculations
- Fetch theme from device
- Add React navigation
- Add more translations
- Configure automated deployment to the stores
- E2E testing with detox.
