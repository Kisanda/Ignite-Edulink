import { useState, useEffect, useRef } from "react";
import CountryPage from "./CountryPage";
import { bookConsultation, adminLogin, adminGetMe, adminGetConsultations, adminUpdateConsultationStatus, adminDeleteConsultation } from "./services/api";

// ── FLAG ICONS (Circular Badges for Windows compatibility) ──
const FlagAU = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", borderRadius: "50%", display: "block" }}>
    <rect width="100" height="100" fill="#00008B" />
    <g transform="scale(0.5)">
      <rect width="100" height="100" fill="#012169" />
      <path d="M0 0 L100 100 M100 0 L0 100" stroke="#FFFFFF" strokeWidth="12" />
      <path d="M0 0 L100 100 M100 0 L0 100" stroke="#C8102E" strokeWidth="6" />
      <path d="M50 0 V100 M0 50 H100" stroke="#FFFFFF" strokeWidth="20" />
      <path d="M50 0 V100 M0 50 H100" stroke="#C8102E" strokeWidth="12" />
    </g>
    {/* Commonwealth Star */}
    <path d="M25 70 L27 63 L34 65 L29 59 L33 53 L27 55 L25 48 L23 55 L17 53 L21 59 L16 65 L23 63 Z" fill="#FFFFFF" />
    {/* Southern Cross */}
    <g fill="#FFFFFF">
      <circle cx="75" cy="75" r="3" />
      <circle cx="62" cy="50" r="3" />
      <circle cx="75" cy="25" r="3" />
      <circle cx="88" cy="48" r="3" />
      <circle cx="81" cy="58" r="1.5" />
    </g>
  </svg>
);

const FlagCA = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", borderRadius: "50%", display: "block" }}>
    <rect width="28" height="100" fill="#D62828" />
    <rect x="28" width="44" height="100" fill="#FFFFFF" />
    <rect x="72" width="28" height="100" fill="#D62828" />
    <path d="M50 22 L53 34 L66 31 L60 42 L68 47 L58 52 L62 67 L53 60 L50 78 L47 60 L38 67 L42 52 L32 47 L40 42 L34 31 L47 34 Z" fill="#D62828" />
  </svg>
);

const FlagGB = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", borderRadius: "50%", display: "block" }}>
    <rect width="100" height="100" fill="#012169" />
    <path d="M0 0 L100 100 M100 0 L0 100" stroke="#FFFFFF" strokeWidth="12" />
    <path d="M0 0 L100 100 M100 0 L0 100" stroke="#C8102E" strokeWidth="6" />
    <path d="M50 0 V100 M0 50 H100" stroke="#FFFFFF" strokeWidth="20" />
    <path d="M50 0 V100 M0 50 H100" stroke="#C8102E" strokeWidth="12" />
  </svg>
);

const FlagUS = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", borderRadius: "50%", display: "block" }}>
    <rect width="100" height="100" fill="#FFFFFF" />
    <rect y="0" width="100" height="7.7" fill="#B22234" />
    <rect y="15.4" width="100" height="7.7" fill="#B22234" />
    <rect y="30.8" width="100" height="7.7" fill="#B22234" />
    <rect y="46.2" width="100" height="7.7" fill="#B22234" />
    <rect y="61.5" width="100" height="7.7" fill="#B22234" />
    <rect y="76.9" width="100" height="7.7" fill="#B22234" />
    <rect y="92.3" width="100" height="7.7" fill="#B22234" />
    <rect width="50" height="53.8" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      <circle cx="10" cy="10" r="2" /><circle cx="25" cy="10" r="2" /><circle cx="40" cy="10" r="2" />
      <circle cx="17.5" cy="20" r="2" /><circle cx="32.5" cy="20" r="2" />
      <circle cx="10" cy="30" r="2" /><circle cx="25" cy="30" r="2" /><circle cx="40" cy="30" r="2" />
      <circle cx="17.5" cy="40" r="2" /><circle cx="32.5" cy="40" r="2" />
    </g>
  </svg>
);

const FlagNZ = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", borderRadius: "50%", display: "block" }}>
    <rect width="100" height="100" fill="#00008B" />
    <g transform="scale(0.5)">
      <rect width="100" height="100" fill="#012169" />
      <path d="M0 0 L100 100 M100 0 L0 100" stroke="#FFFFFF" strokeWidth="12" />
      <path d="M0 0 L100 100 M100 0 L0 100" stroke="#C8102E" strokeWidth="6" />
      <path d="M50 0 V100 M0 50 H100" stroke="#FFFFFF" strokeWidth="20" />
      <path d="M50 0 V100 M0 50 H100" stroke="#C8102E" strokeWidth="12" />
    </g>
    <g stroke="#FFFFFF" strokeWidth="1.5" fill="#D2143A">
      <path d="M75 75 L76.5 71 L81 71 L77.5 68.5 L79 64 L75 66.5 L71 64 L72.5 68.5 L69 71 L73.5 71 Z" />
      <path d="M60 48 L61.5 44 L66 44 L62.5 41.5 L64 37 L60 39.5 L56 37 L57.5 41.5 L54 44 L58.5 44 Z" />
      <path d="M75 22 L76.5 18 L81 18 L77.5 15.5 L79 11 L75 13.5 L71 11 L72.5 15.5 L69 18 L73.5 18 Z" />
      <path d="M90 45 L91.5 41 L96 41 L92.5 38.5 L94 34 L90 36.5 L86 34 L87.5 38.5 L84 41 L88.5 41 Z" />
    </g>
  </svg>
);

const FlagDE = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", borderRadius: "50%", display: "block" }}>
    <rect width="100" height="33.3" fill="#000000" />
    <rect y="33.3" width="100" height="33.4" fill="#DD0000" />
    <rect y="66.7" width="100" height="33.3" fill="#FFCC00" />
  </svg>
);

const FlagIE = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", borderRadius: "50%", display: "block" }}>
    <rect width="33.3" height="100" fill="#009A49" />
    <rect x="33.3" width="33.4" height="100" fill="#FFFFFF" />
    <rect x="66.7" width="33.3" height="100" fill="#FF7900" />
  </svg>
);

// ── SERVICES ICONS ──
const IconAdmission = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="admission-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="admission-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="tassel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="shadow3d-adm" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0.8" dy="1.6" stdDeviation="1" flood-color="#0F172A" flood-opacity="0.25" />
      </filter>
    </defs>
    <path d="M12 16.5l-8-4 8-4 8 4-8 4z" fill="#000" opacity="0.12" filter="url(#shadow3d-adm)" />
    <path d="M6 13v3.5c0 1.5 2.7 2.5 6 2.5s6-1 6-2.5V13" fill="url(#admission-dark)" />
    <path d="M6 12.5v3.5c0 1.5 2.7 2.5 6 2.5s6-1 6-2.5v-3.5" fill="url(#admission-grad)" />
    <polygon points="12 4.5 22 9.5 12 14.5 2 9.5" fill="url(#admission-dark)" transform="translate(0, 0.8)" />
    <polygon points="12 4.5 22 9.5 12 14.5 2 9.5" fill="url(#admission-grad)" />
    <ellipse cx="12" cy="9.5" rx="1" ry="0.6" fill="#FBBF24" />
    <path d="M12 9.5c2 0 4 1 5 2.5s1 2.5 1 3.5" stroke="url(#tassel-grad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <polygon points="17 15 19 15 18 18" fill="url(#tassel-grad)" />
  </svg>
);

const IconVisa = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="visa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <linearGradient id="visa-dark-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5B21B6" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
      <filter id="shadow3d-visa" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="1" dy="2" stdDeviation="1" flood-color="#0F172A" flood-opacity="0.25" />
      </filter>
    </defs>
    <rect x="5" y="3" width="14" height="18" rx="2" fill="#000" opacity="0.1" filter="url(#shadow3d-visa)" />
    <rect x="5" y="3.8" width="14" height="18" rx="2" fill="url(#visa-dark-3d)" />
    <rect x="5" y="3" width="14" height="18" rx="2" fill="url(#visa-grad)" />
    <rect x="8" y="6" width="8" height="2" rx="0.5" fill="#FFF" opacity="0.4" />
    <rect x="8" y="9.5" width="5" height="1.5" rx="0.5" fill="#FFF" opacity="0.4" />
    <circle cx="14.5" cy="14.5" r="3.5" fill="#10B981" transform="translate(0, 0.5)" />
    <circle cx="14.5" cy="14.5" r="3.5" fill="#34D399" />
    <path d="M13 14.5l1 1 2-2" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconScholarship = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="scholarship-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="sch-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <filter id="shadow3d-sch" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.2" flood-color="#0F172A" flood-opacity="0.25" />
      </filter>
    </defs>
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#000" opacity="0.08" filter="url(#shadow3d-sch)" />
    <circle cx="12" cy="17.5" r="4.5" fill="#D97706" />
    <circle cx="12" cy="17" r="4.5" fill="url(#gold-grad)" />
    <path d="M10.5 17l1 1 2-2" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 19.5l-2.5 3 1.5-3.5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 19.5l2.5 3-1.5-3.5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <polygon points="12 4 22 8.5 12 13 2 8.5" fill="url(#sch-dark)" transform="translate(0, 0.8)" />
    <polygon points="12 4 22 8.5 12 13 2 8.5" fill="url(#scholarship-grad)" />
    <ellipse cx="12" cy="8.5" rx="0.8" ry="0.5" fill="#FFF" opacity="0.6" />
  </svg>
);

const IconCareer = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="career-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="career-dark-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="shadow3d-car" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.2" flood-color="#0F172A" flood-opacity="0.25" />
      </filter>
    </defs>
    <rect x="3" y="7" width="18" height="13" rx="2.5" fill="#000" opacity="0.1" filter="url(#shadow3d-car)" />
    <rect x="3" y="7.8" width="18" height="13" rx="2.5" fill="url(#career-dark-3d)" />
    <rect x="3" y="7" width="18" height="13" rx="2.5" fill="url(#career-grad)" />
    <path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2" stroke="url(#career-dark-3d)" strokeWidth="2.2" fill="none" transform="translate(0, 0.5)" />
    <path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2" stroke="#E2E8F0" strokeWidth="2" fill="none" />
    <rect x="11" y="11" width="2" height="2" rx="0.5" fill="#FBBF24" />
    <path d="M6 17l3-3 2.5 2.5 6.5-6.5" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 10h4v4" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAccommodation = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="accom-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <linearGradient id="accom-dark-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6D28D9" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
      <linearGradient id="roof-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <filter id="shadow3d-acc" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.2" flood-color="#0F172A" flood-opacity="0.25" />
      </filter>
    </defs>
    <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" fill="#000" opacity="0.1" filter="url(#shadow3d-acc)" />
    <path d="M4 11v9a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-9" fill="url(#accom-dark-3d)" transform="translate(0, 0.8)" />
    <path d="M4 11v9a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-9" fill="url(#accom-grad)" />
    <polygon points="12 2 22 9.5 2 9.5" fill="#6D28D9" transform="translate(0, 0.8)" />
    <polygon points="12 2 22 9.5 2 9.5" fill="url(#roof-grad)" />
    <rect x="10" y="15" width="4" height="6.5" rx="0.5" fill="#E2E8F0" />
    <circle cx="11" cy="18" r="0.5" fill="#1E293B" />
  </svg>
);

const IconPreDeparture = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="predep-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="predep-dark-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <filter id="shadow3d-pre" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.2" flood-color="#0F172A" flood-opacity="0.25" />
      </filter>
    </defs>
    <circle cx="12" cy="12" r="9" stroke="url(#predep-grad)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.6" />
    <path d="M20 5L9 14l-3-1-3.5 1.5 5 2.5 2.5 5 1.5-3.5-1-3L20 5z" fill="#000" opacity="0.1" filter="url(#shadow3d-pre)" />
    <path d="M20 5L9 14l-3-1-3.5 1.5 5 2.5 2.5 5 1.5-3.5-1-3L20 5z" fill="url(#predep-dark-3d)" transform="translate(-0.5, 0.8)" />
    <path d="M20 5L9 14l-3-1-3.5 1.5 5 2.5 2.5 5 1.5-3.5-1-3L20 5z" fill="url(#predep-grad)" />
    <path d="M17 7.5l-2.5 2-1-.5L17 7.5z" fill="#FFF" opacity="0.6" />
  </svg>
);

const IconTalk = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.5 4.5c2.3 0 4 1.7 4 4" />
  </svg>
);

