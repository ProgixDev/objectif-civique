import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

/**
 * Mini-rendu markdown pour les articles & contenus pédagogiques.
 * Volontairement minimaliste — pas de dépendance externe pour rester
 * compatible avec Expo SDK 55. Supporte :
 *   - # ## ###       (headings 1/2/3)
 *   - paragraphes    (texte simple)
 *   - listes "- xxx" / "1. xxx"
 *   - **gras** et *italique* via inline parsing
 *   - séparateur "---"
 *
 * Tout le reste est rendu en texte brut.
 */

type Block =
  | { kind: "h1" | "h2" | "h3"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "li-bullet"; text: string }
  | { kind: "li-number"; text: string; index: number }
  | { kind: "divider" };

function parseMarkdown(md: string): Block[] {
  // Strip code fences and images (pas géré)
  const cleaned = md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "");

  const lines = cleaned.split(/\r?\n/);
  const out: Block[] = [];
  let paraBuf: string[] = [];
  let numberCounter = 0;

  const flushParagraph = () => {
    if (paraBuf.length > 0) {
      const text = paraBuf.join(" ").trim();
      if (text) out.push({ kind: "paragraph", text });
      paraBuf = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushParagraph();
      numberCounter = 0;
      continue;
    }

    if (line.trim() === "---") {
      flushParagraph();
      out.push({ kind: "divider" });
      numberCounter = 0;
      continue;
    }

    let m = line.match(/^###\s+(.+)$/);
    if (m) {
      flushParagraph();
      out.push({ kind: "h3", text: m[1].trim() });
      continue;
    }
    m = line.match(/^##\s+(.+)$/);
    if (m) {
      flushParagraph();
      out.push({ kind: "h2", text: m[1].trim() });
      continue;
    }
    m = line.match(/^#\s+(.+)$/);
    if (m) {
      flushParagraph();
      out.push({ kind: "h1", text: m[1].trim() });
      continue;
    }

    m = line.match(/^\s*[-*]\s+(.+)$/);
    if (m) {
      flushParagraph();
      out.push({ kind: "li-bullet", text: m[1].trim() });
      numberCounter = 0;
      continue;
    }
    m = line.match(/^\s*\d+\.\s+(.+)$/);
    if (m) {
      flushParagraph();
      numberCounter += 1;
      out.push({
        kind: "li-number",
        index: numberCounter,
        text: m[1].trim(),
      });
      continue;
    }

    paraBuf.push(line.trim());
  }

  flushParagraph();
  return out;
}

/**
 * Parse les marqueurs inline (**gras**, *italique*, [texte](url)) et retourne
 * un tableau de spans avec leurs styles.
 */
type Span = { text: string; bold?: boolean; italic?: boolean };

function parseInline(text: string): Span[] {
  // On supporte **bold** et *italic*. On nettoie les liens markdown en gardant le texte visible.
  const linkCleaned = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Découpage simple : on alterne sur les balises **...**
  const spans: Span[] = [];
  let remaining = linkCleaned;

  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) {
      spans.push(...splitItalic(remaining));
      break;
    }
    if (boldStart > 0) {
      spans.push(...splitItalic(remaining.slice(0, boldStart)));
    }
    const after = remaining.slice(boldStart + 2);
    const boldEnd = after.indexOf("**");
    if (boldEnd === -1) {
      // pas de fermeture, on traite comme du texte
      spans.push(...splitItalic("**" + after));
      break;
    }
    spans.push({ text: after.slice(0, boldEnd), bold: true });
    remaining = after.slice(boldEnd + 2);
  }
  return spans;
}

function splitItalic(text: string): Span[] {
  const out: Span[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    const start = remaining.indexOf("*");
    if (start === -1) {
      out.push({ text: remaining });
      break;
    }
    if (start > 0) out.push({ text: remaining.slice(0, start) });
    const after = remaining.slice(start + 1);
    const end = after.indexOf("*");
    if (end === -1) {
      out.push({ text: "*" + after });
      break;
    }
    out.push({ text: after.slice(0, end), italic: true });
    remaining = after.slice(end + 1);
  }
  return out;
}

function InlineText({
  spans,
  baseStyle,
}: {
  spans: Span[];
  baseStyle: any;
}) {
  return (
    <Text style={baseStyle}>
      {spans.map((s, i) => (
        <Text
          key={i}
          style={[
            s.bold && { fontFamily: "Satoshi_700Bold" },
            s.italic && { fontStyle: "italic" },
          ]}
        >
          {s.text}
        </Text>
      ))}
    </Text>
  );
}

export function MarkdownView({ source }: { source: string }) {
  const blocks = useMemo(() => parseMarkdown(source), [source]);

  return (
    <View>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h1":
            return (
              <InlineText
                key={i}
                spans={parseInline(b.text)}
                baseStyle={styles.h1}
              />
            );
          case "h2":
            return (
              <InlineText
                key={i}
                spans={parseInline(b.text)}
                baseStyle={styles.h2}
              />
            );
          case "h3":
            return (
              <InlineText
                key={i}
                spans={parseInline(b.text)}
                baseStyle={styles.h3}
              />
            );
          case "paragraph":
            return (
              <InlineText
                key={i}
                spans={parseInline(b.text)}
                baseStyle={styles.paragraph}
              />
            );
          case "li-bullet":
            return (
              <View key={i} style={styles.listRow}>
                <Text style={styles.bullet}>•</Text>
                <InlineText
                  spans={parseInline(b.text)}
                  baseStyle={styles.listText}
                />
              </View>
            );
          case "li-number":
            return (
              <View key={i} style={styles.listRow}>
                <Text style={styles.bullet}>{b.index}.</Text>
                <InlineText
                  spans={parseInline(b.text)}
                  baseStyle={styles.listText}
                />
              </View>
            );
          case "divider":
            return <View key={i} style={styles.divider} />;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 22,
    lineHeight: 28,
    color: Colors.onSurface,
    letterSpacing: -0.4,
    marginTop: 16,
    marginBottom: 8,
  },
  h2: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    lineHeight: 24,
    color: Colors.onSurface,
    letterSpacing: -0.3,
    marginTop: 18,
    marginBottom: 6,
  },
  h3: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 15,
    lineHeight: 20,
    color: Colors.primary,
    letterSpacing: -0.1,
    marginTop: 14,
    marginBottom: 4,
  },
  paragraph: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.onSurface,
    marginBottom: 10,
  },
  listRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
  },
  bullet: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.primary,
    minWidth: 18,
    textAlign: "right",
  },
  listText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.onSurface,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.12)",
    marginVertical: 16,
  },
});
