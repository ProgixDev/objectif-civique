import React, { useEffect } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { MotiView } from "moti";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

export function BottomSheet({ visible, onClose, children, style }: Props) {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    // noop: modal manages visibility
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <MotiView
        from={{ translateY: 400 }}
        animate={{ translateY: 0 }}
        exit={{ translateY: 400 }}
        transition={{ type: "spring", damping: 22, stiffness: 180 }}
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + 16 },
          style,
        ]}
      >
        <View style={styles.handle} />
        {children}
      </MotiView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...(StyleSheet.absoluteFill as object),
    backgroundColor: "rgba(25,28,30,0.35)",
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: Colors.outlineVariant,
    marginBottom: 12,
  },
});
