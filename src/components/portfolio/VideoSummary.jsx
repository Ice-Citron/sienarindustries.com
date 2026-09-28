import React, { useEffect, useState } from "react";
import matter from "gray-matter";

export default function VideoSummary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch("/content/portfolio/foundations/video-summary.md");
        if (!resp.ok) {
          throw new Error(`VideoSummary fetch error: ${resp.status}`);
        }
        const raw = await resp.text();
        const { data: frontMatter } = matter(raw);
        setData(frontMatter);
      } catch (err) {
        console.error("VideoSummary error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading Video Summary...</div>;
  if (!data) return <div>Error loading video data</div>;

  // data.heading, data.description, data.video_url, data.video_caption
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 className="text-2xl font-bold mb-3">{data.heading}</h2>
      <p className="mb-4">{data.description}</p>

      {/* Responsive video wrapper */}
      <div 
        className="video-wrapper" 
        style={{
          position: "relative",
          width: "100%",
          // 56.25% = 16:9 aspect ratio; adjust if needed
          paddingBottom: "56.25%",
          marginBottom: "1rem",
          overflow: "hidden",
        }}
      >
        <iframe
          src={data.video_url}
          title="Maker Portfolio Video"
          frameBorder="0"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {data.video_caption && (
        <p style={{ fontStyle: "italic" }}>{data.video_caption}</p>
      )}
    </div>
  );
}
