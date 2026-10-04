import { products } from "@/data/products";
import type { Product, ScentProfile, Season } from "@/data/types";

export type Occasion = "alltag" | "besonders";
export type Budget = "tief" | "mittel" | "hoch";

export type FinderAnswers = {
  profile: ScentProfile;
  season: Season;
  occasion: Occasion;
  budget: Budget;
};

/**
 * Keine Geschlechter-Frage mehr: Ein Duft riecht nicht nach "Damen" oder
 * "Herren", sondern nach seinen Noten. `category` bleibt ein Datenfeld fürs
 * Shop-Filter, entscheidet hier aber nichts mehr — jedes der 14 Produkte ist
 * für jede Antwort erreichbar.
 */

function minPrice(product: Product): number {
  return Math.min(...product.sizes.map((s) => s.priceEur));
}

function budgetOf(product: Product): Budget {
  const price = minPrice(product);
  if (price < 140) return "tief";
  if (price <= 200) return "mittel";
  return "hoch";
}

/**
 * EdC/EdT sind die leichten, alltagstauglichen Konzentrationen, Parfum/
 * Extrait die intensiven für besondere Anlässe. EdP liegt dazwischen und
 * zählt bewusst für beide Antworten — ein Allrounder soll bei "Alltag" nicht
 * schlechter dastehen als bei "besonderer Anlass".
 */
function matchesOccasion(product: Product, occasion: Occasion): boolean {
  if (product.concentration === "EdP") return true;
  if (occasion === "alltag")
    return product.concentration === "EdC" || product.concentration === "EdT";
  return product.concentration === "Parfum" || product.concentration === "Extrait";
}

function score(product: Product, answers: FinderAnswers): number {
  let points = 0;
  if (product.profile === answers.profile) points += 2;
  if (product.season.includes(answers.season)) points += 1;
  if (matchesOccasion(product, answers.occasion)) points += 1;
  if (budgetOf(product) === answers.budget) points += 1;
  return points;
}

// Mittelwert jeder Preisstufe — nur für den Gleichstand unten. Mehrere Düfte
// teilen sich oft Charakter, Jahreszeit UND Preisstufe exakt; "irgendeiner
// davon" wäre dann reiner Zufall der Katalogreihenfolge. Der Abstand zum
// Preisgefühl der Antwort ist der einzige Wert, der zwischen ihnen noch
// einen Unterschied macht, der etwas mit der Frage zu tun hat.
const BUDGET_MIDPOINT: Record<Budget, number> = { tief: 115, mittel: 170, hoch: 260 };

/**
 * Wählt IMMER ein tatsächlich existierendes Produkt aus der Kollektion — nie
 * ein erfundenes. Die vier Antworten sind Gewichte, kein harter Filter: Der
 * Charakter zählt am meisten, Jahreszeit, Anlass und Budget entscheiden den
 * Rest. Bleibt danach ein Gleichstand, gewinnt der Duft, dessen Preis am
 * nächsten an der gewählten Preisstufe liegt.
 */
export function pickScentMatch(answers: FinderAnswers): Product {
  const scored = products.map((p) => ({ product: p, points: score(p, answers) }));
  const topScore = Math.max(...scored.map((s) => s.points));
  const tied = scored.filter((s) => s.points === topScore).map((s) => s.product);
  if (tied.length === 1) return tied[0];

  const target = BUDGET_MIDPOINT[answers.budget];
  return tied.reduce((closest, candidate) =>
    Math.abs(minPrice(candidate) - target) < Math.abs(minPrice(closest) - target)
      ? candidate
      : closest,
  );
}
