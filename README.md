# Purpose of the Repo
This repo host the code for our Software Engineering 2025 project. We use the tech stack React, Typescript, SQLite, Expo, and C++ to enable our application.

# Structure of the Repo
The code is hosted in [MyFinanceApp folder](./MyFinanceApp). We have the main folders **components**, **screens**, **usehooks**, and **utils** with important files [App.tsx](https://github.com/caitlin-allison/PersonalFinanceManagementSystem/blob/master/MyFinanceApp/App.tsx) and [Navigation.tsx](https://github.com/caitlin-allison/PersonalFinanceManagementSystem/blob/master/MyFinanceApp/Navigation.tsx)
- **components** : Hosts the custom React components used with the app
- **screens** : The screens displayed within the app
- **usehooks** : Custom useHooks, primarily used to grab asynchronuous data from the SQLite DB
- **utils** : Functions that have abstracted/universal implementation across the app, includes types as well.
- **Navigation.tsx** : Controls the navigation, __header and footer__, of the app. Implements the screens here
- **App.tsx** : Controls the entire application, any context providers are put here at the top-most level

~ readme.md added by Caitlin Allison 4/30/2025
