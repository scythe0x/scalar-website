import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#030405",
          color: "#edf0f3",
          border: "2px solid #1b2230",
          fontFamily: "monospace",
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        <span style={{ color: "#5c7eff" }}>S</span>/
      </div>
    ),
    size,
  );
}
