import type { Product } from "./types";

/**
 * Photos are self-hosted under public/images/products/ (downloaded once from
 * Unsplash, free license, no attribution required) — see public/CREDITS.md.
 * Live-hotlinking these from images.unsplash.com previously caused 500/504s
 * under real load, once the Next.js image optimizer had to fetch them
 * server-side on a cache miss.
 */
function product(slug: string): string {
  return `/images/products/${slug}.jpg`;
}

export const products: Product[] = [
  {
    slug: "maison-verrier-oud-imperial",
    brand: "Maison Verrier",
    name: "Oud Impérial",
    concentration: "Extrait",
    category: "unisex",
    season: ["autumn", "winter"],
    sizes: [
      { ml: 30, priceEur: 255 },
      { ml: 50, priceEur: 340 },
    ],
    image: {
      src: product("maison-verrier-oud-imperial"),
      alt: { de: "Flakon von Oud Impérial auf hellem Untergrund", en: "Oud Impérial bottle on a light surface" },
    },
    notes: {
      top: { de: ["Safran", "Bergamotte"], en: ["Saffron", "Bergamot"] },
      heart: { de: ["Oud", "Rose"], en: ["Oud", "Rose"] },
      base: { de: ["Amber", "Moschus"], en: ["Amber", "Musk"] },
    },
    tagline: {
      de: "Ein intensiver Oud-Akkord, umhüllt von warmem Amber.",
      en: "An intense oud accord wrapped in warm amber.",
    },
    description: {
      de: "Oud Impérial verbindet die Tiefe von kostbarem Oud mit der Wärme von Amber und einem Hauch Safran. Ein Duft für besondere Momente — kompromisslos, langanhaltend, unverkennbar.",
      en: "Oud Impérial pairs the depth of precious oud with the warmth of amber and a hint of saffron. A fragrance for special moments — uncompromising, long-lasting, unmistakable.",
    },
    releaseYear: 2023,
  },
  {
    slug: "maison-verrier-fleur-nocturne",
    brand: "Maison Verrier",
    name: "Fleur Nocturne",
    concentration: "EdP",
    category: "damen",
    season: ["summer", "autumn"],
    sizes: [
      { ml: 50, priceEur: 145 },
      { ml: 100, priceEur: 175 },
    ],
    image: {
      src: product("maison-verrier-fleur-nocturne"),
      alt: { de: "Flakon von Fleur Nocturne in rosa Licht", en: "Fleur Nocturne bottle in pink light" },
    },
    notes: {
      top: { de: ["Bergamotte", "Pfirsich"], en: ["Bergamot", "Peach"] },
      heart: { de: ["Tuberose", "Jasmin"], en: ["Tuberose", "Jasmine"] },
      base: { de: ["Sandelholz", "Vanille"], en: ["Sandalwood", "Vanilla"] },
    },
    tagline: {
      de: "Weiße Blüten bei Nacht — betörend und samtig.",
      en: "White flowers at night — beguiling and velvety.",
    },
    description: {
      de: "Fleur Nocturne entfaltet sich wie ein Garten in der Dämmerung: Tuberose und Jasmin treffen auf cremiges Sandelholz. Ein sinnlicher Duft, der lange in Erinnerung bleibt.",
      en: "Fleur Nocturne unfolds like a garden at dusk: tuberose and jasmine meet creamy sandalwood. A sensual fragrance that lingers in memory.",
    },
    releaseYear: 2022,
  },
  {
    slug: "atelier-solane-ambre-dore",
    brand: "Atelier Solane",
    name: "Ambre Doré",
    concentration: "EdP",
    category: "unisex",
    season: ["autumn", "winter"],
    sizes: [
      { ml: 50, priceEur: 138 },
      { ml: 100, priceEur: 168 },
    ],
    image: {
      src: product("atelier-solane-ambre-dore"),
      alt: { de: "Flakon von Ambre Doré auf einem Tisch", en: "Ambre Doré bottle on a table" },
    },
    notes: {
      top: { de: ["Mandarine", "Kardamom"], en: ["Mandarin", "Cardamom"] },
      heart: { de: ["Amber", "Zimt"], en: ["Amber", "Cinnamon"] },
      base: { de: ["Vanille", "Tonkabohne"], en: ["Vanilla", "Tonka Bean"] },
    },
    tagline: { de: "Warmer Amber mit einem Hauch Gewürz.", en: "Warm amber with a hint of spice." },
    description: {
      de: "Ambre Doré verbindet sonnenwarmen Amber mit Kardamom und einer Prise Zimt. Ein Duft wie ein goldener Nachmittag — behaglich, nahbar, unaufdringlich elegant.",
      en: "Ambre Doré blends sun-warmed amber with cardamom and a touch of cinnamon. A fragrance like a golden afternoon — comforting, approachable, quietly elegant.",
    },
    releaseYear: 2021,
  },
  {
    slug: "atelier-solane-neroli-sauvage",
    brand: "Atelier Solane",
    name: "Neroli Sauvage",
    concentration: "EdT",
    category: "herren",
    season: ["spring", "summer"],
    sizes: [
      { ml: 50, priceEur: 98 },
      { ml: 100, priceEur: 128 },
    ],
    image: {
      src: product("atelier-solane-neroli-sauvage"),
      alt: { de: "Parfümflakon auf einem Stein", en: "Fragrance bottle on a rock" },
    },
    notes: {
      top: { de: ["Neroli", "Grapefruit"], en: ["Neroli", "Grapefruit"] },
      heart: { de: ["Geranie", "Salbei"], en: ["Geranium", "Sage"] },
      base: { de: ["Vetiver", "Zedernholz"], en: ["Vetiver", "Cedarwood"] },
    },
    tagline: { de: "Frisches Neroli trifft auf erdiges Vetiver.", en: "Fresh neroli meets earthy vetiver." },
    description: {
      de: "Neroli Sauvage ist ein luftiger, grüner Duft für den Tag: spritzige Zitrusnoten, ein Herz aus Kräutern, ein erdiges Fundament aus Vetiver. Klar, unkompliziert, vielseitig.",
      en: "Neroli Sauvage is an airy, green fragrance for daytime wear: zesty citrus, an herbal heart, an earthy vetiver base. Clear, uncomplicated, versatile.",
    },
    releaseYear: 2024,
  },
  {
    slug: "casa-brunelli-cuir-vetiver",
    brand: "Casa Brunelli",
    name: "Cuir Vétiver",
    concentration: "EdP",
    category: "herren",
    season: ["autumn", "winter"],
    sizes: [
      { ml: 50, priceEur: 148 },
      { ml: 100, priceEur: 178 },
    ],
    image: {
      src: product("casa-brunelli-cuir-vetiver"),
      alt: { de: "Flasche Eau de Parfum neben Steinen", en: "Eau de parfum bottle next to stones" },
    },
    notes: {
      top: { de: ["Bergamotte", "schwarzer Pfeffer"], en: ["Bergamot", "Black Pepper"] },
      heart: { de: ["Leder", "Vetiver"], en: ["Leather", "Vetiver"] },
      base: { de: ["Patschuli", "Moschus"], en: ["Patchouli", "Musk"] },
    },
    tagline: { de: "Raues Leder, geglättet von Vetiver.", en: "Rugged leather, smoothed by vetiver." },
    description: {
      de: "Cuir Vétiver verbindet den rauchigen Charakter von Leder mit der Frische von Vetiver. Ein Duft mit Charakter — für alle, die dezente Auffälligkeit schätzen.",
      en: "Cuir Vétiver pairs the smoky character of leather with the freshness of vetiver. A fragrance with character — for those who appreciate understated presence.",
    },
    releaseYear: 2022,
  },
  {
    slug: "casa-brunelli-rosa-selvaggia",
    brand: "Casa Brunelli",
    name: "Rosa Selvaggia",
    concentration: "Parfum",
    category: "damen",
    season: ["spring", "summer"],
    sizes: [
      { ml: 50, priceEur: 198 },
      { ml: 100, priceEur: 255 },
    ],
    image: {
      src: product("casa-brunelli-rosa-selvaggia"),
      alt: { de: "Klarer Parfümflakon", en: "Clear fragrance bottle" },
    },
    notes: {
      top: { de: ["Himbeere", "rosa Pfeffer"], en: ["Raspberry", "Pink Pepper"] },
      heart: { de: ["Damaszener Rose", "Pfingstrose"], en: ["Damask Rose", "Peony"] },
      base: { de: ["Moschus", "weißes Holz"], en: ["Musk", "White Woods"] },
    },
    tagline: { de: "Eine wilde, ungezähmte Rose.", en: "A wild, untamed rose." },
    description: {
      de: "Rosa Selvaggia zeigt die Rose von ihrer unerwarteten Seite: fruchtig-frisch im Ansatz, samtig-warm im Abgang. Modern, selbstbewusst, nie kitschig.",
      en: "Rosa Selvaggia shows the rose from its unexpected side: fruity-fresh at first, velvety-warm in the drydown. Modern, confident, never saccharine.",
    },
    releaseYear: 2023,
  },
  {
    slug: "noir-vermeil-ambre-absolu",
    brand: "Noir & Vermeil",
    name: "Ambre Absolu",
    concentration: "Extrait",
    category: "unisex",
    season: ["autumn", "winter"],
    sizes: [
      { ml: 30, priceEur: 262 },
      { ml: 50, priceEur: 355 },
    ],
    image: {
      src: product("noir-vermeil-ambre-absolu"),
      alt: { de: "Flakon auf weißem Tuch", en: "Bottle on white fabric" },
    },
    notes: {
      top: { de: ["Kardamom", "Orange"], en: ["Cardamom", "Orange"] },
      heart: { de: ["Amber", "Weihrauch"], en: ["Amber", "Frankincense"] },
      base: { de: ["Labdanum", "Vanille"], en: ["Labdanum", "Vanilla"] },
    },
    tagline: { de: "Amber in seiner intensivsten Form.", en: "Amber in its most intense form." },
    description: {
      de: "Ambre Absolu ist ein dichter, harziger Duft, der Wärme und Tiefe in Einklang bringt. Weihrauch und Labdanum geben ihm eine fast sakrale Ruhe.",
      en: "Ambre Absolu is a dense, resinous fragrance that balances warmth and depth. Frankincense and labdanum lend it an almost sacred stillness.",
    },
    releaseYear: 2021,
  },
  {
    slug: "noir-vermeil-nuit-blanche",
    brand: "Noir & Vermeil",
    name: "Nuit Blanche",
    concentration: "EdP",
    category: "damen",
    season: ["autumn", "winter"],
    sizes: [
      { ml: 50, priceEur: 142 },
      { ml: 100, priceEur: 172 },
    ],
    image: {
      src: product("noir-vermeil-nuit-blanche"),
      alt: { de: "Eau de Parfum Flakon in Nahaufnahme", en: "Close-up of an eau de parfum bottle" },
    },
    notes: {
      top: { de: ["schwarze Johannisbeere", "Bergamotte"], en: ["Blackcurrant", "Bergamot"] },
      heart: { de: ["Iris", "Veilchen"], en: ["Iris", "Violet"] },
      base: { de: ["Moschus", "Zedernholz"], en: ["Musk", "Cedarwood"] },
    },
    tagline: { de: "Eine durchwachte Nacht in Puder und Veilchen.", en: "A sleepless night in powder and violet." },
    description: {
      de: "Nuit Blanche ist samtig und pudrig zugleich: Iris und Veilchen treffen auf einen sanften Moschus-Abgang. Ein Duft für lange Abende.",
      en: "Nuit Blanche is velvety and powdery at once: iris and violet meet a soft musk drydown. A fragrance for long evenings.",
    },
    releaseYear: 2024,
  },
  {
    slug: "rive-nocturne-bergamote-sauvage",
    brand: "Rive Nocturne",
    name: "Bergamote Sauvage",
    concentration: "EdC",
    category: "herren",
    season: ["spring", "summer"],
    sizes: [
      { ml: 50, priceEur: 96 },
      { ml: 100, priceEur: 124 },
    ],
    image: {
      src: product("rive-nocturne-bergamote-sauvage"),
      alt: { de: "Parfümflakon vor dunklem Hintergrund", en: "Fragrance bottle against a dark background" },
    },
    notes: {
      top: { de: ["Bergamotte", "Zitrone"], en: ["Bergamot", "Lemon"] },
      heart: { de: ["Lavendel", "Rosmarin"], en: ["Lavender", "Rosemary"] },
      base: { de: ["Moschus", "Eichenmoos"], en: ["Musk", "Oakmoss"] },
    },
    tagline: { de: "Mediterrane Frische bei Sonnenuntergang.", en: "Mediterranean freshness at sunset." },
    description: {
      de: "Bergamote Sauvage fängt den Duft eines Abends an der Küste ein: herbe Zitrusfrische, ein Hauch Kräuter, ein moosig-warmer Abgang.",
      en: "Bergamote Sauvage captures the scent of an evening by the coast: tart citrus freshness, a touch of herbs, a mossy, warm drydown.",
    },
    releaseYear: 2022,
  },
  {
    slug: "rive-nocturne-iris-nocturne",
    brand: "Rive Nocturne",
    name: "Iris Nocturne",
    concentration: "EdP",
    category: "unisex",
    season: ["autumn", "winter"],
    sizes: [
      { ml: 50, priceEur: 152 },
      { ml: 100, priceEur: 182 },
    ],
    image: {
      src: product("rive-nocturne-iris-nocturne"),
      alt: { de: "Flasche auf gelbem Untergrund", en: "Bottle on a yellow surface" },
    },
    notes: {
      top: { de: ["rosa Pfeffer", "Bergamotte"], en: ["Pink Pepper", "Bergamot"] },
      heart: { de: ["Iris", "Kaschmirholz"], en: ["Iris", "Cashmere Wood"] },
      base: { de: ["Amber", "Moschus"], en: ["Amber", "Musk"] },
    },
    tagline: { de: "Iris, gehüllt in Dämmerlicht.", en: "Iris wrapped in twilight." },
    description: {
      de: "Iris Nocturne ist kühl und erdig zugleich — die pudrige Eleganz der Iris trifft auf warmes Kaschmirholz. Zurückhaltend, aber unverwechselbar.",
      en: "Iris Nocturne is cool and earthy at once — the powdery elegance of iris meets warm cashmere wood. Restrained, yet unmistakable.",
    },
    releaseYear: 2023,
  },
  {
    slug: "ombre-cuir-santal-fume",
    brand: "Ombre & Cuir",
    name: "Santal Fumé",
    concentration: "Extrait",
    category: "herren",
    season: ["autumn", "winter"],
    sizes: [
      { ml: 30, priceEur: 258 },
      { ml: 50, priceEur: 348 },
    ],
    image: {
      src: product("ombre-cuir-santal-fume"),
      alt: { de: "Klarglasflasche mit silbernem Deckel", en: "Clear glass bottle with a silver cap" },
    },
    notes: {
      top: { de: ["Bergamotte", "rosa Pfeffer"], en: ["Bergamot", "Pink Pepper"] },
      heart: { de: ["Sandelholz", "Rauch"], en: ["Sandalwood", "Smoke"] },
      base: { de: ["Leder", "Vanille"], en: ["Leather", "Vanilla"] },
    },
    tagline: { de: "Rauchiges Sandelholz, veredelt mit Leder.", en: "Smoky sandalwood, refined with leather." },
    description: {
      de: "Santal Fumé verbindet cremiges Sandelholz mit einer rauchigen Facette und einem weichen Leder-Fundament. Intensiv, aber nie schwer.",
      en: "Santal Fumé blends creamy sandalwood with a smoky facet and a soft leather base. Intense, yet never heavy.",
    },
    releaseYear: 2023,
  },
  {
    slug: "ombre-cuir-musc-blanc",
    brand: "Ombre & Cuir",
    name: "Musc Blanc",
    concentration: "EdP",
    category: "damen",
    season: ["spring", "summer"],
    sizes: [
      { ml: 50, priceEur: 136 },
      { ml: 100, priceEur: 166 },
    ],
    image: {
      src: product("ombre-cuir-musc-blanc"),
      alt: { de: "Rote Glasflasche mit Verschluss", en: "Red glass bottle with a cap" },
    },
    notes: {
      top: { de: ["Birne", "Bergamotte"], en: ["Pear", "Bergamot"] },
      heart: { de: ["weißer Moschus", "Freesie"], en: ["White Musk", "Freesia"] },
      base: { de: ["Zedernholz", "Vanille"], en: ["Cedarwood", "Vanilla"] },
    },
    tagline: { de: "Sauber, warm, unaufdringlich schön.", en: "Clean, warm, quietly beautiful." },
    description: {
      de: "Musc Blanc ist der Inbegriff von „Skin Scent“ — ein Duft, der wie die eigene Haut wirkt, nur ein bisschen schöner. Leicht, warm, alltagstauglich.",
      en: "Musc Blanc is the definition of a skin scent — a fragrance that feels like your own skin, just a little more beautiful. Light, warm, easy to wear every day.",
    },
    releaseYear: 2024,
  },
  {
    slug: "lumiere-sauvage-jasmin-dore",
    brand: "Lumière Sauvage",
    name: "Jasmin Doré",
    concentration: "EdP",
    category: "damen",
    season: ["summer", "autumn"],
    sizes: [
      { ml: 50, priceEur: 144 },
      { ml: 100, priceEur: 174 },
    ],
    image: {
      src: product("lumiere-sauvage-jasmin-dore"),
      alt: { de: "Parfümflakon auf einem Ständer", en: "Fragrance bottle on a stand" },
    },
    notes: {
      top: { de: ["Mandarine", "Osmanthus"], en: ["Mandarin", "Osmanthus"] },
      heart: { de: ["Jasmin", "Ylang-Ylang"], en: ["Jasmine", "Ylang-Ylang"] },
      base: { de: ["Sandelholz", "Honig"], en: ["Sandalwood", "Honey"] },
    },
    tagline: { de: "Goldener Jasmin im Abendlicht.", en: "Golden jasmine in evening light." },
    description: {
      de: "Jasmin Doré ist ein üppiger weißer Blumenstrauß, abgerundet von Honig und Sandelholz. Warm, opulent, aber nie erdrückend.",
      en: "Jasmin Doré is a lush white floral bouquet, rounded out by honey and sandalwood. Warm, opulent, but never overwhelming.",
    },
    releaseYear: 2022,
  },
  {
    slug: "lumiere-sauvage-vetiver-imperial",
    brand: "Lumière Sauvage",
    name: "Vetiver Impérial",
    concentration: "EdT",
    category: "herren",
    season: ["spring", "summer"],
    sizes: [
      { ml: 50, priceEur: 99 },
      { ml: 100, priceEur: 129 },
    ],
    image: {
      src: product("lumiere-sauvage-vetiver-imperial"),
      alt: { de: "Zwei Flaschen auf weißem Textil", en: "Two bottles on white fabric" },
    },
    notes: {
      top: { de: ["Grapefruit", "Kardamom"], en: ["Grapefruit", "Cardamom"] },
      heart: { de: ["Vetiver", "Salbei"], en: ["Vetiver", "Sage"] },
      base: { de: ["Zedernholz", "Moschus"], en: ["Cedarwood", "Musk"] },
    },
    tagline: { de: "Vetiver in seiner klarsten Form.", en: "Vetiver in its clearest form." },
    description: {
      de: "Vetiver Impérial ist ein moderner Klassiker: grüne Frische, ein erdiges Vetiver-Herz, ein sauberes Holz-Fundament. Vielseitig für jeden Tag.",
      en: "Vetiver Impérial is a modern classic: green freshness, an earthy vetiver heart, a clean woody base. Versatile for everyday wear.",
    },
    releaseYear: 2021,
  },
];