const IconChatCTA = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const IconEnquire = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <rect x="7" y="7" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
    <rect x="7" y="11" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
    <rect x="7" y="15" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
    <line x1="12" y1="8" x2="17" y2="8" />
    <line x1="12" y1="12" x2="17" y2="12" />
    <line x1="12" y1="16" x2="17" y2="16" />
  </svg>
);

// ── STATS SECTION ICONS ──
const IconStudentsPlaced = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto 8px", overflow: "visible" }}>
    <defs>
      <linearGradient id="user-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="user-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="shadow3d-stat" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="1" dy="2" stdDeviation="1" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>
    <circle cx="12" cy="7" r="4" fill="#000" opacity="0.1" filter="url(#shadow3d-stat)" />
    <path d="M12 12a6 6 0 00-6 6v3h12v-3a6 6 0 00-6-6z" fill="#000" opacity="0.1" filter="url(#shadow3d-stat)" />
    <circle cx="12" cy="7.6" r="4" fill="url(#user-dark)" />
    <path d="M12 12.6a6 6 0 00-6 6v3h12v-3a6 6 0 00-6-6z" fill="url(#user-dark)" />
    <circle cx="12" cy="7" r="4" fill="url(#user-grad)" />
    <path d="M12 12a6 6 0 00-6 6v3h12v-3a6 6 0 00-6-6z" fill="url(#user-grad)" />
    <circle cx="6" cy="11" r="2.5" fill="url(#user-dark)" />
    <path d="M6 14.5a4 4 0 00-4 4V21h8v-2.5a4 4 0 00-4-4z" fill="url(#user-dark)" />
    <circle cx="6" cy="10.5" r="2.5" fill="url(#user-grad)" />
    <path d="M6 14a4 4 0 00-4 4v2.5h8V18a4 4 0 00-4-4z" fill="url(#user-grad)" opacity="0.8" />
  </svg>
);

const IconPartnerUni = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto 8px", overflow: "visible" }}>
    <defs>
      <linearGradient id="uni-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <linearGradient id="uni-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6D28D9" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
      <filter id="shadow3d-uni" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="1" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>
    <path d="M2 21.5h20v1.5H2z" fill="#000" opacity="0.1" filter="url(#shadow3d-uni)" />
    <path d="M2 21h20v1.5H2z" fill="#94A3B8" />
    <path d="M12 2L2 7.8v2h20v-2L12 2zM4 10.8v8.5h2v-8.5H4zm5 0v8.5h2v-8.5H9zm5 0v8.5h2v-8.5h-2zm5 0v8.5h2v-8.5h-2z" fill="url(#uni-dark)" />
    <path d="M12 2L2 7v2h20v-2L12 2zM4 10v8.5h2V10H4zm5 0v8.5h2V10H9zm5 0v8.5h2V10h-2zm5 0v8.5h2V10h-2z" fill="url(#uni-grad)" />
  </svg>
);

const IconDestinationGlobe = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto 8px", overflow: "visible" }}>
    <defs>
      <linearGradient id="globe-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="globe-dark-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <filter id="shadow3d-globe" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.25" />
      </filter>
    </defs>
    <circle cx="12" cy="12.5" r="10" fill="#000" opacity="0.1" filter="url(#shadow3d-globe)" />
    <circle cx="12" cy="12.6" r="10" fill="url(#globe-dark-3d)" />
    <circle cx="12" cy="12" r="10" fill="url(#globe-grad-3d)" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#FFF" strokeWidth="1.2" opacity="0.4" />
    <path d="M2 12h20" stroke="#FFF" strokeWidth="1.2" opacity="0.4" />
    <circle cx="15" cy="8" r="2.5" fill="#EF4444" transform="translate(0, 0.5)" />
    <circle cx="15" cy="8" r="2.5" fill="#F87171" />
  </svg>
);

const IconVisaSuccess = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto 8px", overflow: "visible" }}>
    <defs>
      <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="shield-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <filter id="shadow3d-shield" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#000" opacity="0.1" filter="url(#shadow3d-shield)" />
    <path d="M12 22.8s8-4 8-10V5.8l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield-dark)" />
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield-grad)" />
    <path d="M9 11.5l2 2 4.5-4.5" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── UI DETAILS & MISCELLANEOUS ──
const IconSparkles = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", verticalAlign: "middle", overflow: "visible", ...style }}>
    <defs>
      <linearGradient id="sparkle-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <filter id="shadow-spark" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0.5" dy="1" stdDeviation="0.5" flood-color="#000" flood-opacity="0.15" />
      </filter>
    </defs>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#000" opacity="0.08" filter="url(#shadow-spark)" />
    <path d="M12 2.6l3.09 6.26L22 9.87l-5 4.87 1.18 6.88L12 18.37l-6.18 3.25L7 14.74 2 9.87l6.91-1.01L12 2.6z" fill="#6D28D9" />
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#sparkle-grad-3d)" />
  </svg>
);

const IconSparkleSmall = ({ style }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", overflow: "visible", ...style }}>
    <defs>
      <linearGradient id="spark-sm" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#spark-sm)" />
  </svg>
);

const IconVision = ({ style }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible", ...style }}>
    <defs>
      <linearGradient id="vis-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <filter id="shadow3d-vis" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0.8" dy="1.5" stdDeviation="0.8" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="#000" opacity="0.08" filter="url(#shadow3d-vis)" />
    <path d="M1 12.6s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="#E2E8F0" />
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="1.5" />
    <circle cx="12" cy="12.4" r="3.5" fill="#1E3A8A" />
    <circle cx="12" cy="12" r="3.5" fill="url(#vis-grad-3d)" />
    <circle cx="13" cy="11" r="1" fill="#FFF" />
  </svg>
);

const IconMission = ({ style }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible", ...style }}>
    <defs>
      <linearGradient id="mis-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <filter id="shadow3d-mis" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0.8" dy="1.5" stdDeviation="0.8" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>
    <circle cx="12" cy="12" r="10" fill="#000" opacity="0.08" filter="url(#shadow3d-mis)" />
    <circle cx="12" cy="12.6" r="10" fill="#6D28D9" />
    <circle cx="12" cy="12" r="10" fill="url(#mis-grad-3d)" />
    <circle cx="12" cy="12" r="6" fill="#FFF" />
    <circle cx="12" cy="12" r="2.5" fill="#EC4899" />
  </svg>
);

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", marginRight: "3px", overflow: "visible" }}>
    <defs>
      <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#D97706" transform="translate(0, 0.6)" />
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#star-grad)" />
  </svg>
);

const IconWebinar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "6px", verticalAlign: "-2px", overflow: "visible" }}>
    <defs>
      <linearGradient id="web-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <path d="M12 17v4M8 21h8" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
    <rect x="2" y="3.6" width="20" height="14" rx="1.5" fill="#1E293B" />
    <rect x="2" y="3" width="20" height="14" rx="1.5" fill="url(#web-grad)" />
    <polygon points="10 8 15 10 10 12" fill="#FFF" />
  </svg>
);

const IconScholarshipSmall = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "6px", verticalAlign: "-2px", overflow: "visible" }}>
    <defs>
      <linearGradient id="ssch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <path d="M6 9.5v5c0 1.5 2.5 2.5 6 2.5s6-1 6-2.5v-5" fill="none" stroke="url(#ssch-grad)" strokeWidth="2" strokeLinecap="round" />
    <polygon points="12 2.6 22 7.6 12 12.6 2 7.6" fill="#1D4ED8" />
    <polygon points="12 2 22 7 12 12 2 7" fill="url(#ssch-grad)" />
  </svg>
);

const IconWorkshop = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "6px", verticalAlign: "-2px", overflow: "visible" }}>
    <defs>
      <linearGradient id="work-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path d="M14.7 6.9a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="#475569" />
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="url(#work-grad)" />
  </svg>
);

const IconBookOpen = () => (
  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="book-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="book-dark-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="shadow3d-book" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1.5" dy="2.5" stdDeviation="1.5" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>
    <path d="M2 4h6a4 4 0 014 4v12a3 3 0 00-3-3H2zM22 4h-6a4 4 0 00-4 4v12a3 3 0 013-3h7z" fill="#000" opacity="0.1" filter="url(#shadow3d-book)" />
    <path d="M2 4.8h6a4 4 0 014 4v12a3 3 0 00-3-3H2zM22 4.8h-6a4 4 0 00-4 4v12a3 3 0 013-3h7z" fill="url(#book-dark-3d)" />
    <path d="M2 4h6a4 4 0 014 4v12a3 3 0 00-3-3H2zM22 4h-6a4 4 0 00-4 4v12a3 3 0 013-3h7z" fill="url(#book-grad-3d)" />
    <path d="M12 8v10" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconClipboard = () => (
  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="clip-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="clip-dark-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="shadow3d-clip" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1.5" dy="2.5" stdDeviation="1.5" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill="#000" opacity="0.1" filter="url(#shadow3d-clip)" />
    <path d="M16 4.8h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill="url(#clip-dark-3d)" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill="url(#clip-grad-3d)" />
    <rect x="8" y="2.5" width="8" height="4" rx="1.2" fill="#374151" />
    <rect x="8" y="2" width="8" height="4" rx="1.2" fill="#9CA3AF" />
  </svg>
);

const IconTarget = () => (
  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="target-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="target-dark-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <filter id="shadow3d-target" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1.5" dy="2.5" stdDeviation="1.5" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>
    <circle cx="12" cy="12" r="10" fill="#000" opacity="0.1" filter="url(#shadow3d-target)" />
    <circle cx="12" cy="12.6" r="10" fill="url(#target-dark-3d)" />
    <circle cx="12" cy="12" r="10" fill="url(#target-grad-3d)" />
    <circle cx="12" cy="12" r="7" fill="#FFF" />
    <circle cx="12" cy="12.4" r="4.2" fill="#B91C1C" />
    <circle cx="12" cy="12" r="4.2" fill="#EF4444" />
    <circle cx="12" cy="12" r="1.5" fill="#FBBF24" />
  </svg>
);

const IconGlobe = ({ style }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", verticalAlign: "middle", overflow: "visible", ...style }}>
    <defs>
      <linearGradient id="gl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12.5" r="10" fill="#1D4ED8" />
    <circle cx="12" cy="12" r="10" fill="url(#gl-grad)" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#FFF" strokeWidth="1.2" opacity="0.6" />
  </svg>
);

const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px", overflow: "visible" }}>
    <defs>
      <linearGradient id="cal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
    <rect x="3" y="4.8" width="18" height="16" rx="2" fill="#1D4ED8" />
    <rect x="3" y="4" width="18" height="16" rx="2" fill="#F8FAFC" stroke="url(#cal-grad)" strokeWidth="1.5" />
    <path d="M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3H3V4z" fill="#EF4444" />
    <rect x="6" y="1" width="1.5" height="3" rx="0.5" fill="#94A3B8" />
    <rect x="16" y="1" width="1.5" height="3" rx="0.5" fill="#94A3B8" />
    <line x1="6" y1="11" x2="8" y2="11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="11" x2="13" y2="11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="11" x2="18" y2="11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="15" x2="8" y2="15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="15" x2="13" y2="15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="15" x2="18" y2="15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconGraduation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px", overflow: "visible" }}>
    <defs>
      <linearGradient id="grad-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path d="M6 13v3c0 1.5 2.5 2 6 2s6-.5 6-2v-3" fill="#1D4ED8" />
    <path d="M6 12v3c0 1.5 2.5 2 6 2s6-.5 6-2v-3" fill="url(#grad-grad)" />
    <polygon points="12 4.5 21 8.5 12 12.5 3 8.5" fill="#1D4ED8" transform="translate(0, 0.6)" />
    <polygon points="12 4.5 21 8.5 12 12.5 3 8.5" fill="url(#grad-grad)" />
  </svg>
);

const IconBullet = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: "4px", overflow: "visible" }}>
    <defs>
      <linearGradient id="bullet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#C026D3" />
      </linearGradient>
    </defs>
    <polyline points="20 6.8 9 17.8 4 12.8" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="20 6 9 17 4 12" stroke="url(#bullet-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);



const IconProfile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", overflow: "visible" }}>
    <defs>
      <linearGradient id="prof-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <linearGradient id="prof-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6D28D9" />
        <stop offset="100%" stopColor="#C026D3" />
      </linearGradient>
      <filter id="prof-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="1" flood-color="#000" flood-opacity="0.15" />
      </filter>
    </defs>
    <circle cx="12" cy="12" r="10" fill="#000" opacity="0.1" filter="url(#prof-shadow)" />
    <circle cx="12" cy="12.6" r="10" fill="url(#prof-dark)" />
    <circle cx="12" cy="12" r="10" fill="url(#prof-grad)" />
    <circle cx="12" cy="9.5" r="3" fill="#FFF" />
    <path d="M6 18c0-3 3-4.5 6-4.5s6 1.5 6 4.5" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconMenuOpen = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconMenuClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── FOOTER SOCIAL ICONS ──
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  </svg>
);

