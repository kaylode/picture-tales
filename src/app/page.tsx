'use client';

import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const { toast } = useToast();
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      // The auth listener in AuthProvider will handle the redirect.
    } catch (error: any) {
      console.error("Error during sign-in:", error);
      if (error.code === 'auth/unauthorized-domain') {
        toast({
            title: 'Unauthorized Domain',
            description: "This app's domain is not authorized. Please add it to the 'Authorized domains' list in your Firebase Authentication settings.",
            variant: 'destructive',
        });
      } else {
        toast({
          title: 'Login Failed',
          description: 'There was an error while trying to sign you in. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
        <div className="text-center max-w-lg">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground">
                Welcome to PictureTales
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                Your magical storytelling journey begins here. Log in to start creating beautifully illustrated stories from your images and ideas.
            </p>
            <Button onClick={handleLogin} size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg">
                <svg className="mr-2 h-5 w-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 2.04-4.75 2.04-5.52 0-10-4.48-10-10s4.48-10 10-10c3.04 0 5.25 1.24 6.84 2.73l2.24-2.24C19.49 1.45 16.48 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c7.28 0 12.16-4.96 12.16-12.16 0-1.2-.12-2.2-.28-3.12h-12z" fill="currentColor"/></svg>
                Sign in with Google
            </Button>
        </div>
    </main>
  );
}
