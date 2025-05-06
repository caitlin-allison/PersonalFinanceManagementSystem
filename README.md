# Purpose of the Repo
This repo host the code for our Software Engineering 2025 project. We use the tech stack React, Typescript, SQLite, Expo, and C++ to enable our application.

# Structure of the Repo
The code is hosted in [MyFinanceApp folder](./MyFinanceApp). We have the main folders **components**, **screens**, **assets**,**usehooks**, and **utils** with important files [App.tsx](https://github.com/caitlin-allison/PersonalFinanceManagementSystem/blob/master/MyFinanceApp/App.tsx) and [Navigation.tsx](https://github.com/caitlin-allison/PersonalFinanceManagementSystem/blob/master/MyFinanceApp/Navigation.tsx)
- [**components**](./MyFinanceApp/components) : Hosts the custom React components used with the app
- [**screens**](./MyFinanceApp/screens) : The screens displayed within the app
- [**usehooks**](./MyFinanceApp/usehooks) : Custom useHooks, primarily used to grab asynchronuous data from the SQLite DB
- [**assets**](./MyFinanceApp/assets) : Holds images used within the app, cpp classes, and web assembly (wasm) files
- [**utils**](./MyFinanceApp/utils) : Functions that have abstracted/universal implementation across the app, includes types as well.
- [**Navigation.tsx**](./MyFinanceApp/Navigation.tsx) : Controls the navigation, __header and footer__, of the app. Implements the screens here
- [**App.tsx**](./MyFinanceApp/App.tsx) : Controls the entire application, any context providers are put here at the top-most level

# Stack / Tools used
This app is enabled through TypeScript/JavaScript, SQLite (DB), Expo (routing), React (UI), and C++ (compiled to Web Assembly) to provide a seamless and cross-platform experience for mobile users of IOS and Android.

# How to Run
Please refer to [the readme.md for further information](./MyFinanceApp/README.md).

~ readme.md added and edited by Caitlin Allison 5/5/2025
