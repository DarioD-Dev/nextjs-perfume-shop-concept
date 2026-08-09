// next-intl doesn't ship a pick() helper itself (despite docs examples
// implying one) — this is the small utility those examples assume exists.
export function pickMessages<T extends Record<string, unknown>, K extends keyof T>(
  messages: T,
  namespaces: K[],
): Pick<T, K> {
  return Object.fromEntries(namespaces.map((namespace) => [namespace, messages[namespace]])) as Pick<T, K>;
}
