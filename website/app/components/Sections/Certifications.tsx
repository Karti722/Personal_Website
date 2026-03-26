"use client";

export default function Certifications() {
  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <h2>Licenses & Certifications</h2>

        <div className="certification">
          <h3>WEB 101 - Intro to Web Development</h3>
          <p>
            <strong>Issuer:</strong> CodePath | <strong>Issued:</strong> Dec 2024
          </p>
          <p>
            <strong>Skills:</strong> HTML, CSS, JavaScript
          </p>
          <img
            src="/photos/codepath.png"
            alt="WEB 101 Certificate"
            style={{ maxWidth: "300px" }}
          />
        </div>

        <div className="certification">
          <h3>SkyIT Certificate of Completion</h3>
          <p>
            <strong>Issuer:</strong> SkyIT Services (GBCS Group) |{" "}
            <strong>Issued:</strong> Aug 2024
          </p>
          <p>
            <strong>Skills:</strong> Django REST Framework, Python, MySQL, JSON,
            Postman, Leadership
          </p>
          <a
            href="https://drive.google.com/file/d/1eLSAd0xzImy1HpPkSSetRVlh00CbomWn/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show credential
          </a>
        </div>

        <div className="certification">
          <h3>CodeDay Labs Micro-Intern</h3>
          <p>
            <strong>Issuer:</strong> Canvas Credentials |{" "}
            <strong>Issued:</strong> Apr 2024
          </p>
          <p>
            <strong>Credential ID:</strong> 6629141bb1afdc68657da11e
          </p>
          <p>
            <strong>Skills:</strong> Node.js, Mocha.js, Docker, Teamwork, Test
            Automation
          </p>
          <a
            href="https://badgr.com/public/assertions/FXrB84uZRIiRGFyJ2a6n3g"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show credential
          </a>
        </div>
      </div>
    </section>
  );
}