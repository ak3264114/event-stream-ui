import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    const nextPath = location.pathname + location.search;
    return <Navigate to={`/login?next=${nextPath}`} />;
  }

  return <>{children}</>;
};