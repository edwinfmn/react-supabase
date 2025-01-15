import React, { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import Auth from './Auth';
import App from './App';

const Router = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return <Auth />;
  }
  return <App /> ;
};

export default Router;