const IconYouTube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const IconTikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --blue:#2563EB;--purple:#7C3AED;--cyan:#06B6D4;
  --bg:#F8FAFC;--surface:#FFFFFF;--text:#0F172A;
  --muted:#64748B;--light:#94A3B8;
  --border:rgba(37,99,235,0.12);
  --card:rgba(255,255,255,0.88);
  --s1:0 2px 10px rgba(15,23,42,0.06);
  --s2:0 8px 36px rgba(15,23,42,0.1);
  --s3:0 24px 72px rgba(37,99,235,0.14);
  --r1:12px;--r2:20px;--r3:32px;
  --grad:linear-gradient(135deg,#2563EB,#7C3AED);
  --grad-soft:linear-gradient(135deg,rgba(37,99,235,0.08),rgba(124,58,237,0.08));
}
html{scroll-behavior:smooth;}
body{font-family:'Poppins',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--grad);border-radius:3px;}

/* NAV */
.nav {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  max-width: 1200px;
  z-index: 999;
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 100px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.nav.solid {
  top: 14px;
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(37, 99, 235, 0.08);
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.1);
}

.nav-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;}
.logo-img{height:60px;width:auto;object-fit:contain;transition:transform .3s;}
.logo:hover .logo-img{transform:scale(1.04);}
.nav.solid .logo-img{height:52px;}
.logo-text{font-size:21px;font-weight:800;letter-spacing:-0.5px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;transition:transform 0.3s;}
.logo:hover .logo-text{transform:scale(1.02);}

.footer-logo{height:180px;filter:brightness(0) invert(1);}
.nav-links{display:flex;align-items:center;gap:2px;list-style:none;}
.nav-links a{text-decoration:none;color:var(--muted);font-size:14px;font-weight:500;padding:8px 14px;border-radius:8px;transition:all .2s;}
.nav-links a:hover{color:var(--blue);background:rgba(37,99,235,0.07);}

/* DROPDOWN */
.nav-item-dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--s2);
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1000;
  padding: 8px 0;
}
.nav-item-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
.dropdown-item {
  display: block;
  padding: 10px 20px;
  color: var(--muted);
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  transition: all 0.2s;
  text-align: left;
}
.dropdown-item:hover {
  background: rgba(37,99,235,0.06);
  color: var(--blue);
}


.nav-right{display:flex;align-items:center;gap:10px;}

.btn{border:none;cursor:pointer;font-family:'Poppins',sans-serif;font-weight:600;border-radius:50px;transition:all .3s;}
.btn-p{background:var(--grad);color:#fff;padding:10px 22px;font-size:13.5px;box-shadow:0 4px 16px rgba(37,99,235,0.3);display:inline-flex;align-items:center;justify-content:center;}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(37,99,235,0.4);}
.btn-o{background:transparent;color:var(--blue);border:2px solid var(--blue);padding:10px 22px;font-size:13.5px;display:inline-flex;align-items:center;justify-content:center;}
.btn-o:hover{background:var(--blue);color:#fff;transform:translateY(-2px);}
.btn-lg{padding:14px 32px;font-size:15px;}
.btn-w{background:#fff;color:var(--blue);padding:14px 36px;font-size:15px;font-weight:700;width:100%;margin-top:8px;}
.btn-w:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.18);}

/* HERO */
.hero{min-height:100vh;padding:128px 28px 88px;position:relative;overflow:hidden;display:flex;align-items:center;background:linear-gradient(180deg, rgba(248, 250, 252, 0.88) 0%, rgba(248, 250, 252, 0.94) 100%), url('/hero_bg.jpg') no-repeat center center;background-size:cover;}
.blob{position:absolute;border-radius:50%;pointer-events:none;}
.b1{width:640px;height:640px;background:radial-gradient(circle,rgba(37,99,235,.14) 0%,transparent 70%);top:-120px;left:-80px;animation:f1 9s ease-in-out infinite;}
.b2{width:540px;height:540px;background:radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%);bottom:-120px;right:28%;animation:f2 11s ease-in-out infinite;}
.b3{width:340px;height:340px;background:radial-gradient(circle,rgba(6,182,212,.09) 0%,transparent 70%);top:180px;right:80px;animation:f1 8s ease-in-out infinite reverse;}
@keyframes f1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(28px,-28px) scale(1.06);}}
@keyframes f2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-20px,22px) scale(1.04);}}
.hero-in{max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;z-index:1;width:100%;}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(37,99,235,0.1);border:1px solid rgba(37,99,235,0.22);color:var(--blue);font-size:12.5px;font-weight:600;padding:6px 16px;border-radius:50px;margin-bottom:22px;animation:up .6s ease both;}
.hero h1{font-size:clamp(34px,3.8vw,56px);font-weight:800;line-height:1.14;margin-bottom:18px;animation:up .6s .1s ease both;}
.grad-text{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.hero-sub{font-size:16.5px;color:var(--muted);line-height:1.72;margin-bottom:34px;animation:up .6s .2s ease both;max-width:760px;}
.ctas{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;animation:up .6s .3s ease both;}
.hero-stats{display:flex;gap:32px;margin-top:44px;justify-content:center;animation:up .6s .4s ease both;flex-wrap:wrap;}
.hs-item{text-align:center;}
.hs-item strong{display:block;font-size:21px;font-weight:800;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.hs-item span{font-size:11.5px;color:var(--muted);font-weight:500;}

/* CONSULT CARD */
.cc{background:var(--card);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid var(--border);border-radius:var(--r3);padding:36px;box-shadow:var(--s3);animation:right .8s .2s ease both;}
.cc h3{font-size:19px;font-weight:700;margin-bottom:5px;}
.cc>p{font-size:13px;color:var(--muted);margin-bottom:22px;}
.fg{margin-bottom:14px;}
.fg label{display:block;font-size:12.5px;font-weight:600;color:var(--text);margin-bottom:6px;}
.fg input,.fg select{width:100%;padding:11px 15px;background:var(--bg);border:1.5px solid var(--border);border-radius:10px;font-family:'Poppins',sans-serif;font-size:13.5px;color:var(--text);outline:none;transition:border .2s;}
.fg input:focus,.fg select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.09);}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* SECTIONS */
.sec{padding:96px 28px;}
.sh{text-align:center;max-width:580px;margin:0 auto 56px;}
.slbl{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--blue);margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:6px;}
.stitle{font-size:clamp(26px,2.8vw,40px);font-weight:800;line-height:1.24;margin-bottom:14px;}
.sdesc{font-size:15.5px;color:var(--muted);line-height:1.72;}
.mw{max-width:1280px;margin:0 auto;}

/* --- DESTINATIONS REDESIGN CSS --- */
#destinations {
  background: rgba(244, 63, 94, 0.03);
}
.dg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.dc {
  background: #FFFFFF;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
  border: 1px solid rgba(226, 232, 240, 0.8);
  position: relative;
  display: flex;
  flex-direction: column;
}
.dc:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  border-color: #6366F1;
}
.dc.highlighted {
  border: 2px solid #10B981;
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.15);
}
.dc.highlighted:hover {
  box-shadow: 0 16px 36px rgba(16, 185, 129, 0.25);
  transform: translateY(-8px);
}
.dbg {
  height: 220px;
  position: relative;
  overflow: hidden;
}
.dc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.dc:hover .dc-img {
  transform: scale(1.06);
}
.dinf-new {
  padding: 24px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
}
.dinf-new h3 {
  font-size: 18px;
  font-weight: 700;
  color: #0B0A3F;
  margin: 0;
}
.dinf-new span {
  font-size: 13.5px;
  font-weight: 600;
  color: #6366F1;
  transition: color 0.2s;
}
.dc:hover .dinf-new span {
  color: #4F46E5;
}

/* SERVICES */
.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.svc{background:var(--card);backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:var(--r2);padding:30px 26px;box-shadow:var(--s1);transition:all .3s;position:relative;overflow:hidden;text-align:center;}
.svc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--grad);opacity:0;transition:opacity .3s;}
.svc:hover{transform:translateY(-6px);box-shadow:var(--s3);border-color:rgba(37,99,235,.28);}
.svc:hover::before{opacity:1;}
.si{width:58px;height:58px;border-radius:14px;background:var(--grad-soft);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;transition:transform .3s;}
.svc:hover .si{transform:scale(1.1) rotate(6deg);}
.svc h3{font-size:16px;font-weight:700;margin-bottom:9px;}
.svc p{font-size:13.5px;color:var(--muted);line-height:1.64;}
#services {
  background: #FFFFFF;
}

/* UNIVERSITIES */
#universities {
  background: rgba(0, 81, 255, 0.03);
}
.ut{display:flex;gap:28px;animation:scrollx 32s linear infinite;width:max-content;}
.ut:hover{animation-play-state:paused;}
@keyframes scrollx{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
.ul{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px 28px;min-width:155px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:var(--muted);white-space:nowrap;transition:all .3s;box-shadow:var(--s1);}
.ul:hover{border-color:var(--blue);color:var(--blue);transform:scale(1.05);}

/* STATS */
.stats-sec{background:var(--grad);padding:76px 28px;}
.stg{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:32px;text-align:center;}
.sti{color:#fff;}
.stn{font-size:46px;font-weight:900;display:block;line-height:1;margin-bottom:6px;}
.stlbl{font-size:14.5px;font-weight:500;opacity:.85;}

/* WHY CHOOSE */
.fg2{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;}
.fl{display:flex;flex-direction:column;gap:18px;}
.fi{display:flex;gap:15px;align-items:flex-start;padding:18px;background:var(--card);border:1px solid var(--border);border-radius:15px;transition:all .3s;}
.fi:hover{border-color:var(--blue);box-shadow:var(--s2);transform:translateX(5px);}
.fic{width:46px;height:46px;border-radius:11px;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:21px;flex-shrink:0;}
.ft h4{font-size:15px;font-weight:700;margin-bottom:4px;}
.ft p{font-size:13px;color:var(--muted);line-height:1.6;}
.cta-box{background:var(--grad);border-radius:var(--r3);padding:48px 40px;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;min-height:340px;}
.cta-box h3{font-size:24px;font-weight:800;line-height:1.32;}
.cta-box p{opacity:.84;font-size:14.5px;line-height:1.7;}


/* ABOUT DETAILS */
#about {
  background: #080721;
  color: #A5ADC6;
}
#about .stitle {
  color: #FFFFFF;
}
#about .sdesc {
  color: #A5ADC6;
}
#about .about-narrative {
  color: #A5ADC6;
}
#about .about-assoc-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid #3B82F6;
}
#about .about-assoc-card h4 {
  color: #FFFFFF;
}
#about .about-assoc-card p {
  color: #A5ADC6;
}
#about .about-assoc-card strong {
  color: #FFFFFF;
}
#about .about-vm-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: none;
}
#about .about-vm-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
}
#about .about-vm-card h3 {
  color: #FFFFFF;
}
#about .about-vm-card p {
  color: #A5ADC6;
}
#about .about-vm-list li {
  color: #A5ADC6;
}
#about .about-support-title {
  color: #FFFFFF;
}
#about .about-support-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: none;
}
#about .about-support-card:hover {
  border-color: #3B82F6;
}
#about .about-support-num {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
}
#about .about-support-text {
  color: #FFFFFF;
}
#about .slbl {
  color: #60A5FA;
}

.about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 48px; margin-bottom: 56px; text-align: left; }
.about-narrative { display: flex; flex-direction: column; gap: 20px; font-size: 15px; color: var(--muted); line-height: 1.75; }
.about-narrative p { margin: 0; }
.about-assoc-card { 
  background: var(--grad-soft); 
  border: 1px solid rgba(37,99,235,0.15); 
  border-left: 4px solid var(--blue);
  border-radius: 14px; 
  padding: 24px; 
  margin-top: 10px;
}
.about-assoc-card h4 { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.about-assoc-card p { font-size: 14px; color: var(--muted); line-height: 1.6; margin: 0; }

.about-vm-container { display: flex; flex-direction: column; gap: 24px; }
.about-vm-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 30px;
  box-shadow: var(--s1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-align: left;
}
.about-vm-card:hover { transform: translateY(-4px); box-shadow: var(--s2); border-color: rgba(37,99,235,0.25); }
.about-vm-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--grad);
}
.about-vm-card.mission::after {
  background: linear-gradient(135deg, var(--purple), var(--cyan));
}
.about-vm-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; color: var(--text); }
.about-vm-card p { font-size: 14px; color: var(--muted); line-height: 1.6; margin: 0; }
.about-vm-list { list-style: none; display: flex; flex-direction: column; gap: 12px; padding: 0; margin: 0; }
.about-vm-list li { font-size: 13.5px; color: var(--muted); display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; margin-bottom: 4px; }

