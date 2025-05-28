'use client'; 

import { useEffect } from 'react'; 
import { useSearchParams, useRouter } from 'next/navigation'; 
import { toast } from 'sonner'; 
import { Loader } from 'lucide-react';

export default function LoadingRedirectPage() { 
  const searchParams = useSearchParams(); 
  const router = useRouter(); 

  useEffect(() => { 
    const errorMessage = searchParams.get('error'); 
    const successMessage = searchParams.get('success'); 

    const showToastAndRedirect = setTimeout(() => {
      if (errorMessage) { 
        toast.error(decodeURIComponent(errorMessage)); 
      } else if (successMessage) { 
        toast.success(decodeURIComponent(successMessage));
      }

      const redirectTimeout = setTimeout(() => {
        router.replace('/');
      }, 500);

      return () => clearTimeout(redirectTimeout);
    }, 100);

    return () => clearTimeout(showToastAndRedirect); 
  }, [searchParams, router]);

  return ( 
    <Loader size={50} className='animate-spin'/>
  );
}