import { useFonts as useExpoFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export function useAppFonts() {
  const [loaded, error] = useExpoFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    // Alias legacy font names to Poppins so every existing
    // `fontFamily: "Inter_..."` / `"Satoshi_..."` in the app picks up Poppins.
    Inter_400Regular: Poppins_400Regular,
    Inter_500Medium: Poppins_500Medium,
    Inter_600SemiBold: Poppins_600SemiBold,
    Inter_700Bold: Poppins_700Bold,
    Satoshi_600SemiBold: Poppins_600SemiBold,
    Satoshi_700Bold: Poppins_700Bold,
  });

  return { loaded, error };
}
