// src/components/portfolio/ProjectGrid.jsx
import React, { useEffect, useState } from "react";
import matter from "gray-matter";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";  // <-- import Link from React Router
import SkillsShowcase from "./SkillsShowcase";
import VideoSummary from "./VideoSummary";  // If you have a separate video component

if (!window.Buffer) window.Buffer = Buffer;

const ProjectGrid = ({ category }) => {
  const [subsections, setSubsections] = useState([]);
  const [skillSections, setSkillSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        // 1) Fetch and parse the category's index.md
        const cacheBust = `?v=${Date.now()}`;
        const indexPath = `/content/portfolio/${category}/index.md${cacheBust}`;
        const indexResp = await fetch(indexPath);
        if (!indexResp.ok) {
          throw new Error(`Failed to fetch index.md: ${indexResp.status}`);
        }
        const rawIndex = await indexResp.text();
        const { data: indexData } = matter(rawIndex);

        // 2) Load subsections
        let loadedSubs = [];
        if (indexData.sections) {
          for (const section of indexData.sections) {
            try {
              const subResp = await fetch(section.path + cacheBust);
              if (!subResp.ok) {
                console.error(`Subsection fetch failed: ${section.path}`);
                continue;
              }
              const subRaw = await subResp.text();
              const { data: subData } = matter(subRaw);

              loadedSubs.push({
                ...subData,
                sectionTitle: section.title,
              });
            } catch (subErr) {
              console.error("Error fetching subsection:", subErr);
            }
          }
        } else {
          console.warn("No 'sections' found in index.md");
        }

        // 3) Load skills.md if present
        let loadedSkillSections = [];
        if (indexData.skills?.path) {
          try {
            const skillsPath = indexData.skills.path;
            const skillsResp = await fetch(skillsPath + cacheBust);
            if (skillsResp.ok) {
              const rawSkills = await skillsResp.text();
              const { data: skillsData } = matter(rawSkills);
              loadedSkillSections = skillsData.skill_sections || [];
            } else {
              console.warn("No skills.md found or fetch error:", skillsResp.status);
            }
          } catch (skillsErr) {
            console.warn("Error fetching skills.md:", skillsErr);
          }
        }

        setSubsections(loadedSubs);
        setSkillSections(loadedSkillSections);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [category]);

  // If "resume", show embedded PDF
  if (category === "resume") {
    const pdfPath = "/assets/Shi-Hao-Ng__Resume.pdf";
    const isMobile = typeof window !== "undefined" &&
      (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768);
    const pdfSrc = isMobile
      ? `https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + pdfPath)}&embedded=true`
      : pdfPath;

    return (
      <div style={{ marginTop: "2rem" }}>
        <h2 className="text-2xl font-bold mb-3">Resume</h2>
        <div style={{
          width: "100%",
          height: "85vh",
          border: "1px solid var(--border-color, #dee2e6)",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <iframe
            src={pdfSrc}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Resume - Shi Hao Ng"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <a
            href={pdfPath}
            download
            style={{
              display: "inline-block",
              padding: "0.5rem 1.5rem",
              border: "1px solid var(--border-color, #dee2e6)",
              borderRadius: "6px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Download PDF
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Loading {category}...</div>;
  }
  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }
  if (!subsections.length && !skillSections.length) {
    return <div>No data found for {category}.</div>;
  }

  return (
    <div className="p-4">
      {category === "foundations" && <VideoSummary />}
      {/* Render each subsection */}
      {subsections.map((sub, idx) => (
        <div className="subsection-block" key={idx}>
          <h2 className="text-2xl font-semibold mb-2">
            {sub.sectionTitle || sub.subsection}
          </h2>

          {/* Projects */}
          {(sub.show_projects !== false && sub.projects?.length > 0) && (
            <>
              <h3 className="text-xl font-medium mb-2">Projects</h3>
              <div className="po_items_ho mb-4">
                {sub.projects.map((proj, pIdx) => (
                  <div key={pIdx} className="po_item">
                    <img src={proj.image} alt={proj.title} />
                    <div className="content">
                      <h4 className="project-title">{proj.title}</h4>
                      <p>{proj.description}</p>

                      {/* 1) If you have a 'slug', link to /project/slug */}
                      {proj.slug && (
                        <Link
                          to={`/project/${proj.slug}`}
                          className="project-link"
                        >
                          view project
                        </Link>
                      )}

                      {/* 2) If there's an external link, e.g. 'http' in proj.link: */}
                      {proj.link && proj.link.startsWith("http") && !proj.slug && (
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          view project
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}


          {/* Certifications */}
          {(sub.show_certifications !== false && sub.certifications?.length > 0) && (
            <>
              <h3 className="text-xl font-medium mb-2">Certifications</h3>
              <ul className="list-items mb-4">
                {sub.certifications.map((cert, cIdx) => (
                  <li key={cIdx} className="cert-line mb-1">
                    <strong>{cert.title}</strong>
                    {cert.org && ` – ${cert.org}`}
                    {cert.year && ` (${cert.year})`}
                    {cert.detail_page && (
                      <a
                        href={cert.detail_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-2 text-primary"
                      >
                        [more details]
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Courses */}
          {(sub.show_courses !== false && sub.courses?.length > 0) && (
            <>
              <h3 className="text-xl font-medium mb-2">Courses</h3>
              <ul className="list-items mb-4">
                {sub.courses.map((course, cIdx) => (
                  <li key={cIdx} className="course-line mb-1">
                    <strong>{course.title}</strong>
                    {course.institution && ` – ${course.institution}`}
                    {course.status && ` (${course.status})`}
                    {course.detail_page && (
                      <a
                        href={course.detail_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-2 text-primary"
                      >
                        [more details]
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Books */}
          {(sub.show_books !== false && sub.books?.length > 0) && (
            <>
              <h3 className="text-xl font-medium mb-2">Books</h3>
              <ul className="list-items mb-4">
                {sub.books.map((book, bIdx) => (
                  <li key={bIdx} className="book-line mb-1">
                    <strong>{book.title}</strong>
                    {book.author && ` by ${book.author}`}
                    {book.progress && ` — ${book.progress}`}
                    {book.detail_page && (
                      <a
                        href={book.detail_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-2 text-primary"
                      >
                        [more details]
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}

      {/* If there's a separate Skills approach */}
      {skillSections.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            My Skills &amp; Tools
          </h2>
          <SkillsShowcase skillSections={skillSections} />
        </>
      )}
    </div>
  );
};

export default ProjectGrid;
