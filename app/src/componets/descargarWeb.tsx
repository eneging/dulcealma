// src/components/InstallPWAButton.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";


interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
  function onBeforeInstallPrompt(e: Event) {
    const promptEvent = e as BeforeInstallPromptEvent;
    promptEvent.preventDefault();
    setDeferredPrompt(promptEvent);
  }

  window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

  return () => {
    window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  };
}, []);



  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") {
        console.log("Usuario aceptó la instalación");
      } else {
        console.log("Usuario canceló la instalación");
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleInstallClick}
      disabled={!deferredPrompt}
      startIcon={<InstallMobileIcon />}
    >
      Instalar esta Web
    </Button>
  );
};

export default InstallPWAButton;
