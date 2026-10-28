import { ImageResponse } from "next/og";

export const alt = "Bizpedia Tech — Ideas to Intelligence. Intelligence to Impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 80% 30%, #0b2463 0%, #04102e 45%, #02050d 80%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 800 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg,#5cc8ff,#1546e8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>B</div>
          Bizpedia <span style={{ color: "#3d9bff", fontWeight: 600 }}>Tech</span>
        </div>
        <div style={{ marginTop: 50, fontSize: 76, fontWeight: 800, lineHeight: 1.05, display: "flex", flexDirection: "column" }}>
          <span>Ideas to Intelligence.</span>
          <span style={{ color: "#3d9bff" }}>Intelligence to Impact.</span>
        </div>
        <div style={{ marginTop: 36, fontSize: 28, color: "#b4c1dd" }}>AI solutions · Custom software · SaaS · Intelligent automation</div>
      </div>
    ),
    size,
  );
}
