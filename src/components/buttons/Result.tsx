import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMatching } from "../../hooks/useMatching";

export function Result() {
  const { entries, loadMore } = useMatching();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <div style={{ height: "600px", overflowY: "scroll" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ width: "80px", border: "1px solid" }}>No.</th>
            <th style={{ border: "1px solid" }}>概念</th>
            <th style={{ width: "300px", border: "1px solid" }}>ID</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id.toString()}>
              <td style={{ border: "1px solid" }}>{entry.index.toLocaleString()}</td>
              <td
                style={{
                  maxWidth: "200px",
                  overflowX: "scroll",
                  whiteSpace: "nowrap",
                  border: "1px solid",
                }}
              >
                {entry.unicodeString}
              </td>
              <td
                style={{
                  maxWidth: "300px",
                  overflowX: "scroll",
                  whiteSpace: "nowrap",
                  border: "1px solid",
                }}
              >
                {entry.id.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={ref} />
    </div>
  );
}
