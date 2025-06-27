'use client';

import { StoryGenerator } from "@/components/story-generator";
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StoryCreatorPage() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <main className="min-h-screen w-full bg-background">
       <header className="bg-gradient-to-b from-card to-background py-12 md:py-20 text-center relative">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground">
            PictureTales
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your images and ideas into beautifully illustrated, captivating
            stories.
          </p>
        </div>
        <div className="absolute top-4 right-4">
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>
      </header>
      <StoryGenerator />
    </main>
  );
}