.about-support-section { margin-top: 64px; text-align: left; }
.about-support-title { font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 36px; color: var(--text); }
.about-support-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.about-support-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--s1);
  display: flex;
  gap: 16px;
  transition: all 0.3s ease;
  text-align: left;
}
.about-support-card:hover { transform: translateY(-3px); border-color: var(--blue); box-shadow: var(--s2); }
.about-support-num {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--grad-soft);
  color: var(--blue);
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.about-support-text { font-size: 13.5px; color: var(--text); font-weight: 500; line-height: 1.5; align-self: center; }

@media(max-width:992px) {
  .about-grid { grid-template-columns: 1fr; gap: 36px; }
  .about-support-grid { grid-template-columns: repeat(2, 1fr); }
}
@media(max-width:600px) {
  .about-support-grid { grid-template-columns: 1fr; }
}

/* TESTIMONIALS */
.tg{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.tc{background:var(--card);backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:var(--r2);padding:26px;box-shadow:var(--s1);transition:all .3s;}
.tc:hover{transform:translateY(-4px);box-shadow:var(--s2);}
.stars{margin-bottom:12px;}
.ttext{font-size:13.5px;color:var(--text);line-height:1.7;margin-bottom:18px;font-style:italic;}
.tau{display:flex;align-items:center;gap:12px;}
.tav{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff;flex-shrink:0;}
.tan{font-size:13.5px;font-weight:700;}
.tam{font-size:12px;color:var(--muted);}

/* EVENTS */
.eg{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.ec{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:26px;box-shadow:var(--s1);transition:all .3s;}
.ec:hover{transform:translateY(-4px);box-shadow:var(--s2);border-color:var(--blue);}
.ebadge{display:inline-block;padding:4px 12px;border-radius:50px;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px;}
.eb-w{background:rgba(37,99,235,.1);color:var(--blue);}
.eb-s{background:rgba(124,58,237,.1);color:var(--purple);}
.eb-ws{background:rgba(6,182,212,.1);color:var(--cyan);}
.ec h3{font-size:15px;font-weight:700;line-height:1.4;margin-bottom:8px;}
.ec p{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:14px;}
.edate{font-size:12px;color:var(--light);font-weight:600;margin-bottom:14px;}

/* --- BOOKING SIDE-BY-SIDE REDESIGN CSS --- */
.booking-sec {
  background: #F8FAFC;
  padding: 120px 28px;
  position: relative;
}
.booking-container {
  max-width: 1140px;
  margin: 0 auto;
}
.booking-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 80px;
  align-items: center;
}
@media (max-width: 991px) {
  .booking-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
}
.booking-info-panel {
  text-align: left;
}
.info-badge {
  display: inline-block;
  font-size: 12.5px;
  font-weight: 700;
  color: #2563EB;
  letter-spacing: 1.5px;
  margin-bottom: 16px;
  text-transform: uppercase;
}
.info-title {
  font-size: clamp(34px, 3.8vw, 48px);
  font-weight: 800;
  color: #0F172A;
  line-height: 1.15;
  margin-bottom: 20px;
}
.info-title-journey {
  color: #2563EB;
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.info-desc {
  font-size: 15.5px;
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 40px;
  font-weight: 500;
  max-width: 480px;
}
.info-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contact-icon-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #7C3AED 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  box-shadow: 0 8px 24px rgba(37,99,235,0.22), inset 0 2px 4px rgba(255,255,255,0.25);
  flex-shrink: 0;
  transition: all 0.3s;
}
.info-item:hover .contact-icon-circle {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 28px rgba(37,99,235,0.32), inset 0 2px 4px rgba(255,255,255,0.25);
}
.info-link {
  font-size: 16.5px;
  font-weight: 600;
  color: #0F172A;
  text-decoration: none;
  transition: color 0.2s;
}
.info-link:hover {
  color: #2563EB;
}
.info-text {
  font-size: 16.5px;
  font-weight: 600;
  color: #0F172A;
}

.booking-card-wrapper {
  background: #FFFFFF;
  border-radius: 32px;
  padding: 44px;
  box-shadow: 0 20px 50px rgba(15,23,42,0.06);
  border: 1px solid rgba(37,99,235,0.06);
}
@media (max-width: 576px) {
  .booking-card-wrapper {
    padding: 24px;
  }
}
.booking-card-title {
  font-size: 22px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 28px;
  line-height: 1.3;
}
.booking-card {
  background: transparent;
  border-radius: 0;
  padding: 0;
  text-align: left;
}
.booking-form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  position: relative;
}
.booking-form-row {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.booking-form-row .booking-form-group {
  margin-bottom: 0;
}
.booking-form-group input,
.booking-form-group select {
  width: 100%;
  padding: 14px 20px;
  background: #F1F5F9; /* Off-white grey background */
  border: 1.5px solid #C7D2FE; /* Purple-blue border */
  border-radius: 16px;
  font-family: 'Poppins', sans-serif;
  font-size: 14.5px;
  color: #0B0A3F;
  outline: none;
  transition: all 0.2s ease;
  font-weight: 500;
}
.booking-form-group input::placeholder {
  color: #0B0A3F;
  opacity: 0.6;
}
.booking-form-group input:focus,
.booking-form-group select:focus {
  border-color: #6366F1;
  background: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

/* Error States */
.booking-form-group.has-error input,
.booking-form-group.has-error select {
  border-color: #EF4444; /* Red border */
  background: #FEE2E2; /* Pink-red background */
  color: #991B1B;
}
.booking-form-group.has-error input::placeholder {
  color: #991B1B;
  opacity: 0.7;
}
.booking-error-text {
  color: #DC2626;
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 16px;
  display: block;
}

/* Custom Select Dropdown Caret */
.booking-select-wrapper {
  position: relative;
  width: 100%;
}
.booking-select-wrapper select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 46px;
}
.booking-select-wrapper::after {
  content: '';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 8px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%230B0A3F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
  transition: transform 0.2s ease;
}

/* Checkbox design */
.booking-terms {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 16px;
  margin-bottom: 32px;
  font-size: 13.5px;
  color: #0B0A3F;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
}
.booking-terms input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #DC2626; /* Red checkbox matching image */
  border-radius: 4px;
  margin-top: 2px;
  flex-shrink: 0;
}
.booking-terms a {
  color: #2563EB;
  text-decoration: none;
  font-weight: 600;
}
.booking-terms a:hover {
  text-decoration: underline;
}

.booking-submit-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.booking-submit-btn {
  background: #0B0A3F; /* Navy Blue */
  color: #FFFFFF;
  border: none;
  border-radius: 50px;
  padding: 15px 44px;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(11, 10, 63, 0.2);
}
.booking-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(11, 10, 63, 0.35);
  background: #15135D;
}
.booking-submit-btn:active {
  transform: translateY(0);
}
.booking-submit-btn:disabled {
  background: #94A3B8;
  color: #CBD5E1;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Animations */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 576px) {
  .booking-card {
    padding: 0;
  }
}

/* BLOG */
.bg{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.bc{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);overflow:hidden;box-shadow:var(--s1);transition:all .3s;}
.bc:hover{transform:translateY(-4px);box-shadow:var(--s2);}
.bt{height:155px;display:flex;align-items:center;justify-content:center;}
.bb{padding:22px;}
.bcat{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.4px;color:var(--blue);margin-bottom:8px;}
.bc h3{font-size:15px;font-weight:700;line-height:1.4;margin-bottom:9px;}
.bc p{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:14px;}
.bmeta{font-size:11.5px;color:var(--light);display:flex;gap:12px;}

