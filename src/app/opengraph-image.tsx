import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          backgroundImage:
            "radial-gradient(900px circle at 15% -10%, rgba(47,111,238,0.35), transparent 60%), radial-gradient(700px circle at 100% 110%, rgba(56,189,248,0.25), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #2f6fee, #38bdf8)",
              color: "white",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ display: "flex", color: "white", fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Velqora Media
          </div>
        </div>
        <div style={{ display: "flex", color: "#9ca3af", fontSize: 28, maxWidth: 820, textAlign: "center" }}>
          Performance marketing &amp; brand partnerships
        </div>
        <div style={{ display: "flex", color: "#2f6fee", fontSize: 20, fontWeight: 600, marginTop: 36, letterSpacing: "0.08em" }}>
          REAL ACCOUNTS · REAL AD SPEND · REAL ROAS
        </div>
      </div>
    ),
    { ...size }
  );
}
