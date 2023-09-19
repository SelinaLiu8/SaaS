import Link from 'next/link';
import { useContext, ReactNode } from 'react';  // Import ReactNode for children type
import { UserContext } from '../lib/context';

interface AuthCheckProps {
  children: ReactNode;
  fallback?: ReactNode;  // Make it optional if you want
}

// Component's children only shown to logged-in users
export default function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { user } = useContext(UserContext);

  return user ? children : fallback || <Link href="/enter">You must be signed in</Link>;
}
