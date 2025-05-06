import React from 'react';
import Navigation from './Navigation';
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SQLiteProvider, SQLiteDatabase } from 'expo-sqlite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserIdProvider } from './utils/UserContextProvider';

const queryClient = new QueryClient();

export default function App() {
  // Provides consistent CSS to the entire app when importing components from '@rneui/themed'
  const theme = createTheme({
    mode: 'light',
    lightColors: {
      primary: '#a2ca5d',
      secondary: '#202A44'
    },
    darkColors: {
      primary: 'blue',
    },
    components: {
      Button: {
        raised: true,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SQLiteProvider
        databaseName="test.db"
        onInit={(db) => {
          console.log('SQLiteProvider initialized.');
          return migrateDbIfNeeded(db);
        }}
      >
        <QueryClientProvider client={queryClient}>
          <UserIdProvider>
            <Navigation />
          </UserIdProvider>
        </QueryClientProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}

/**
 * migrateDbIfNeeded
 * This functions servers to sync up to our SQLite DB, and create a new one if it does not already exist.
*/
async function migrateDbIfNeeded(db: SQLiteDatabase) {
  try {

    const DATABASE_VERSION = 1;
    const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

    let currentDbVersion = result?.user_version ?? 0;
    if (currentDbVersion >= DATABASE_VERSION) {
      console.log('Database is up-to-date.');
      return;
    }

    if (currentDbVersion === 0) {
    console.log('Setting up initial database schema...');
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        
        CREATE TABLE IF NOT EXISTS User (
          userID INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT NOT NULL, 
          email TEXT,
          phone TEXT NOT NULL,
          pin TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Bill (
          billID INTEGER PRIMARY KEY AUTOINCREMENT, 
          userID INTEGER, 
          name TEXT, 
          amount REAL NOT NULL, 
          isMonthly NCHAR(1), 
          date TEXT NOT NULL,
          description TEXT, 
          category TEXT, 
          FOREIGN KEY (userID) REFERENCES User(UserID)
        );
        
        CREATE TABLE IF NOT EXISTS Income (
          incomeID INTEGER PRIMARY KEY AUTOINCREMENT, 
          userID INTEGER, 
          name TEXT, 
          amount REAL NOT NULL, 
          isMonthly NCHAR(1), 
          date TEXT NOT NULL,
          description TEXT, 
          category TEXT, 
          FOREIGN KEY (userID) REFERENCES User(userID)
        );
        
        CREATE TABLE IF NOT EXISTS Goal (
          goalID INTEGER PRIMARY KEY AUTOINCREMENT, 
          userID INTEGER, 
          name TEXT NOT NULL, 
          amount REAL NOT NULL, 
          hasDeadline NCHAR(1),
          date TEXT, 
          description TEXT, 
          FOREIGN KEY (UserID) REFERENCES User(UserID)
        );
      `);
    currentDbVersion = 1;
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);

  } catch (error) {
    console.error('Database migration failed:', error);
  }
}
