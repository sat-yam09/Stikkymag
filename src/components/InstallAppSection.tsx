"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

const installSteps = [
  "Open this site in Chrome or Edge on mobile or desktop.",
  "Tap Install App if the browser offers it, or open the browser menu.",
  "Launch the store from the home screen for an app-like experience.",
];

function detectInstalledMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as NavigatorWithStandalone).standalone === true
  );
}

export function InstallAppSection() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(detectInstalledMode);
  const [statusMessage, setStatusMessage] = useState(() =>
    detectInstalledMode()
      ? "The app is already installed on this device."
      : "Use the browser install prompt for a cleaner app-like storefront experience.",
  );

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setStatusMessage("Install is available. Tap the button below to add this store as an app.");
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setStatusMessage("Installed. You can now launch the storefront like a regular app.");
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) {
      setStatusMessage(
        "If the button is unavailable, open the browser menu and choose Install App or Add to Home Screen.",
      );
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setStatusMessage("Install accepted. The store will be available from the home screen.");
    } else {
      setStatusMessage("Install was dismissed. You can still install later from the browser menu.");
    }

    setDeferredPrompt(null);
  }

  return (
    <section id="install-app" className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[2.25rem] border border-white/70 bg-[linear-gradient(180deg,#163a33,#254d44)] p-6 text-white shadow-[0_20px_70px_rgba(15,23,42,0.16)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
          Install as app
        </p>
        <h3 className="mt-3 font-display text-4xl tracking-[-0.05em] text-white">
          Put the storefront on the home screen.
        </h3>
        <p className="mt-4 text-sm leading-7 text-white/78">
          Customers can open the store like an app, browse faster, and come back
          directly to your pre-designed or custom ordering flow.
        </p>

        <div className="mt-8 grid gap-3">
          <div className="rounded-[1.6rem] border border-white/15 bg-white/8 p-4 text-sm leading-7 text-white/80">
            Dedicated app-like entry point for repeat customers.
          </div>
          <div className="rounded-[1.6rem] border border-white/15 bg-white/8 p-4 text-sm leading-7 text-white/80">
            Clean mobile-first browsing without opening the browser every time.
          </div>
          <div className="rounded-[1.6rem] border border-white/15 bg-white/8 p-4 text-sm leading-7 text-white/80">
            Faster access to pre-designed products, custom uploads, and cart recovery.
          </div>
        </div>
      </div>

      <div className="rounded-[2.25rem] border border-white/70 bg-white/86 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#587468]">
              App install workflow
            </p>
            <h3 className="mt-3 font-display text-4xl tracking-[-0.05em] text-[#16211d]">
              One tap when supported, manual install when needed.
            </h3>
          </div>

          <button
            type="button"
            onClick={handleInstall}
            disabled={isInstalled}
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#163a33] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#21473f] disabled:cursor-not-allowed disabled:bg-[#8ea59d]"
          >
            {isInstalled ? "Already Installed" : "Install App"}
          </button>
        </div>

        <p className="mt-5 rounded-[1.6rem] border border-[#dde5df] bg-[#f7f5ef] px-4 py-4 text-sm leading-7 text-[#56635e]">
          {statusMessage}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {installSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-[1.7rem] border border-[#e7ece8] bg-[#fbfaf7] p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf4ef] font-display text-2xl text-[#24463e]">
                0{index + 1}
              </div>
              <p className="mt-4 text-sm leading-7 text-[#596560]">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.8rem] border border-[#ece6dc] bg-[#fff9f1] p-5 text-sm leading-7 text-[#695f51]">
          iPhone fallback: use Safari, tap Share, then choose Add to Home Screen.
          Android/Desktop fallback: open the browser menu and look for Install App or
          Add to Home Screen.
        </div>
      </div>
    </section>
  );
}
