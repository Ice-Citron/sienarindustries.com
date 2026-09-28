import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import matter from "gray-matter";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import MyCarousel from "./Carousel";

// Add the base URL utility function
const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development' 
    ? '' 
    : window.location.origin;
};

// PDF Viewer component remains the same
const PDFViewer = ({ url }) => (
  <div style={{ width: '100%', height: '600px', marginBottom: '1rem' }}>
    <iframe
      src={url}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="PDF Viewer"
    />
  </div>
);

// Google Slides Embed component
const GoogleSlides = ({ url, height = 569 }) => {
  // Convert share URL to embed URL
  // From: https://docs.google.com/presentation/d/ID/edit...
  // To: https://docs.google.com/presentation/d/ID/embed
  const embedUrl = url.replace(/\/edit.*$/, '/embed?start=false&loop=false&delayms=3000');

  return (
    <div style={{
      width: '100%',
      marginBottom: '1rem',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <iframe
        src={embedUrl}
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
        }}
        allowFullScreen={true}
        title="Google Slides Presentation"
      />
    </div>
  );
};

// Icon mapping for DocumentLink — flat monochrome SVGs
const LINK_ICONS = {
  github: (
    <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  ),
  doc: (
    <svg height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  link: (
    <svg height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
};

const getDocIcon = (icon) => {
  if (icon === "code" || icon === "💻") return LINK_ICONS.github;
  if (icon === "📄") return LINK_ICONS.doc;
  if (icon === "🌐" || icon === "🔗") return LINK_ICONS.link;
  return LINK_ICONS.link;
};

// Document Link Box component for external documents
const DocumentLink = ({ href, title, description, icon = "📄" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      margin: '1rem 0',
      backgroundColor: 'transparent',
      border: '1px solid var(--text-color, #333)',
      borderLeft: '3px solid var(--text-color, #333)',
      borderRadius: '0',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.15s ease',
      fontFamily: '"SFMono-Regular", "Fira Code", "Consolas", monospace',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--text-color, #333)';
      e.currentTarget.style.color = 'var(--bg-color, #fff)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = 'inherit';
    }}
  >
    <span style={{
      marginRight: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    }}>
      {getDocIcon(icon)}
    </span>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontWeight: '600',
        fontSize: '0.9rem',
        letterSpacing: '0.02em',
        marginBottom: description ? '0.15rem' : 0,
      }}>
        {title}
      </div>
      {description && (
        <div style={{
          fontSize: '0.8rem',
          opacity: 0.7,
        }}>
          {description}
        </div>
      )}
    </div>
    <span style={{
      marginLeft: '0.75rem',
      fontWeight: '700',
      fontSize: '1.1rem',
      flexShrink: 0,
    }}>
      &gt;
    </span>
  </a>
);

// Slug → GitHub repo URL mapping
const GITHUB_REPOS = {
  // Computer Science
  'project-ladder': 'https://github.com/Ice-Citron/Project-Ladder',
  'project-automaton': 'https://github.com/Ice-Citron/Project-Automaton',
  'armv8-rackinsert-c': 'https://github.com/Ice-Citron/ARMv8-RackInsert-C',
  'gpt-valkyrie': 'https://github.com/Ice-Citron/nanoGPT-Valkyrie',
  'edutech': 'https://github.com/Ice-Citron/Edutech-Recon-Drone',
  'game-engine': 'https://github.com/Ice-Citron/Sparky',
  'ibm-datathon': 'https://github.com/Ice-Citron/IBM-Z-Datathon',
  'new-dejima': 'https://github.com/Ice-Citron/New-Dejima',
  'skyhammer': 'https://github.com/Ice-Citron/Gemini-Hackathon',
  'edth-warsaw': 'https://github.com/Ice-Citron/EDTH-Warsaw',
  'perplexity-hack': 'https://github.com/Ice-Citron/Perplexity-Hackathon-2025',
  'rockstar-datathon': 'https://github.com/Ice-Citron/Rockstar-GTAV-Datathon',
  'reply-aim': 'https://github.com/Ice-Citron/Reply-AIM-Hackathon',
  'rl-iterate': 'https://github.com/Ice-Citron/RL-Iterate-London-Hackathon',
  'project-liberty': 'https://github.com/Ice-Citron/Project-Liberty',
  // Engineering
  'robocup': 'https://github.com/First-Order-RoboCup-SSL/Utama-Core',
  'isaac-sim': 'https://github.com/Ice-Citron/Project-Automaton',
  'railgun': 'https://github.com/Ice-Citron/Project-Railgun',
  'f1-in-schools': 'https://github.com/Ice-Citron/anduril',
  'display-spinner': 'https://github.com/Ice-Citron/DT-Coursework',
};

