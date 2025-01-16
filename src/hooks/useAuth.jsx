import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user.identities[0].identity_data || null);
      setLoading(false);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user.identities[0].identity_data || null);
      setLoading(false);
    })

    return () => subscription.unsubscribe()
  }, []);

  return { user, loading };
};

export default useAuth;