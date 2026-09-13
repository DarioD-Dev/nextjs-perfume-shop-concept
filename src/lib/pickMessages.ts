// next-intl doesn't ship a pick() helper itself (despite docs examples
// implying one) — this is the small utility those examples assume exists.
//
// Der Cast unten bleibt bewusst stehen: Object.fromEntries kennt den
// Zusammenhang zwischen Schlüsseln und Werten grundsätzlich nicht und liefert
// immer einen Index-Typ. Die Signatur oben ist die Stelle, an der die
// Korrektheit geprüft wird; hier wird sie nur wiederhergestellt. Ein Cast an
// einer Typsystemgrenze, nicht über einen Zweifel hinweg.
export function pickMessages<T extends Record<string, unknown>, K extends keyof T>(
  messages: T,
  namespaces: K[],
): Pick<T, K> {
  return Object.fromEntries(
    namespaces.map((namespace) => [namespace, messages[namespace]]),
  ) as Pick<T, K>;
}
