/*
 * Structured data.
 *
 * The escape is not cosmetic: any "<" inside a content string would otherwise
 * be parsed as the start of a tag and close the script element early, which is
 * both a broken page and an injection vector. JSON.stringify does not escape
 * it, so it is done here. Unicode escapes are still valid JSON, so the parsed
 * value is unchanged.
 */
const escapeForScript = (data: unknown): string =>
  JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

const JsonLd = ({ data }: { data: unknown }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: escapeForScript(data) }}
  />
);

export default JsonLd;
