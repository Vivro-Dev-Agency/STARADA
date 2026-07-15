import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

type OgImageOptions = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** When set, uses the home hero layout with gold bar + mark */
  footer?: string;
};

export function createOgImage({ eyebrow, title, subtitle, footer }: OgImageOptions) {
  if (footer) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #c9a962 0%, #a88b4a 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: "0.35em",
              color: "#c9a962",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.05,
              color: "#f5f0e8",
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(245, 240, 232, 0.65)",
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.15em",
              color: "rgba(201, 169, 98, 0.8)",
              textTransform: "uppercase",
            }}
          >
            {footer}
          </div>
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 999,
              border: "1px solid #c9a962",
              alignItems: "center",
              justifyContent: "center",
              color: "#c9a962",
              fontSize: 24,
            }}
          >
            S
          </div>
        </div>
      </div>,
      { ...ogSize },
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#050505",
        padding: "64px 72px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: "0.3em",
          color: "#c9a962",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 68,
          lineHeight: 1.05,
          color: "#f5f0e8",
          maxWidth: 900,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          color: "rgba(245, 240, 232, 0.6)",
          marginTop: 24,
        }}
      >
        {subtitle}
      </div>
    </div>,
    { ...ogSize },
  );
}
