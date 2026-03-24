"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
  "Open the store in Chrome, Edge, or Safari.",
  "Use Install App or Add to Home Screen when the prompt appears.",
  "Launch Stikkymag from the icon for a cleaner storefront flow.",
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
      : "Install the store for a faster, more app-like product browsing flow.",
  );

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setStatusMessage("Install is available. Tap below to save Stikkymag like an app.");
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
      setStatusMessage("Install accepted. The store will now live on the home screen.");
    } else {
      setStatusMessage("Install was dismissed. You can always install later from the browser menu.");
    }

    setDeferredPrompt(null);
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[0.56fr_0.44fr]">
      <div className="rounded-[2.3rem] border border-white/8 bg-[#111111] p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-white">
            <Image
              src="/stikkymag-logo.svg"
              alt="Stikkymag logo"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#ffd54a]">
              Install as app
            </p>
            <h3 className="mt-1 font-display text-4xl uppercase tracking-[-0.05em] text-white">
              Put Stikkymag on the home screen.
            </h3>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72">
          Customers can jump straight into the shopping grid, reopen the custom studio,
          and continue checkout without hunting for the site again.
        </p>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/6 p-5">
          <div className="mx-auto flex max-w-[18rem] items-center justify-center rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,#202020,#101010)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="w-full rounded-[2rem] bg-[#f5f5f5] p-4 text-black">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
                  <Image
                    src="/stikkymag-logo.svg"
                    alt="Stikkymag app icon"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">Stikkymag</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                    Installed app
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <div className="rounded-[1.2rem] bg-[#111111] px-4 py-3 text-sm font-semibold text-[#ffd54a]">
                  Quick shop
                </div>
                <div className="rounded-[1.2rem] bg-[#ffd54a] px-4 py-3 text-sm font-semibold text-black">
                  Custom studio
                </div>
                <div className="rounded-[1.2rem] bg-white px-4 py-3 text-sm font-semibold text-black shadow-[0_8px_18px_rgba(0,0,0,0.06)]">
                  Resume cart
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2.3rem] border border-[#e5e5e5] bg-white p-6 shadow-[0_24px_70px_rgba(17,17,17,0.08)] sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#6a6a6a]">
              App install workflow
            </p>
            <h3 className="mt-3 font-display text-4xl uppercase tracking-[-0.05em] text-[#111111]">
              One tap when supported, manual steps when needed.
            </h3>
          </div>

          <button
            type="button"
            onClick={handleInstall}
            disabled={isInstalled}
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#ffd54a] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#ffdf73] disabled:cursor-not-allowed disabled:bg-[#8d8d8d]"
          >
            {isInstalled ? "Already Installed" : "Install App"}
          </button>
        </div>

        <p className="mt-5 rounded-[1.6rem] border border-[#ececec] bg-[#f7f7f7] px-4 py-4 text-sm leading-7 text-[#565656]">
          {statusMessage}
        </p>

        <div className="mt-6 grid gap-4">
          {installSteps.map((step, index) => (
            <div
              key={step}
              className="flex gap-4 rounded-[1.7rem] border border-[#ececec] bg-[#fafafa] p-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.2rem] bg-[#111111] font-display text-2xl text-[#ffd54a]">
                0{index + 1}
              </div>
              <p className="text-sm leading-7 text-[#545454]">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.8rem] bg-[#111111] p-5 text-sm leading-7 text-white/76">
          iPhone fallback: use Safari, tap Share, then choose Add to Home Screen.
          Android or desktop fallback: open the browser menu and look for Install App.
        </div>
      </div>
    </section>
  );
}
