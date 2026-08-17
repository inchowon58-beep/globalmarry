import { Phone, ShieldCheck } from "lucide-react";
import { SITE, CTA_AGENCIES, CTA_BUILD } from "@/lib/site";

export default function FixedCTA() {
  return (
    <div className="fixed-cta" aria-label="검증된 정식등록업체 확인">
      <div className="fixed-cta-inner">
        <div className="fixed-cta-row">
          <a
            href={SITE.agenciesPath}
            className="fixed-cta-call"
            style={{ backgroundColor: "#111827", color: "#ffffff" }}
          >
            <ShieldCheck size={16} aria-hidden color="#ffffff" />
            {CTA_AGENCIES}
          </a>
        </div>
        <a
          href={SITE.phoneTel}
          className="fixed-cta-build"
          style={{ backgroundColor: "#111827", color: "#ffffff" }}
        >
          <Phone size={16} aria-hidden color="#ffffff" />
          {SITE.phoneDisplay}
        </a>
        <a
          href={SITE.infocsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed-cta-build"
          style={{ backgroundColor: "#111827", color: "#ffffff" }}
        >
          {CTA_BUILD}
        </a>
      </div>
    </div>
  );
}
