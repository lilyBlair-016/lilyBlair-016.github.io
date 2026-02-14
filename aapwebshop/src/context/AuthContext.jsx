import { createContext, useContext, useReducer, useCallback } from 'react';

const AuthContext = createContext(null);

const initialState = {
  isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
  userEmail: sessionStorage.getItem('userEmail') || '',
  userData: JSON.parse(localStorage.getItem('userData') || 'null'),
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.payload.email,
        userData: JSON.parse(localStorage.getItem('userData') || 'null'),
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userEmail: '',
      };
    case 'SIGNUP':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        dispatch({ type: 'LOGIN', payload: { email } });
        resolve({ success: true });
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const signup = useCallback((formData) => {
    localStorage.setItem('userData', JSON.stringify(formData));
    dispatch({ type: 'SIGNUP', payload: formData });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
