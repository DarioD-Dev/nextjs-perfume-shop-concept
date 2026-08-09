import type { Product } from "@/data/types";

type Concentration = Product["concentration"];

// Ascending oil concentration — the order fragrance people actually expect,
// not alphabetical.
export const CONCENTRATION_ORDER: Concentration[] = ["EdC", "EdT", "EdP", "Parfum", "Extrait"];

export const CONCENTRATION_LABELS: Record<Concentration, string> = {
  EdC: "Eau de Cologne (EdC)",
  EdT: "Eau de Toilette (EdT)",
  EdP: "Eau de Parfum (EdP)",
  Parfum: "Parfum",
  Extrait: "Extrait de Parfum",
};
