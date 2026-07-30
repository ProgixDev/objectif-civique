import { describe, expect, it } from "vitest";
import { containsBannedWords } from "./contentFilter";

describe("containsBannedWords", () => {
  it("laisse passer les messages normaux du forum", () => {
    const ok = [
      "Bonjour, une question sur la naturalisation",
      "Merci pour vos réponses très utiles !",
      "Méthode rapide pour réviser les institutions",
      "J'ai déposé mon dossier il y a 4 mois, aucun retour",
      "Le niveau B2 est-il exigé dans tous les cas ?",
    ];
    for (const text of ok) {
      expect(containsBannedWords(text), text).toBe(false);
    }
  });

  it("bloque les insultes et propos haineux", () => {
    const ko = [
      "espèce de connard",
      "sale arabe",
      "va te faire enculer",
      "ntm",
    ];
    for (const text of ko) {
      expect(containsBannedWords(text), text).toBe(true);
    }
  });

  it("déjoue les contournements courants", () => {
    expect(containsBannedWords("C0NNARD")).toBe(true); // chiffre substitué
    expect(containsBannedWords("énculé")).toBe(true); // accent
    expect(containsBannedWords("coooonnard")).toBe(true); // lettres répétées
    expect(containsBannedWords("s4l0pe")).toBe(true); // léet
  });

  it("n'attrape pas les mots courts inclus dans un mot légitime", () => {
    // « pd » est banni mais ne doit pas matcher « rapide » ni « dépôt ».
    expect(containsBannedWords("une methode rapide")).toBe(false);
    expect(containsBannedWords("le depot du dossier")).toBe(false);
  });
});
