import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as LucideIcons from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { PillButton } from "./ui/PillButton";

type Props = {
  icon?: keyof typeof LucideIcons;
  title: string;
  subtitle?: string;
  cta?: string;
  onCta?: () => void;
};

export function EmptyState({ icon = "Inbox", title, subtitle, cta, onCta }: Props) {
  const Icon = (LucideIcons as any)[icon] ?? LucideIcons.Inbox;
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Icon size={40} color={Colors.primary} />
      </View>
      <Text style={[Typography.h2, { color: Colors.onSurface, textAlign: "center" }]}>
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[
            Typography.body,
            { color: Colors.textSecondary, textAlign: "center", marginTop: 6 },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
      {cta && onCta ? (
        <PillButton
          label={cta}
          onPress={onCta}
          variant="primary"
          size="md"
          style={{ marginTop: 16, alignSelf: "center" }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 999,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});
