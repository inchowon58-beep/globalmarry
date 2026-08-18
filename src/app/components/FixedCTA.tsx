import { ShieldCheck } from "lucide-react";
import { SITE, CTA_AGENCIES, CTA_BUILD } from "@/lib/site";

export default function FixedCTA() {
  return (
    <div className="fixed-cta" aria-label="검증된 정식등록업체 확인">
      <div className="fixed-cta-inner">
        <a href={SITE.agenciesPath} className="fixed-cta-call">
          <ShieldCheck size={16} aria-hidden />
          {CTA_AGENCIES}
        </a>
        <a
          href={SITE.infocsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed-cta-build"
        >
          {CTA_BUILD}
        </a>
      </div>
    </div>
  );
}
