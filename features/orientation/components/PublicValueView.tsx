export function PublicValueView({ value }: { readonly value: unknown }) {
  if (value === null || value === undefined || value === "") return <span className="empty-value">Not provided</span>;
  if (typeof value === "boolean") return <span>{value ? "true" : "false"}</span>;
  if (typeof value !== "object") return <span>{String(value)}</span>;
  if (Array.isArray(value)) {
    if (!value.length) return <span className="empty-value">None</span>;
    return <ol className="contract-list">{value.map((item, index) => <li key={index}><PublicValueView value={item} /></li>)}</ol>;
  }
  const entries = Object.entries(value as Readonly<Record<string, unknown>>);
  if (!entries.length) return <span className="empty-value">None</span>;
  return (
    <dl className="nested-contract">
      {entries.map(([key, nested]) => <div key={key}><dt>{key}</dt><dd><PublicValueView value={nested} /></dd></div>)}
    </dl>
  );
}
