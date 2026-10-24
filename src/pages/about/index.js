import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  contactConfig,
  socialprofils,
} from "../../content_option";
import SkillsShowcase from "../../components/portfolio/SkillsShowcase";

export const About = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">About Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              {dataabout.aboutme.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Contact</h3>
          </Col>
          <Col lg="7">
            <address style={{ lineHeight: '2' }}>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_IMPERIAL_EMAIL}`}>
                {contactConfig.YOUR_IMPERIAL_EMAIL}
              </a>
              <br />
              <strong>Personal Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <strong>Phone:</strong>{" "}
              <a href={`tel:${contactConfig.YOUR_FONE}`}>
                {contactConfig.YOUR_FONE}
              </a>
              <br />
              <strong>LinkedIn:</strong>{" "}
              <a href={contactConfig.YOUR_LINKEDIN} target="_blank" rel="noopener noreferrer">
                Shi Hao Ng
              </a>
              <br />
              <strong>GitHub:</strong>{" "}
              <a href={socialprofils.github} target="_blank" rel="noopener noreferrer">
                Ice-Citron
              </a>
            </address>
          </Col>
        </Row>
        {dataabout.currentProjects && (
          <Row className="sec_sp">
            <Col lg="5">
              <h3 className="color_sec py-4">Current Projects</h3>
            </Col>
            <Col lg="7">
              {dataabout.currentProjects.map((project, i) => (
                <div className="service_ py-4" key={i}>
                  <h5 className="service__title">
                    {project.title}
                    {project.codebase && (
                      <>
                        {" | "}
                        <a href={project.codebase} target="_blank" rel="noopener noreferrer">
                          CodeBase
                        </a>
                      </>
                    )}
                  </h5>
                  {project.description && (
                    <p className="service_desc">{project.description}</p>
                  )}
                  {project.points && (
                    <ul className="service_desc" style={{ listStyle: "disc", paddingLeft: "1.25rem" }}>
                      {project.points.map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {dataabout.interests && (
                <p className="mt-3"><em>{dataabout.interests}</em></p>
              )}
            </Col>
          </Row>
        )}
        <Row className=" sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Work Timeline</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {worktimeline.map((data, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{data.jobtitle}</th>
                      <td>{data.where}</td>
                      <td>{data.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Technical Skills</h3>
          </Col>
          <Col lg="7">
            <SkillsShowcase skillSections={skills} />
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
