import { useEffect, useState } from "react";
import { isAppleSignInAvailable } from "@/lib/auth";

/**
 * Indique si « Se connecter avec Apple » peut être proposé sur cet appareil.
 *
 * Renvoie `false` tant que la vérification n'a pas abouti : mieux vaut afficher
 * le bouton avec un instant de retard que le proposer à quelqu'un qui ne peut
 * pas s'en servir. C'est le scénario rapporté par la vérification Apple — un
 * bouton visible qui n'aboutit qu'à un message d'erreur.
 */
export function useAppleAvailable(): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    isAppleSignInAvailable()
      .then((ok) => {
        if (active) setAvailable(ok);
      })
      .catch(() => {
        if (active) setAvailable(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return available;
}