const GitHubButton = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.6rem',
      padding: '0.45rem 0.9rem',
      backgroundColor: 'transparent',
      border: '1px solid var(--text-color, #333)',
      borderRadius: '0',
      textDecoration: 'none',
      color: 'inherit',
      fontSize: '0.85rem',
      fontWeight: '600',
      fontFamily: '"SFMono-Regular", "Fira Code", "Consolas", monospace',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      transition: 'all 0.15s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--text-color, #333)';
      e.currentTarget.style.color = 'var(--bg-color, #fff)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = 'inherit';
    }}
  >
    <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
    Source Code
  </a>
);

export default function ProjectDetail() {  // Changed name to match your file
  const { slug } = useParams();

  const [frontMatter, setFrontMatter] = useState({});
  const [mdxBody, setMdxBody] = useState("");
  const [CompiledMDX, setCompiledMDX] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMdxFile() {
      try {
        // Debug logging
        console.log("Current pathname:", window.location.pathname);

        // Ensure we have correct slug
        const currentSlug = slug || window.location.pathname.split('/').pop();
        console.log("Using slug:", currentSlug);

        // Try multiple sections to find the project
        const sections = ['engineering', 'computer-science', 'electronic-art', 'academic', 'miscellaneous'];
        let rawText = null;
        let foundSection = null;

        for (const section of sections) {
          const fileUrl = new URL(`/content/portfolio/${section}/projects/${currentSlug}/index.mdx`, window.location.origin);
          console.log("Trying:", fileUrl.toString());

          try {
            const resp = await fetch(fileUrl);
            if (resp.ok) {
              const text = await resp.text();
              // SPA fallback returns index.html with 200 for missing files
              // Detect and skip HTML responses
              if (text.trimStart().startsWith('<!') || text.trimStart().startsWith('<html')) {
                console.log(`Skipping ${section} - got HTML fallback`);
                continue;
              }
              rawText = text;
              foundSection = section;
              console.log(`Found project in ${section}`);
              break;
            }
          } catch (e) {
            // Continue to next section
          }
        }

        if (!rawText) {
          throw new Error(`Failed to fetch MDX for '${currentSlug}' in any section`);
        }

        console.log("[ProjectDetail] raw MDX length =>", rawText.length);

        const { data, content } = matter(rawText);
        console.log("[ProjectDetail] frontMatter =>", data);

        setFrontMatter(data || {});
        setMdxBody(content || "");
      } catch (err) {
        console.error("[ProjectDetail] Error =>", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMdxFile();
  }, [slug]);

  // 2) Evaluate the MDX content => produce a React component
  useEffect(() => {
    async function compileMdx() {
      if (!mdxBody) return; // no content yet
      try {
        console.log("[ProjectDetailMdx] evaluate() with length =>", mdxBody.length);

        // The new approach: pass the leftover MDX + the "runtime" from "react/jsx-runtime"
        const { default: MdxComponent } = await evaluate(mdxBody, {
          ...runtime,
          remarkPlugins: [remarkGfm],
        });

        // MdxComponent is a React component
        setCompiledMDX(() => MdxComponent);
      } catch (err) {
        console.error("[ProjectDetailMdx] compile error =>", err);
        setError(err.message);
      }
    }

    compileMdx();
  }, [mdxBody]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  if (loading || !CompiledMDX) {
    return <p>Loading MDX...</p>;
  }

  // "CompiledMDX" is our final React component from the MDX source
  // We pass "MyCarousel" in the "components" prop. 
  // So in .mdx, <MyCarousel> is recognized.
  const MdxOutput = (
    <CompiledMDX
      components={{
        MyCarousel,
        PDFViewer,
        DocumentLink,
        GoogleSlides,
      }}
    />
  );

  return (
    <div style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: "0.5rem",  // Reduced padding
    }}>
      <div style={{ marginBottom: '1rem' }}> {/* Reduced margin for header */}
        {frontMatter.title && (
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            {frontMatter.title}
          </h1>
        )}
        {frontMatter.summary && (
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '0.5rem'
          }}>
            {frontMatter.summary}
          </p>
        )}
        {GITHUB_REPOS[slug] && (
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <GitHubButton url={GITHUB_REPOS[slug]} />
          </div>
        )}
      </div>

      {/* Show PDF if specified in frontmatter */}
      {frontMatter.pdfUrl && (
        <PDFViewer url={frontMatter.pdfUrl} />
      )}

      {/* Main content with reduced spacing */}
      <div style={{ lineHeight: 1.4 }}>
        {MdxOutput}
      </div>
    </div>
  );
}