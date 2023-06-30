const handleSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.error('Sign up error:', error.message);
      } else {
        console.log('Signed up:', user);
        // Redirect or perform other actions
      }
    } catch (error) {
      console.error('Sign up error:', error.message);
    }
  };
  