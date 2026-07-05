import { useState } from 'react';

export function useAnimatedLogo() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);

  const handleLogoClick = () => {
    setIsLogoAnimating(true);
    window.location.href = '#home';
    setTimeout(() => {
      setIsLogoAnimating(false);
    }, 1000);
  };

  return { isLogoAnimating, handleLogoClick };
}
