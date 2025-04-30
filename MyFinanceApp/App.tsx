import React from 'react';
import Navigation from './Navigation';
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SQLiteProvider, SQLiteDatabase } from 'expo-sqlite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const theme = createTheme({
    lightColors: {
      primary: 'orange',
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

  console.log('App is rendering...');

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
          <Navigation />
        </QueryClientProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  try {
    console.log('Starting database migration...');
    const DATABASE_VERSION = 1;
    const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    console.log('Current database version:', result?.user_version);
    let currentDbVersion = result?.user_version ?? 0;

    if (currentDbVersion >= DATABASE_VERSION) {
      console.log('Database is up-to-date.');
      return;
    }

    if (currentDbVersion === 0) {
      console.log('Setting up initial database schema...');
      await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
      `);
      await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
      await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
      currentDbVersion = 1;
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    console.log('Database migration completed.');
  } catch (error) {
    console.error('Database migration failed:', error);
  }
}