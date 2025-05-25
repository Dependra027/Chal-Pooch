import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

//notes
/*
Sure! Here's a detailed explanation of your **ThemeContext** React code, which manages light/dark theme state for your app:

---

### Overview

This code defines a **React Context** to handle theming (light/dark mode) across your application:

* It provides the current theme (`'light'` or `'dark'`).
* Provides a function to toggle the theme.
* Persists theme choice in `localStorage`.
* Applies/removes a `dark` CSS class on the document root to enable CSS-based theming.
* Provides a custom hook `useTheme` for consuming this context.

---

### Step-by-step explanation

---

#### 1. **Type Definitions**

```tsx
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```

* `Theme` is a union type to represent allowed theme values.
* `ThemeContextType` defines the shape of the context value:

  * `theme`: current theme string.
  * `toggleTheme`: function to switch between light and dark.

---

#### 2. **Create Context**

```tsx
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

* Creates the `ThemeContext` with initial value `undefined`.
* This allows you to detect if the context is being used outside a provider (important for the custom hook).

---

#### 3. **ThemeProvider Component**

```tsx
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
```

* Defines state variable `theme` with an **initializer function**:

  * Checks if there's a saved theme in `localStorage`.
  * If not, it uses the browser's **prefers-color-scheme** media query to detect if dark mode is preferred.
  * Defaults to `'light'` if neither applies.

---

#### 4. **Sync theme with localStorage and DOM**

```tsx
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
```

* Every time `theme` changes:

  * Saves the new theme to `localStorage`.
  * Adds or removes the `dark` CSS class on the `<html>` element (`document.documentElement`).

This lets you write CSS like:

```css
.dark body {
  background-color: black;
  color: white;
}
```

---

#### 5. **Toggle Theme Function**

```tsx
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
```

* Switches the theme from light to dark or vice versa.

---

#### 6. **Provide Context Value**

```tsx
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

* Wraps children with the context provider so any child can consume the theme info.

---

#### 7. **Custom Hook for Easy Access**

```tsx
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

* Custom hook to get the context value.
* Throws a helpful error if used outside the provider to avoid silent bugs.

---

### How to use this in your app

```tsx
import { ThemeProvider } from './path/to/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      { rest of your app here }
      </ThemeProvider>
    );
  }
  ```
  
  Then in any child component:
  
  ```tsx
  import { useTheme } from './path/to/ThemeContext';
  
  function SomeComponent() {
    const { theme, toggleTheme } = useTheme();
  
    return (
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    );
  }
  ```
  
  ---
  
  ### Summary
  
  * Your context automatically detects initial theme preference.
  * Persists user choice.
  * Adds/removes a CSS class for easy styling.
  * Provides a simple toggle function.
  * Uses a safe custom hook pattern.
  
  ---
  
  
  
*/