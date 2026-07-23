"use client";

import styles from "./Certifications.module.css";
import Image from "next/image";
import HudBadge from "../../HudBadge";
import TiltCard from "../../TiltCard";
import PixelFrame from "../../PixelFrame";
import PixelSparkle from "../../PixelSparkle";
import PixelIcon from "../../PixelIcon";
import { CERTIFICATIONS } from "../../../data/portfolio";

export { CERTIFICATIONS } from "../../../data/portfolio";
export const CERT_COUNT = CERTIFICATIONS.length;

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <h2 className={styles.heading}>
          <PixelIcon variant="certifications" />
          Licenses & Certifications
        </h2>

        {CERTIFICATIONS.map((cert) => (
          <TiltCard key={cert.name}>
            <PixelFrame>
              <div className={styles.certification}>
                <h3>
                  {cert.name}
                  <PixelSparkle className={styles.statusBadge}>
                    <HudBadge tone="success">Verified</HudBadge>
                  </PixelSparkle>
                </h3>
                <p>
                  <strong>Issuer:</strong> {cert.issuer} |{" "}
                  <strong>Issued:</strong> {cert.issued}
                </p>
                {cert.role && (
                  <p>
                    <strong>Role:</strong> {cert.role}
                  </p>
                )}
                {cert.credentialId && (
                  <p>
                    <strong>Credential ID:</strong> {cert.credentialId}
                  </p>
                )}
                <p>
                  <strong>Skills:</strong> {cert.skills}
                </p>
                {cert.credential?.type === "image" ? (
                  <Image
                    src={cert.credential.src}
                    alt={cert.credential.alt}
                    width={cert.credential.width}
                    height={cert.credential.height}
                  />
                ) : cert.credential ? (
                  <a href={cert.credential.href} target="_blank" rel="noopener noreferrer">
                    {cert.credential.label}
                  </a>
                ) : null}
              </div>
            </PixelFrame>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
