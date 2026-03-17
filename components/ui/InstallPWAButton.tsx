import { useEffect, useState } from 'react';

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Listen for install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
    });

    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  if (isInstalled) {
    return null;
  }
  if (!deferredPrompt) {
    return (
      <div className="w-full mb-2 py-2 px-4 rounded bg-muted text-muted-foreground text-xs text-center">
        App not eligible for install. Make sure you are on Chrome/Edge, HTTPS, and have a valid manifest/service worker.
      </div>
    );
  }
  return (
    <button
      className="w-full mb-2 py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      onClick={async () => {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
        }
      }}
    >
      Install as Chrome App
    </button>
  );
}