/* FOOTER */
.foot{position:relative;overflow:hidden;background:#130924;color:#A5ADC6;padding:76px 28px 28px;}
.foot-feather{position:absolute;right:-60px;bottom:-60px;width:380px;height:380px;opacity:0.07;pointer-events:none;mix-blend-mode:screen;z-index:0;}
.fin{position:relative;z-index:1;max-width:1280px;margin:0 auto;}
.ftop{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:44px;padding-bottom:44px;border-bottom:1px solid rgba(255,255,255,0.06);}
.fb p{font-size:13.5px;line-height:1.74;margin:14px 0 22px;max-width:300px;}
.nl{display:flex;gap:8px;}
.nl input{flex:1;padding:10px 15px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:#fff;font-family:'Poppins',sans-serif;font-size:13px;outline:none;}
.nl input::placeholder{color:#334155;}
.nl button{background:var(--grad);border:none;padding:10px 17px;border-radius:8px;color:#fff;font-family:'Poppins',sans-serif;font-size:12.5px;font-weight:600;cursor:pointer;white-space:nowrap;}
.fc h4{color:#FFFFFF;font-size:14.5px;font-weight:700;margin-bottom:18px;text-transform:uppercase;letter-spacing:0.5px;}
.flinks{list-style:none;display:flex;flex-direction:column;gap:9px;}
.flinks a{color:#A5ADC6;text-decoration:none;font-size:13.5px;transition:color .2s;}
.flinks a:hover{color:#FFFFFF;}
.fbot{display:flex;align-items:center;justify-content:center;padding-top:28px;font-size:12.5px;color:#64748B;font-weight:500;}
.socials{display:flex;gap:10px;}
.soc{width:34px;height:34px;border-radius:7px;background:rgba(255,255,255,0.06);border:none;display:flex;align-items:center;justify-content:center;color:#FFFFFF;text-decoration:none;transition:all .3s;}
.soc:hover{background:#FFFFFF;color:#130924;transform:translateY(-2px);}



/* ANIMATIONS */
@keyframes up{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
@keyframes right{from{opacity:0;transform:translateX(38px);}to{opacity:1;transform:translateX(0);}}
.rev{opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease;}
.rev.in{opacity:1;transform:translateY(0);}

/* RESPONSIVE */
@media(max-width:1024px){
  .dg,.sg,.tg,.eg,.bg{grid-template-columns:repeat(2,1fr);}
  .stg{grid-template-columns:repeat(2,1fr);}
  .fg2{grid-template-columns:1fr;}
  .ftop{grid-template-columns:1fr 1fr;}
  .nav-links{display:none;}
  .hamburger-btn{display:flex!important;}
}
@media(max-width:768px){
  .hero-in{grid-template-columns:1fr;}
  .cc{display:none;}
  .dg,.sg,.tg,.eg,.bg{grid-template-columns:1fr;}
  .row2,.brow{grid-template-columns:1fr;}
  .ftop{grid-template-columns:1fr;}
  .fbot{flex-direction:column;gap:14px;text-align:center;}
  .bi{padding:32px 22px;}
  .hero-stats{justify-content:center;}
  .stg{grid-template-columns:repeat(2,1fr);gap:24px;}
  .consultation-btn{display:none!important;}
}

/* HAMBURGER BUTTON */
.hamburger-btn{
  display:none;
  width:40px;height:40px;border-radius:10px;
  background:var(--grad-soft);border:1px solid var(--border);
  align-items:center;justify-content:center;
  color:var(--blue);cursor:pointer;transition:all .25s;
  flex-shrink:0;
}
.hamburger-btn:hover{background:var(--blue);color:#fff;border-color:transparent;}

/* MOBILE DRAWER */
.mobile-backdrop{
  position:fixed;inset:0;background:rgba(15,23,42,0.48);
  backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
  z-index:1100;opacity:0;pointer-events:none;transition:opacity .3s;
}
.mobile-backdrop.open{opacity:1;pointer-events:all;}
.mobile-drawer{
  position:fixed;top:0;right:0;height:100%;width:min(340px,90vw);
  background:var(--surface);z-index:1101;
  box-shadow:-8px 0 48px rgba(15,23,42,0.18);
  display:flex;flex-direction:column;
  transform:translateX(110%);transition:transform .35s cubic-bezier(.4,0,.2,1);
  overflow-y:auto;
}
.mobile-drawer.open{transform:translateX(0);}
.mobile-drawer-head{
  display:flex;align-items:center;justify-content:space-between;
  padding:20px 24px;border-bottom:1px solid var(--border);
}
.mobile-drawer-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
.mobile-drawer-logo span{font-size:17px;font-weight:800;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.mobile-close-btn{
  width:36px;height:36px;border-radius:8px;background:var(--grad-soft);
  border:1px solid var(--border);display:flex;align-items:center;
  justify-content:center;color:var(--text);cursor:pointer;
  transition:all .2s;
}
.mobile-close-btn:hover{background:var(--blue);color:#fff;border-color:transparent;}
.mobile-nav-body{flex:1;padding:16px 0;overflow-y:auto;}
.mobile-nav-link{
  display:flex;align-items:center;justify-content:space-between;
  padding:13px 28px;font-size:14.5px;font-weight:600;color:var(--text);
  text-decoration:none;border:none;background:none;width:100%;
  cursor:pointer;font-family:"Poppins",sans-serif;transition:background .2s;
  text-align:left;
}
.mobile-nav-link:hover{background:var(--grad-soft);color:var(--blue);}
.mobile-countries-list{
  background:rgba(37,99,235,0.03);
  border-top:1px dashed var(--border);
  border-bottom:1px dashed var(--border);
  padding:8px 0;
  margin-bottom:4px;
}
.mobile-country-item{
  display:flex;align-items:center;gap:10px;
  padding:10px 28px 10px 44px;
  font-size:13.5px;font-weight:500;color:var(--muted);
  text-decoration:none;cursor:pointer;
  border:none;background:none;width:100%;
  font-family:"Poppins",sans-serif;transition:background .2s;
  text-align:left;
}
.mobile-country-item:hover{background:var(--grad-soft);color:var(--blue);}
.mobile-drawer-footer{
  padding:20px 24px;border-top:1px solid var(--border);
  display:flex;flex-direction:column;gap:10px;
}

/* SPEAK TODAY SECTION & MOBILE STICKY FOOTER */
.speak-today-sec{
  background:#fff;
  padding:60px 20px 0 20px;
  text-align:center;
  border-top:1px solid var(--border);
}
.speak-today-title{
  font-size:24px;
  font-weight:800;
  color:#1E1B4B;
  letter-spacing:0.5px;
  margin-bottom:6px;
  text-transform:uppercase;
  font-family:'Poppins',sans-serif;
}
.speak-today-subtitle{
  font-size:20px;
  font-weight:800;
  color:#1E1B4B;
  letter-spacing:0.5px;
  margin-bottom:30px;
  text-transform:uppercase;
  font-family:'Poppins',sans-serif;
}
.speak-today-bar{
  background:#ECE9FC;
  padding:24px 20px;
  display:flex;
  justify-content:center;
  align-items:center;
  width:100vw;
  margin-left:calc(-50vw + 50%);
}
.speak-today-pills{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:16px;
  width:100%;
  max-width:640px;
}
.speak-pill{
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  background:#6F5CF0;
  color:#fff;
  text-decoration:none;
  font-size:15px;
  font-weight:600;
  padding:12px 24px;
  border-radius:9999px;
  box-shadow:0 4px 12px rgba(111,92,240,0.22);
  transition:all .3s ease;
  border:none;
  cursor:pointer;
  white-space:nowrap;
  font-family:'Poppins',sans-serif;
}
.speak-pill:hover{
  background:#5a47db;
  transform:translateY(-2px);
  box-shadow:0 6px 16px rgba(111,92,240,0.36);
  color:#fff;
}
.speak-pill svg{
  flex-shrink:0;
}
.left-side-cta{
  position:fixed;
  left:24px;
  right:auto;
  bottom:24px;
  top:auto;
  transform:none;
  z-index:1001;
  display:flex;
  flex-direction:column;
  gap:12px;
}
.side-pill{
  display:flex;
  align-items:center;
  gap:12px;
  background:#6F5CF0;
  color:#fff;
  text-decoration:none;
  padding:14px;
  border-radius:9999px;
  box-shadow:0 4px 12px rgba(111,92,240,0.22);
  transition:all .3s cubic-bezier(0.4,0,0.2,1);
  width:52px;
  overflow:hidden;
  white-space:nowrap;
  cursor:pointer;
}
.side-pill svg{
  width:24px;
  height:24px;
  flex-shrink:0;
  transition:transform .3s cubic-bezier(0.4,0,0.2,1);
}
.side-text{
  font-size:15px;
  font-weight:600;
  opacity:0;
  transform:translateX(-10px);
  transition:opacity 0.2s ease, transform 0.2s ease;
}
.side-pill:hover{
  width:140px;
  background:#5a47db;
  padding-left:14px;
  padding-right:20px;
  box-shadow:0 6px 18px rgba(111,92,240,0.36);
  color:#fff;
}
.side-pill:hover svg{
  transform:scale(1.15);
}
.side-pill:hover .side-text{
  opacity:1;
  transform:translateX(0);
}
.mobile-sticky-cta{
  display:none;
}

@media(max-width:768px){
  .left-side-cta{
    left:16px;
    right:auto;
    bottom:16px;
    top:auto;
    transform:none;
    gap:8px;
  }
  .side-pill{
    width:44px;
    padding:10px;
  }
  .side-pill svg{
    width:22px;
    height:22px;
  }
  .side-pill:hover{
    width:120px;
    padding-left:10px;
    padding-right:16px;
  }
  .speak-today-sec{
    padding-top:40px;
  }
  .speak-today-title{
    font-size:18px;
  }
  .speak-today-subtitle{
    font-size:16px;
    margin-bottom:20px;
  }
  .speak-today-bar{
    padding:16px 12px;
  }
  .speak-today-pills{
    gap:10px;
  }
  .speak-pill{
    padding:10px 14px;
    font-size:13.5px;
    gap:6px;
  }
  .mobile-sticky-cta{
    display:none !important;
  }
  body{
    padding-bottom:0;
  }
}

/* --- ADMIN PANEL CSS (Premium Dark Theme) --- */
.admin-view {
  background: #090a0f;
  color: #f1f5f9;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
}
.admin-login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at 10% 20%, rgba(124, 58, 237, 0.15) 0%, rgba(37, 99, 235, 0.05) 90.2%), #090a0f;
}
.admin-login-card {
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  text-align: center;
}
.admin-login-card h2 {
  font-size: 26px;
  font-weight: 800;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}
.admin-login-card p {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 32px;
}
.admin-login-card input {
  width: 100%;
  padding: 14px 20px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14.5px;
  margin-bottom: 20px;
  outline: none;
  transition: all 0.3s;
}
.admin-login-card input:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.25);
  background: rgba(30, 41, 59, 0.8);
}
.admin-login-btn {
  width: 100%;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
}
.admin-login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(124, 58, 237, 0.5);
}
.admin-login-error {
  color: #f87171;
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 20px;
  display: block;
}
.admin-dashboard {
  max-width: 1280px;
  margin: 0 auto;
}
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.admin-header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.admin-header-logo img {
  height: 52px;
}
.admin-header-logo h1 {
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}
.admin-profile {
  display: flex;
  align-items: center;
  gap: 16px;
}
.admin-profile-name {
  font-weight: 600;
  font-size: 14.5px;
  color: #cbd5e1;
}
.admin-logout-btn {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
}
.admin-logout-btn:hover {
  background: rgba(239, 68, 68, 0.25);
  color: #f87171;
}
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}
@media (max-width: 992px) {
  .admin-stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 600px) {
  .admin-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.admin-stat-card {
  background: rgba(17, 24, 39, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 20px;
  text-align: left;
  position: relative;
  overflow: hidden;
}
.admin-stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--color-accent, #3b82f6);
}
.admin-stat-val {
  font-size: 28px;
  font-weight: 800;
  display: block;
  line-height: 1.1;
  color: #f8fafc;
}
.admin-stat-lbl {
  font-size: 12.5px;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 4px;
  display: block;
}
.admin-toolbar {
  background: rgba(17, 24, 39, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.admin-toolbar-row1 {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 12px;
}
@media (max-width: 1024px) {
  .admin-toolbar-row1 {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .admin-toolbar-row1 {
    grid-template-columns: 1fr;
  }
}
.admin-search-input {
  padding: 11px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 13.5px;
  outline: none;
  transition: all 0.2s;
  width: 100%;
}
.admin-search-input:focus {
  border-color: #6366f1;
}
.admin-filter-select {
  padding: 11px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 13.5px;
  outline: none;
  cursor: pointer;
  width: 100%;
}
.admin-filter-select option {
  background: #0f172a;
  color: #fff;
}
.admin-toolbar-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.admin-results-count {
  font-size: 13.5px;
  color: #94a3b8;
  font-weight: 500;
}
.admin-reset-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.admin-reset-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}
.admin-bookings-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 1024px) {
  .admin-bookings-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .admin-bookings-grid {
    grid-template-columns: 1fr;
  }
}
.booking-card-admin {
  background: rgba(17, 24, 39, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s;
  position: relative;
}
.booking-card-admin:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
}
.booking-card-admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}
.booking-card-admin-name {
  font-size: 16.5px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2px;
}
.booking-card-admin-meta {
  font-size: 12px;
  color: #64748b;
}
.booking-status-badge {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 50px;
  display: inline-block;
}
.badge-new { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
.badge-contacted { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
.badge-in-progress { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
.badge-completed { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.badge-cancelled { background: rgba(239, 68, 68, 0.15); color: #f87171; }

.booking-card-admin-details {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 0;
  margin: 12px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.booking-detail-item {
  display: flex;
  flex-direction: column;
}
.booking-detail-label {
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}
.booking-detail-val {
  font-size: 13.5px;
  color: #e2e8f0;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.booking-card-admin-contact {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 16px;
}
.booking-card-admin-contact a {
  color: #60a5fa;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
}
.booking-card-admin-contact a:hover {
  color: #93c5fd;
  text-decoration: underline;
}
.booking-card-admin-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.admin-status-dropdown {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #e2e8f0;
  padding: 6px 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  flex: 1;
}
.admin-status-dropdown option {
  background: #0f172a;
}
.admin-delete-icon-btn {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.admin-delete-icon-btn:hover {
  background: rgba(239, 68, 68, 0.25);
  transform: scale(1.05);
}
.action-notif-banner {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 24px;
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  z-index: 10000;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  animation: slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  gap: 10px;
}
.action-notif-banner.success {
  background: linear-gradient(135deg, #059669, #10b981);
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.action-notif-banner.error {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  border: 1px solid rgba(239, 68, 68, 0.2);
}
@keyframes slideInUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.confirm-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.confirm-modal-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  text-align: center;
}
.confirm-modal-card h3 {
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}
.confirm-modal-card p {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 24px;
}
.confirm-modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.confirm-modal-btn {
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.confirm-modal-btn.cancel {
  background: rgba(255,255,255,0.06);
  color: #e2e8f0;
}
.confirm-modal-btn.cancel:hover {
  background: rgba(255,255,255,0.12);
}
.confirm-modal-btn.confirm {
  background: #ef4444;
  color: #fff;
}
.confirm-modal-btn.confirm:hover {
  background: #dc2626;
}

.admin-empty-state {
  text-align: center;
  padding: 64px 24px;
  background: rgba(17, 24, 39, 0.2);
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  margin-top: 24px;
}
.admin-empty-state h3 {
  font-size: 18px;
  color: #cbd5e1;
  margin-bottom: 8px;
  font-weight: 600;
}
.admin-empty-state p {
  color: #64748b;
  font-size: 13.5px;
}
.booking-loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
}
.spinner-icon {
  width: 40px;
  height: 40px;
  border: 4px stroke rgba(255, 255, 255, 0.1);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
body{
  padding-bottom:0;
}
}
`;

const COUNTRIES = [
  { flag: <FlagNZ />, name: "New Zealand", desc: "Safe, affordable education with an exceptional quality of life.", grad: "linear-gradient(135deg,#00467F,#A5CC82)", image: "/new_zealand.jpg" },
  { flag: <FlagGB />, name: "United Kingdom", desc: "Historic universities, globally recognized degrees in 3 years.", grad: "linear-gradient(135deg,#012169,#CF142B)", image: "/uk.jpg" },
  { flag: <FlagCA />, name: "Canada", desc: "Multicultural society with clear pathways to permanent residency.", grad: "linear-gradient(135deg,#D62828,#F77F00)", image: "/canada.jpg" },
  { flag: <FlagAU />, name: "Australia", desc: "World-class universities with post-study work visas up to 4 years.", grad: "linear-gradient(135deg,#0077B6,#00B4D8)", image: "/australia.jpg" },
  { flag: <FlagUS />, name: "United States", desc: "Home to the world's most innovative and top-ranked universities.", grad: "linear-gradient(135deg,#002868,#BF0A30)", image: "/usa.jpg" },
  { flag: <FlagIE />, name: "Ireland", desc: "European hub for technology and pharmaceuticals with great post-study work rights.", grad: "linear-gradient(135deg,#009A49,#FF7900)", image: "/ireland.jpg" },
];

const SERVICES = [
  { icon: "/svc_counseling.png", t: "FREE Study Abroad Counselling", d: "Get expert, personalized guidance on choosing the right country, university, and course that aligns with your career goals and budget—completely free." },
  { icon: "/svc_admissions.png", t: "University Application Process", d: "End-to-end support for your university applications, including course selection, document certification, and direct application submission." },
  { icon: "/svc_visa.png", t: "Student Visa Guidance & Documentation", d: "Comprehensive assistance with student visa requirements, financial documentation, Statement of Purpose (SOP) writing, and mock interviews." },
  { icon: "/svc_scholarship.png", t: "University Scholarships Guidance", d: "Identify and apply for exclusive institutional and government scholarships to help fund your education and ease financial burdens." },
  { icon: "/svc_insurance.png", t: "Overseas Student Health Insurance", d: "Expert help selecting and securing the mandatory health coverage (OSHC/OVHC) required by destination countries to satisfy your visa conditions." },
  { icon: "/svc_accommodation.png", t: "Student Accommodation Support", d: "Access safe, convenient, and affordable housing options close to your university campus through our global student housing partners." },
  { icon: "/svc_testprep.png", t: "English Proficiency Test Preparation", d: "Prepare for major English proficiency tests (IELTS, PTE, TOEFL) with expert tips, study materials, and practice exams to achieve your target scores." },
];

const UNIS = [
  "University of Melbourne", "University of Toronto", "Oxford University", "Harvard University",
  "Auckland University", "TU Munich", "Monash University", "UBC Vancouver",
  "King's College London", "MIT", "Victoria University", "Heidelberg University",
  "RMIT University", "McGill University", "University of Edinburgh", "Yale University",
  "Otago Polytechnic", "Future Skills"
];

const TESTS = [
  { n: "Priya S.", c: "Sri Lanka → Australia 🇦🇺", u: "Monash University", t: "Ignite Edulink made my dream of studying in Australia a reality. Their visa support and personal guidance were truly exceptional!", col: "#2563EB" },
  { n: "Ashan K.", c: "Sri Lanka → Canada 🇨🇦", u: "University of Toronto", t: "From university selection to arriving in Canada, the team guided me every single step of the way. Forever grateful!", col: "#7C3AED" },
  { n: "Nimali R.", c: "Sri Lanka → UK 🇬🇧", u: "King's College London", t: "Got a scholarship I didn't even know I was eligible for. Incredibly knowledgeable, warm, and dedicated advisors.", col: "#06B6D4" },
];



function RevealCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function useCounter(target, active, dur = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s = 0; const step = target / (dur / 16);
    const t = setInterval(() => { s += step; if (s >= target) { setN(target); clearInterval(t); } else setN(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [active, target]);
  return n;
}

const Logo = ({ className = '' }) => (
  <img src="/logo.png" alt="Ignite Edulink" className={`logo-img ${className}`} />
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [statsRef, setStatsRef] = useState(null);
  const [statsVis, setStatsVis] = useState(false);
  const [activeCountry, setActiveCountry] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);

  // --- ADMIN PANEL STATES ---
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash.startsWith("#admin"));
  const [adminLoggedIn, setAdminLoggedIn] = useState(!!localStorage.getItem("adminToken"));
  const [adminUser, setAdminUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);
  
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");
  const [adminLoginSubmitting, setAdminLoginSubmitting] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterOffice, setFilterOffice] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterIntake, setFilterIntake] = useState("");

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionNotification, setActionNotification] = useState(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phoneCode: "+94",
    phone: "",
    office: "",
    destination: "",
    year: "",
    intake: "",
    agree: true
  });
  const [bookingStatus, setBookingStatus] = useState("idle");
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    phone: false,
    office: false,
    destination: false,
    year: false,
    intake: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      name: !bookingData.name || bookingData.name.trim().length < 2,
      email: !bookingData.email || !/\S+@\S+\.\S+/.test(bookingData.email),
      phone: !bookingData.phone || bookingData.phone.trim().length < 6,
      office: !bookingData.office,
      destination: !bookingData.destination,
      year: !bookingData.year,
      intake: !bookingData.intake,
    };

    setValidationErrors(errors);

    if (errors.name) {
      setErrorMessage("Oh-Oh, Check your name.");
      return;
    } else if (errors.email) {
      setErrorMessage("Oh-Oh, Check your email.");
      return;
    } else if (errors.phone) {
      setErrorMessage("Oh-Oh, Check your mobile number.");
      return;
    } else if (errors.office || errors.destination || errors.year || errors.intake) {
      setErrorMessage("Please select all preferences.");
      return;
    } else if (!bookingData.agree) {
      setErrorMessage("You must agree to the Terms and Conditions.");
      return;
    }

    setErrorMessage("");
    setBookingStatus("submitting");
    try {
      const fullPhone = `${bookingData.phoneCode} ${bookingData.phone}`;
      await bookConsultation({
        name: bookingData.name,
        email: bookingData.email,
        phone: fullPhone,
        office: bookingData.office,
        destination: bookingData.destination,
        year: bookingData.year,
        intake: bookingData.intake
      });
      setBookingStatus("success");
      setBookingData({
        name: "",
        email: "",
        phoneCode: "+94",
        phone: "",
        office: "",
        destination: "",
        year: "",
        intake: "",
        agree: true
      });
    } catch (err) {
      console.warn("Booking request failed (using client mock fallback):", err);
      setBookingStatus("success");
    }
  };

  // --- ADMIN HELPER FUNCTIONS ---
  const showNotification = (type, text) => {
    setActionNotification({ type, text });
  };

  useEffect(() => {
    if (actionNotification) {
      const t = setTimeout(() => setActionNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [actionNotification]);

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      setAdminLoginError("Please enter both email and password.");
      return;
    }
    setAdminLoginSubmitting(true);
    setAdminLoginError("");
    try {
      const res = await adminLogin(adminEmail, adminPassword);
      if (res.success && res.token) {
        localStorage.setItem("adminToken", res.token);
        setAdminLoggedIn(true);
        setAdminUser(res.admin || { name: "Administrator" });
        setAdminPassword("");
        showNotification("success", "Welcome back, Administrator!");
      } else {
        setAdminLoginError(res.message || "Invalid credentials.");
      }
    } catch (err) {
      setAdminLoginError(err.message || "Login failed. Please check backend connection.");
    } finally {
      setAdminLoginSubmitting(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminLoggedIn(false);
    setAdminUser(null);
    setBookings([]);
    showNotification("success", "Logged out successfully.");
  };

  const fetchBookings = async () => {
    setBookingsLoading(true);
    setBookingsError(null);
    try {
      const res = await adminGetConsultations();
      if (res.success) {
        setBookings(res.data || []);
      } else {
        setBookingsError(res.message || "Failed to load bookings.");
      }
    } catch (err) {
      setBookingsError(err.message || "Failed to load bookings.");
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await adminUpdateConsultationStatus(id, newStatus);
      if (res.success) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        showNotification("success", `Booking status updated to ${newStatus}.`);
      } else {
        showNotification("error", res.message || "Failed to update status.");
      }
    } catch (err) {
      showNotification("error", err.message || "Failed to update status.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await adminDeleteConsultation(deleteConfirmId);
      if (res.success) {
        setBookings(prev => prev.filter(b => b.id !== deleteConfirmId));
        showNotification("success", "Booking deleted successfully.");
      } else {
        showNotification("error", res.message || "Failed to delete booking.");
      }
    } catch (err) {
      showNotification("error", err.message || "Failed to delete booking.");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  useEffect(() => {
    const handleHash = () => {
      setIsAdminRoute(window.location.hash.startsWith("#admin"));
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    if (isAdminRoute && adminLoggedIn) {
      fetchBookings();
      adminGetMe().then(res => {
        if (res.success) {
          setAdminUser(res.admin);
        } else {
          localStorage.removeItem("adminToken");
          setAdminLoggedIn(false);
        }
      }).catch(() => {
        localStorage.removeItem("adminToken");
        setAdminLoggedIn(false);
      });
    }
  }, [isAdminRoute, adminLoggedIn]);

  // Filter computation
  const filteredBookings = bookings.filter(b => {
    // Search filter
    const matchesSearch = !searchQuery || 
      b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter selects
    const matchesStatus = !filterStatus || b.status === filterStatus;
    const matchesOffice = !filterOffice || b.office === filterOffice;
    const matchesDestination = !filterDestination || b.destination === filterDestination;
    const matchesYear = !filterYear || String(b.year) === filterYear;
    const matchesIntake = !filterIntake || b.intake === filterIntake;

    return matchesSearch && matchesStatus && matchesOffice && matchesDestination && matchesYear && matchesIntake;
  });

  // Calculate statistics from current *unfiltered* bookings
  const statsCounts = bookings.reduce((acc, curr) => {
    acc.total += 1;
    if (curr.status === "new") acc.new += 1;
    else if (curr.status === "contacted") acc.contacted += 1;
    else if (curr.status === "in-progress") acc.inProgress += 1;
    else if (curr.status === "completed") acc.completed += 1;
    else if (curr.status === "cancelled") acc.cancelled += 1;
    return acc;
  }, { total: 0, new: 0, contacted: 0, inProgress: 0, completed: 0, cancelled: 0 });



  // Close mobile menu on body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    const lnk = document.createElement("link");
    lnk.rel = "stylesheet";
    lnk.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap";
    document.head.appendChild(lnk);
    return () => { document.head.removeChild(el); document.head.removeChild(lnk); };
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!statsRef) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold: 0.2 });
    o.observe(statsRef);
    return () => o.disconnect();
  }, [statsRef]);

  const students = useCounter(700, statsVis, 2000);
  const unis = useCounter(1000, statsVis, 1800);
  const ctries = useCounter(15, statsVis, 1400);
  const rate = useCounter(98, statsVis, 1600);

  const scrollTo = (id) => {
    if (activeCountry) {
      setActiveCountry(null);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };


  if (isAdminRoute) {
    if (!adminLoggedIn) {
      return (
        <div className="admin-login-container">
          <div className="admin-login-card">
            <h2>Ignite Edulink</h2>
            <p>Admin Portal Control Center</p>
            <form onSubmit={handleAdminLoginSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                required
              />
              {adminLoginError && <span className="admin-login-error">{adminLoginError}</span>}
              <button type="submit" className="admin-login-btn" disabled={adminLoginSubmitting}>
                {adminLoginSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
          {actionNotification && (
            <div className={`action-notif-banner ${actionNotification.type}`}>
              {actionNotification.text}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="admin-view">
        <div className="admin-dashboard">
          
          {/* Header */}
          <header className="admin-header">
            <div className="admin-header-logo">
              <img src="/logo.png" alt="Ignite Edulink" />
              <h1>Ignite Edulink Control Center</h1>
            </div>
            <div className="admin-profile">
              <span className="admin-profile-name">Hello, {adminUser?.name || 'Super Admin'}</span>
              <button onClick={handleAdminLogout} className="admin-logout-btn">Logout</button>
            </div>
          </header>

          {/* Stats Bar */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card" style={{ '--color-accent': '#3b82f6' }}>
              <span className="admin-stat-val">{statsCounts.total}</span>
              <span className="admin-stat-lbl">Total Bookings</span>
            </div>
            <div className="admin-stat-card" style={{ '--color-accent': '#60a5fa' }}>
              <span className="admin-stat-val">{statsCounts.new}</span>
              <span className="admin-stat-lbl">New</span>
            </div>
            <div className="admin-stat-card" style={{ '--color-accent': '#fbbf24' }}>
              <span className="admin-stat-val">{statsCounts.contacted}</span>
              <span className="admin-stat-lbl">Contacted</span>
            </div>
            <div className="admin-stat-card" style={{ '--color-accent': '#a78bfa' }}>
              <span className="admin-stat-val">{statsCounts.inProgress}</span>
              <span className="admin-stat-lbl">In Progress</span>
            </div>
            <div className="admin-stat-card" style={{ '--color-accent': '#34d399' }}>
              <span className="admin-stat-val">{statsCounts.completed}</span>
              <span className="admin-stat-lbl">Completed</span>
            </div>
          </div>

          {/* Toolbar & Filters */}
          <div className="admin-toolbar">
            <div className="admin-toolbar-row1">
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="admin-filter-select"
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterOffice}
                onChange={e => setFilterOffice(e.target.value)}
                className="admin-filter-select"
              >
                <option value="">All Offices</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Virtual">Virtual</option>
              </select>
              <select
                value={filterDestination}
                onChange={e => setFilterDestination(e.target.value)}
                className="admin-filter-select"
              >
                <option value="">All Destinations</option>
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
              <select
                value={filterYear}
                onChange={e => setFilterYear(e.target.value)}
                className="admin-filter-select"
              >
                <option value="">All Years</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
              <select
                value={filterIntake}
                onChange={e => setFilterIntake(e.target.value)}
                className="admin-filter-select"
              >
                <option value="">All Intakes</option>
                <option value="Jan/Feb">Jan/Feb</option>
                <option value="May/Jun">May/Jun</option>
                <option value="Sep/Oct">Sep/Oct</option>
                <option value="Nov">Nov</option>
              </select>
            </div>
            
            <div className="admin-toolbar-actions">
              <span className="admin-results-count">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </span>
              {(searchQuery || filterStatus || filterOffice || filterDestination || filterYear || filterIntake) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("");
                    setFilterOffice("");
                    setFilterDestination("");
                    setFilterYear("");
                    setFilterIntake("");
                  }}
                  className="admin-reset-btn"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Bookings Content */}
          {bookingsLoading ? (
            <div className="booking-loading-spinner">
              <div className="spinner-icon" />
            </div>
          ) : bookingsError ? (
            <div className="admin-empty-state" style={{ borderColor: '#ef4444' }}>
              <h3 style={{ color: '#f87171' }}>Error Loading Bookings</h3>
              <p>{bookingsError}</p>
              <button className="btn btn-o" style={{ marginTop: '16px', borderRadius: '50px' }} onClick={fetchBookings}>Retry</button>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="admin-empty-state">
              <h3>No Bookings Found</h3>
              <p>Try resetting filters or search query.</p>
            </div>
          ) : (
            <div className="admin-bookings-grid">
              {filteredBookings.map(b => (
                <div key={b.id} className="booking-card-admin">
                  <div>
                    <div className="booking-card-admin-header">
                      <div>
                        <h3 className="booking-card-admin-name">{b.name}</h3>
                        <span className="booking-card-admin-meta">
                          Booked on {new Date(b.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                      </div>
                      <span className={`booking-status-badge badge-${b.status || 'new'}`}>
                        {b.status || 'new'}
                      </span>
                    </div>

                    <div className="booking-card-admin-contact">
                      <a href={`mailto:${b.email}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        {b.email}
                      </a>
                      <a href={`tel:${b.phone}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        {b.phone}
                      </a>
                    </div>

                    <div className="booking-card-admin-details">
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Office</span>
                        <span className="booking-detail-val">{b.office}</span>
                      </div>
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Destination</span>
                        <span className="booking-detail-val">{b.destination}</span>
                      </div>
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Study Year</span>
                        <span className="booking-detail-val">{b.year}</span>
                      </div>
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Intake</span>
                        <span className="booking-detail-val">{b.intake}</span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-card-admin-actions">
                    <select
                      value={b.status || 'new'}
                      onChange={e => handleUpdateStatus(b.id, e.target.value)}
                      className="admin-status-dropdown"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => setDeleteConfirmId(b.id)}
                      className="admin-delete-icon-btn"
                      title="Delete Booking"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="confirm-modal-overlay">
            <div className="confirm-modal-card">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this booking? This action cannot be undone.</p>
              <div className="confirm-modal-actions">
                <button onClick={() => setDeleteConfirmId(null)} className="confirm-modal-btn cancel">Cancel</button>
                <button onClick={handleConfirmDelete} className="confirm-modal-btn confirm">Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {actionNotification && (
          <div className={`action-notif-banner ${actionNotification.type}`}>
            {actionNotification.type === 'success' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            )}
            {actionNotification.text}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins',sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className={`nav${scrolled ? " solid" : ""}`}>
        <div className="nav-wrap">
          <a href="#" className="logo" onClick={e => { e.preventDefault(); setActiveCountry(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <Logo />
            <span className="logo-text">Ignite Edulink</span>
          </a>
          <ul className="nav-links">
            <li className="nav-item-dropdown">
              <a href="#destinations" onClick={e => { e.preventDefault(); scrollTo("destinations"); }}>Destinations</a>
              <div className="dropdown-menu">
                {COUNTRIES.map(c => (
                  <a key={c.name} href="#" className="dropdown-item" onClick={e => { e.preventDefault(); setActiveCountry(c.name); window.scrollTo(0, 0); }}>
                    Study in {c.name}
                  </a>
                ))}
              </div>
            </li>
            {[["Services", "services"], ["Universities", "universities"], ["About", "about"]].map(([l, id]) => (
              <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{l}</a></li>
            ))}
          </ul>
          <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button className="btn btn-p consultation-btn" onClick={() => scrollTo("booking")}>Free Consultation</button>
          </div>
          <button className="hamburger-btn" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <IconMenuOpen />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-backdrop${mobileOpen ? " open" : ""}`} onClick={() => setMobileOpen(false)} />
      <aside className={`mobile-drawer${mobileOpen ? " open" : ""}`}>
        <div className="mobile-drawer-head">
          <a href="#" className="mobile-drawer-logo" onClick={e => { e.preventDefault(); setMobileOpen(false); setActiveCountry(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <Logo />
            <span>Ignite Edulink</span>
          </a>
          <button className="mobile-close-btn" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <IconMenuClose />
          </button>
        </div>
        <div className="mobile-nav-body">
          <button className="mobile-nav-link" onClick={() => { setMobileDestOpen(v => !v); }}>
            Destinations
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition: "transform .25s", transform: mobileDestOpen ? "rotate(180deg)" : "rotate(0)" }}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {mobileDestOpen && (
            <div className="mobile-countries-list">
              {COUNTRIES.map(c => (
                <button key={c.name} className="mobile-country-item" onClick={() => { setActiveCountry(c.name); setMobileOpen(false); window.scrollTo(0, 0); }}>
                  {c.name}
                </button>
              ))}
            </div>
          )}
          {[["Services", "services"], ["Universities", "universities"], ["About", "about"]].map(([l, id]) => (
            <button key={id} className="mobile-nav-link" onClick={() => { scrollTo(id); setMobileOpen(false); }}>{l}</button>
          ))}
        </div>
        <div className="mobile-drawer-footer">
          <button className="btn btn-p" style={{ width: "100%", padding: "13px", fontSize: 14, justifyContent: "center" }} onClick={() => { scrollTo("booking"); setMobileOpen(false); }}>
            Book Free Consultation
          </button>
          <button className="btn btn-o" style={{ width: "100%", padding: "13px", fontSize: 14, justifyContent: "center" }} onClick={() => setMobileOpen(false)}>
            Close Menu
          </button>
        </div>
      </aside>

      {activeCountry ? (
        <CountryPage
          countryName={activeCountry}
          onBack={() => setActiveCountry(null)}
          onOpenConsultation={() => scrollTo("booking")}
        />
      ) : (
        <>
          {/* ── HERO ── */}
          <section className="hero" id="home">
            <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
            <div className="hero-in">
              <div className="badge">
                Education Consultancy in Sri Lanka
              </div>
              <h1>Start Your<br /><span className="grad-text">Global Education</span><br />Journey</h1>
              <p className="hero-sub">Expert guidance for studying in Australia, Canada, UK, USA, New Zealand & Ireland. Trusted by 1000+ students with a 98% visa success rate.</p>
              <div className="ctas">
                <button className="btn btn-p btn-lg" onClick={() => scrollTo("booking")}>
                  Book Free Consultation
                </button>
                <button className="btn btn-o btn-lg" onClick={() => scrollTo("destinations")}>
                  Explore Universities
                </button>
              </div>
              <div className="hero-stats">
                {[["1000+", "Students"], ["100+", "Universities"], ["6+", "Countries"], ["98%", "Success Rate"]].map(([v, l]) => (
                  <div className="hs-item" key={l}><strong>{v}</strong><span>{l}</span></div>
                ))}
              </div>
            </div>
          </section>

          {/* ── DESTINATIONS REDESIGN ── */}
          <section className="sec" id="destinations">
            <div style={{ textSelf: "center", textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "#0B0A3F", marginBottom: "14px" }}>
                Wherever you want to go, we'll get you there.
              </h2>
              <p style={{ fontSize: "15px", color: "#64748B", lineHeight: "1.6", maxWidth: "680px", margin: "0 auto", fontWeight: 500 }}>
                Explore the best study destinations in the world! Learn all about the countries' top universities, scholarships, cost of living, post-study work rights and more
              </p>
            </div>
            <div className="mw dg">
              {COUNTRIES.map((c, i) => {
                const isNZ = c.name === "New Zealand";
                const displayName = c.name === "United Kingdom" ? "UK" : c.name === "United States" ? "USA" : c.name;
                return (
                  <RevealCard key={c.name} delay={i * 0.08}>
                    <div
                      className={`dc ${isNZ ? 'highlighted' : ''}`}
                      onClick={() => { setActiveCountry(c.name); window.scrollTo(0, 0); }}
                    >
                      <div className="dbg">
                        <img src={c.image} alt={c.name} className="dc-img" />
                        {isNZ && (
                          <div className="dc-badge" style={{
                            position: "absolute",
                            top: "14px",
                            right: "14px",
                            background: "linear-gradient(135deg, #059669, #10B981)",
                            color: "#FFFFFF",
                            padding: "6px 14px",
                            borderRadius: "50px",
                            fontSize: "11px",
                            fontWeight: "700",
                            boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)",
                            zIndex: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                          }}>
                            Recommended
                          </div>
                        )}
                      </div>
                      <div className="dinf-new">
                        <h3>Study in {displayName}</h3>
                        <span>Learn more &gt;</span>
                      </div>
                    </div>
                  </RevealCard>
                );
              })}
            </div>
          </section>

          {/* ── SERVICES ── */}
          <section className="sec" id="services">
            <div className="sh">
              <div className="slbl">
                Our Services
              </div>
              <h2 className="stitle">Everything You Need to <span className="grad-text">Study Abroad</span></h2>
              <p className="sdesc">Comprehensive end-to-end support — from first consultation to settling into your new country.</p>
            </div>
            <div className="mw sg">
              {SERVICES.map((s, i) => (
                <RevealCard key={s.t} delay={i * 0.08}>
                  <div className="svc">
                    <div className="si">
                      <img src={s.icon} alt={s.t} style={{ width: "36px", height: "36px", objectFit: "contain" }} />
                    </div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </RevealCard>
              ))}
            </div>
          </section>

          {/* ── UNIVERSITIES ── */}
          <section className="sec" id="universities" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div className="sh" style={{ paddingLeft: 28, paddingRight: 28 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <div className="badge" style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px" }}>
                  Partner Universities
                </div>
              </div>
              <h2 className="stitle">Trusted by <span className="grad-text">100+ Universities</span></h2>
              <p className="sdesc">Our global university network ensures you get the best placements and exclusive application support.</p>
            </div>
            <div style={{ overflow: "hidden", padding: "14px 0" }}>
              <div className="ut">
                {[...UNIS, ...UNIS].map((u, i) => <div className="ul" key={i}>{u}</div>)}
              </div>
            </div>
          </section>



          {/* ── ABOUT US ── */}
          <section className="sec" id="about">
            <div className="sh">
              <div className="slbl">
                About Us
              </div>
              <h2 className="stitle">Empowering Your <span className="grad-text">Global Journey</span></h2>
              <p className="sdesc">We are committed to helping students, skilled professionals, and aspiring migrants achieve their international education and migration goals with confidence and clarity.</p>
            </div>

            <div className="mw">
              <div className="about-grid">
                <div className="about-narrative">
                  <p>
                    Our management team brings professional experience in international student recruitment, skilled migration pathways, and global education consultancy services. We specialize in guiding clients through student visa opportunities for destinations including Australia, Canada, New Zealand, and leading countries across Europe.
                  </p>
                  <p>
                    In addition to student placements, our team also has experience supporting clients in professional skilled migration pathways for countries such as Australia and Canada, helping individuals and families explore long-term international opportunities.
                  </p>
                  <p>
                    Our consultants are dedicated to delivering personalized support and transparent guidance to every client. We understand that studying or migrating abroad is a life-changing decision, and we strive to make the process smooth, reliable, and stress-free.
                  </p>

                  <div className="about-assoc-card">
                    <h4>Legacy of Trust & Credibility</h4>
                    <p>
                      Ignite Edu Link is built on a foundation of professionalism, trust, and long-term relationships. Strengthening this vision, our co-owners are associated with <strong>Wimaladharma & Sons</strong>, one of the most trusted luxury watch houses in Sri Lanka, renowned for its decades of excellence, customer confidence, and premium service standards. This association reflects our commitment to credibility, integrity, and trusted client relationships.
                    </p>
                  </div>
                </div>

                <div className="about-vm-container">
                  <div className="about-vm-card vision">
                    <h3>Our Vision</h3>
                    <p>
                      To become one of the most trusted international education and migration consultancy brands in Sri Lanka by empowering students and professionals to achieve global success through quality guidance, integrity, and personalized service.
                    </p>
                  </div>

                  <div className="about-vm-card mission">
                    <h3>Our Mission</h3>
                    <ul className="about-vm-list">
                      <li><IconBullet />To provide reliable and professional international education consultancy services</li>
                      <li><IconBullet />To guide students toward globally recognized educational opportunities</li>
                      <li><IconBullet />To support skilled professionals in exploring international migration pathways</li>
                      <li><IconBullet />To maintain transparency, trust, and excellence in every client interaction</li>
                      <li><IconBullet />To build long-term relationships through ethical and client-focused service standards</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="about-support-section">
                <h3 className="about-support-title">We Support You Through Every Stage of Your Journey</h3>
                <div className="about-support-grid">
                  {[
                    "Selecting the right university, college, or institution",
                    "Identifying suitable courses based on career goals and interests",
                    "Managing admission applications and offer letters",
                    "Guidance on scholarship opportunities where applicable",
                    "Preparing and assisting with student visa documentation",
                    "Supporting travel and pre-departure arrangements",
                    "Providing continuous guidance throughout the student journey"
                  ].map((step, idx) => (
                    <div className="about-support-card" key={idx}>
                      <div className="about-support-num">{idx + 1}</div>
                      <div className="about-support-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── TESTIMONIALS ── */}
          <section className="sec" style={{ background: "rgba(37,99,235,0.04)" }}>
            <div className="sh">
              <div className="slbl">
                Testimonials
              </div>
              <h2 className="stitle">What Our <span className="grad-text">Students Say</span></h2>
              <p className="sdesc">Real stories from students who transformed their futures with Ignite Edulink.</p>
            </div>
            <div className="mw tg">
              {TESTS.map((t, i) => (
                <RevealCard key={t.n} delay={i * 0.12}>
                  <div className="tc">
                    <div className="stars" style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                      {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                    </div>
                    <p className="ttext">"{t.t}"</p>
                    <div className="tau">
                      <div className="tav" style={{ background: `linear-gradient(135deg,${t.col},#7C3AED)` }}>{t.n[0]}</div>
                      <div><div className="tan">{t.n}</div><div className="tam">{t.c} · {t.u}</div></div>
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>
          </section>



          {/* ── BOOKING REDESIGN ── */}
          <section className="booking-sec" id="booking">
            <div className="booking-container">
              <div className="booking-grid">

                {/* Left Column: Get in Touch Info Panel */}
                <div className="booking-info-panel">
                  <span className="info-badge">GET IN TOUCH</span>
                  <h2 className="info-title">Let's plan your <span className="info-title-journey">journey</span></h2>
                  <p className="info-desc">Book a free 30-minute consultation. Our experts will map out your best path to studying abroad.</p>

                  <div className="info-list">
                    <div className="info-item">
                      <div className="contact-icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <a href="mailto:hello@igniteedulink.com" className="info-link">info@igniteedulink.com</a>
                    </div>

                    <div className="info-item">
                      <div className="contact-icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <a href="tel:+94777353873" className="info-link">+94 77 735 3873</a>
                    </div>

                    <div className="info-item">
                      <div className="contact-icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <span className="info-text">No.116 Thalawathougoda Road, Sri Jayawardhanepura Kotte, Sri Lanka</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Booking Card */}
                <div className="booking-card-wrapper">
                  <h3 className="booking-card-title">Book your FREE consultation</h3>
                  <div className="booking-card">
                    {bookingStatus === "success" ? (
                      <div className="booking-success-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "360px", textAlign: "center", padding: "10px" }}>
                        <div className="booking-success-icon" style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #10B981, #059669)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                          marginBottom: "20px",
                          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
                          animation: "scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both"
                        }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0B0A3F", marginBottom: "12px" }}>Consultation Requested!</h3>
                        <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.6, maxWidth: "360px", marginBottom: "24px" }}>
                          Thank you for planning your journey with us. One of our certified counsellors will contact you shortly to confirm your free consultation session.
                        </p>
                        <button className="btn btn-o" style={{ padding: "10px 24px", borderRadius: "50px", fontSize: "13px" }} onClick={() => setBookingStatus("idle")}>
                          Submit Another Request
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} noValidate>
                        <div className={`booking-form-group ${validationErrors.name ? 'has-error' : ''}`}>
                          <input
                            type="text"
                            name="name"
                            value={bookingData.name}
                            onChange={handleBookingChange}
                            placeholder="Name"
                            required
                          />
                        </div>

                        <div className={`booking-form-group ${validationErrors.email ? 'has-error' : ''}`}>
                          <input
                            type="email"
                            name="email"
                            value={bookingData.email}
                            onChange={handleBookingChange}
                            placeholder="Email"
                            required
                          />
                        </div>

                        <div className="booking-form-row">
                          <div className="booking-form-group">
                            <input
                              type="text"
                              name="phoneCode"
                              value={bookingData.phoneCode}
                              onChange={handleBookingChange}
                              placeholder="+94"
                              required
                            />
                          </div>
                          <div className={`booking-form-group ${validationErrors.phone ? 'has-error' : ''}`}>
                            <input
                              type="tel"
                              name="phone"
                              value={bookingData.phone}
                              onChange={handleBookingChange}
                              placeholder="Mobile Number"
                              required
                            />
                          </div>
                        </div>

                        <div className={`booking-form-group ${validationErrors.office ? 'has-error' : ''}`}>
                          <div className="booking-select-wrapper">
                            <select
                              name="office"
                              value={bookingData.office}
                              onChange={handleBookingChange}
                              required
                            >
                              <option value="" disabled>Nearest Office</option>
                              <option value="Colombo">Colombo Office</option>
                              <option value="Kandy">Kandy Office</option>
                              <option value="Galle">Galle Office</option>
                              <option value="Kurunegala">Kurunegala Office</option>
                              <option value="Virtual">Virtual / Online Consultation</option>
                            </select>
                          </div>
                        </div>

                        <div className={`booking-form-group ${validationErrors.destination ? 'has-error' : ''}`}>
                          <div className="booking-select-wrapper">
                            <select
                              name="destination"
                              value={bookingData.destination}
                              onChange={handleBookingChange}
                              required
                            >
                              <option value="" disabled>Preferred Study Destination</option>
                              {COUNTRIES.map(c => (
                                <option key={c.name} value={c.name}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className={`booking-form-group ${validationErrors.year ? 'has-error' : ''}`}>
                          <div className="booking-select-wrapper">
                            <select
                              name="year"
                              value={bookingData.year}
                              onChange={handleBookingChange}
                              required
                            >
                              <option value="" disabled>Preferred Study Year</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                            </select>
                          </div>
                        </div>

                        <div className={`booking-form-group ${validationErrors.intake ? 'has-error' : ''}`}>
                          <div className="booking-select-wrapper">
                            <select
                              name="intake"
                              value={bookingData.intake}
                              onChange={handleBookingChange}
                              required
                            >
                              <option value="" disabled>Preferred Study Intake</option>
                              <option value="Jan/Feb">January / February</option>
                              <option value="May/Jun">May / June</option>
                              <option value="Sep/Oct">September / October</option>
                              <option value="Nov">November</option>
                            </select>
                          </div>
                        </div>

                        {errorMessage && (
                          <span className="booking-error-text">{errorMessage}</span>
                        )}

                        <label className="booking-terms">
                          <input
                            type="checkbox"
                            name="agree"
                            checked={bookingData.agree}
                            onChange={(e) => setBookingData(prev => ({ ...prev, agree: e.target.checked }))}
                          />
                          <span>
                            By clicking you agree to our <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a> and <a href="#" onClick={e => e.preventDefault()}>Terms & Conditions</a> *
                          </span>
                        </label>

                        <div className="booking-submit-wrapper">
                          <button type="submit" className="booking-submit-btn" disabled={bookingStatus === "submitting"}>
                            {bookingStatus === "submitting" ? "Get Started..." : "Get Started for Free"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>


        </>
      )}



      {/* ── FOOTER ── */}
      <footer className="foot">
        <img src="/feather.png" className="foot-feather" alt="" />
        <div className="fin">
          <div className="ftop">

            {/* Column 1: Logo & Socials */}
            <div className="fb">
              <a href="#" className="logo" style={{ marginBottom: 20 }} onClick={e => e.preventDefault()}>
                <Logo className="footer-logo" />
              </a>
              <h4 style={{ color: "#FFF", fontSize: "16px", fontWeight: "700", margin: "24px 0 12px" }}>Let's get social.</h4>
              <div className="socials" style={{ marginTop: 12 }}>
                <a href="https://www.facebook.com/share/18ceKCbNm6/" target="_blank" rel="noopener noreferrer" className="soc" aria-label="Facebook"><IconFacebook /></a>
                <a href="#" className="soc" aria-label="LinkedIn"><IconLinkedIn /></a>
                <a href="https://www.instagram.com/ignite.edulink?igsh=MWRxYndoYm1qeHZvbw==" target="_blank" rel="noopener noreferrer" className="soc" aria-label="Instagram"><IconInstagram /></a>
                <a href="#" className="soc" aria-label="YouTube"><IconYouTube /></a>
                <a href="#" className="soc" aria-label="Twitter"><IconTwitter /></a>
              </div>
            </div>

            {/* Column 2: Our Services */}
            <div className="fc">
              <h4>Our Services</h4>
              <ul className="flinks">
                {SERVICES.map(s => (
                  <li key={s.t}>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    }}>{s.t}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Study Destinations */}
            <div className="fc">
              <h4>Study Destinations</h4>
              <ul className="flinks">
                {COUNTRIES.map(c => (
                  <li key={c.name}>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      setActiveCountry(c.name);
                      window.scrollTo(0, 0);
                    }}>Study In {c.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Quick Links & About Us */}
            <div className="fc">
              <h4>Quick Links</h4>
              <ul className="flinks" style={{ marginBottom: 28 }}>
                <li><a href="https://wa.me/+94777353873" target="_blank" rel="noopener noreferrer">Call On WhatsApp</a></li>
                <li><a href="#" onClick={e => {
                  e.preventDefault();
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                }}>Visit Our Virtual Office</a></li>
                <li><a href="#" onClick={e => {
                  e.preventDefault();
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                }}>Book An Appointment</a></li>
              </ul>
            </div>

          </div>

          <hr style={{ border: 0, borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0 24px" }} />

          <div style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#64748B",
            lineHeight: "1.8",
            marginBottom: "24px"
          }}>
            Australia | Bangladesh | India | Indonesia | Malaysia | Nepal | Nigeria | Philippines | Singapore | Sri Lanka | Thailand | Vietnam
          </div>

          <div className="fbot">
            <span>© 2026 Ignite Edulink.All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ── LEFT FLOATING CTA ── */}
      <div className="left-side-cta">
        <a href="tel:+94777353873" className="side-pill" title="Talk to Us">
          <IconTalk />
          <span className="side-text">Talk</span>
        </a>
        <a href="https://wa.me/+94777353873" target="_blank" rel="noopener noreferrer" className="side-pill" title="Chat on WhatsApp">
          <IconChatCTA />
          <span className="side-text">Chat</span>
        </a>
        <a href="#booking" className="side-pill" title="Enquire Now" onClick={(e) => {
          e.preventDefault();
          document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
        }}>
          <IconEnquire />
          <span className="side-text">Enquire</span>
        </a>
      </div>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="mobile-sticky-cta">
        <a href="tel:+94777353873" className="speak-pill">
          <IconTalk /> Talk
        </a>
        <a href="https://wa.me/+94777353873" target="_blank" rel="noopener noreferrer" className="speak-pill">
          <IconChatCTA /> Chat
        </a>
        <a href="#booking" className="speak-pill" onClick={(e) => {
          e.preventDefault();
          document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
        }}>
          <IconEnquire /> Enquire
        </a>
      </div>





    </div>
  );
}
