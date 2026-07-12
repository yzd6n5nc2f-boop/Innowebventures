import { Link } from "react-router-dom";
import SiteShell from "../components/SiteShell";
import styles from "../styles/home.module.css";
import "../styles/cohesion.css";

const applications = [
  {
    name: "AI Assessment",
    description: "A guided assessment that identifies practical AI and automation opportunities across an organisation.",
    url: "https://applications.innowebventures.com/group-ai-assessment/",
    category: "Discovery",
  },
  {
    name: "TenderRadar",
    description: "Focused tender discovery and filtering designed to reduce the time spent searching for relevant opportunities.",
    url: "https://applications.innowebventures.com/TenderRadar/",
    category: "Business intelligence",
  },
  {
    name: "Catalogue Converter",
    description: "A workflow application for converting and standardising supplier catalogue data into a consistent format.",
    url: "https://applications.innowebventures.com/catalogueconverter/",
    category: "Operations",
  },
  {
    name: "CalRivoRecon",
    description: "Automated reconciliation, validation and exception handling for complex operational datasets.",
    url: "https://applications.innowebventures.com/calrivorecon/",
    category: "Data operations",
  },
  {
    name: "Pathfinder",
    description: "Structured intelligent guidance that helps users move through complex choices and workflow decisions.",
    url: "https://applications.innowebventures.com/pathfinder/",
    category: "Decision support",
  },
];

export default function Work() {
  return (
    <SiteShell>
      <section className={`${styles.pageSection} applicationsPage`}>
        <div className={`${styles.pageIntro} applicationsIntro`}>
          <div className={styles.sectionKicker}>Applications</div>
          <h1>Working examples built through the Forge Suite.</h1>
          <p>
            These applications demonstrate the range of workflows InnoWeb can shape, build and deploy. They are examples
            of the platform in use rather than a fixed catalogue of off-the-shelf products.
          </p>
        </div>

        <div className="applicationsGallery">
          {applications.map((application) => (
            <a
              key={application.name}
              className="applicationGalleryCard"
              href={application.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="applicationLivePreview" aria-hidden="true">
                <iframe src={application.url} title="" tabIndex={-1} loading="lazy" />
              </div>
              <div className="applicationGalleryBody">
                <div className="applicationMeta">
                  <span>{application.category}</span>
                  <strong>Live</strong>
                </div>
                <h2>{application.name}</h2>
                <p>{application.description}</p>
                <span className="applicationLaunch">Launch application ↗</span>
              </div>
            </a>
          ))}
        </div>

        <div className="pageJourney">
          <div>
            <span>Next</span>
            <h2>See how these systems are shaped and delivered.</h2>
          </div>
          <Link to="/delivery-method">Explore How We Build →</Link>
        </div>
      </section>
    </SiteShell>
  );
}
