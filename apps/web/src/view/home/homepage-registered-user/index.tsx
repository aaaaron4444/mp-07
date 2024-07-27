'use client';

import { useEffect, useState } from 'react';
import HomeEOView from '../homepage-event-organizer';
import HomeUserView from '../homepage-registered-user';
import HomeNotUserView from '../homepage-not-user';

interface User {
  role_id: number;
  [key: string]: any;
}

function HomeView() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user || !user.role_id) {
    return <HomeNotUserView />;
  }

  switch (user.role_id) {
    case 1:
      return <HomeUserView />;
    case 2:
      return <HomeEOView />;
    default:
      return <HomeNotUserView />;
  }
}

export default HomeView;