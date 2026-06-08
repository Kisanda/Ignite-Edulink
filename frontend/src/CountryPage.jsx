import { useState, useEffect } from "react";

// Checkmark Icon
const RedCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: "3px", overflow: "visible" }}>
    <defs>
      <linearGradient id="check-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    <polyline points="20 6.8 9 17.8 4 12.8" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="20 6 9 17 4 12" stroke="url(#check-red-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// High-Fidelity Data for All Countries
const COUNTRY_DATA = {
  Australia: {
    badge: "🇦🇺 PR Pathway Choice",
    badgeBg: "#E0F2FE",
    badgeBorder: "#BAE6FD",
    badgeColor: "#0284C7",
    heroImage: "/australia.jpg",
    heroGrad: "linear-gradient(to bottom, #EBF8FF 0%, #F0F9FF 55%, #F0F4FC 100%)",
    gradient: "linear-gradient(135deg, #005F8E 0%, #00A6E0 100%)",
    whyChooseTitle: "Why Choose Australian Institutions?",
    whyChooseDesc: "Australia boasts world-renowned academic quality, vibrant student-friendly cities, and long-term career growth options.",
    bullets: [
      "Post-Study Work Visas (subclass 485) allowing up to 4+ years of work.",
      "High standard of living in globally top-ranked student cities like Melbourne & Sydney.",
      "Highly practical learning structures with deep ties to modern global industries."
    ],
    applyTitle: "Apply to Australia",
    applyDesc: "Connect directly with experienced counselors to streamline application files.",
    timelineTitle: "From Student Visa to Australian PR",
    timeline: [
      { step: "1", title: "Student Visa", desc: "Enroll in a registered CRICOS course and secure your Subclass 500 visa." },
      { step: "2", title: "Study & Work", desc: "Gain quality education and build professional connections via part-time work." },
      { step: "3", title: "Graduate Visa", desc: "Apply for a Subclass 485 Post-Study Work Visa (valid for up to 4 years)." },
      { step: "4", title: "Skills Assessment", desc: "Pass skills assessment in a high-demand medium/long-term occupation (MLTSSL)." },
      { step: "5", title: "EOI & Invite", desc: "Submit EOI under subclass 189/190/491 and receive a PR invitation." },
      { step: "6", title: "Australian PR", desc: "Become a permanent resident of Australia!" }
    ],
    unis: [
      { name: "University of Melbourne", rank: "QS Rank: #13", location: "Melbourne, Victoria", intakes: "February, July", courses: "Engineering, IT, Business, Biomedical Sciences", badge: "Group of Eight", bg: "rgba(2, 132, 199, 0.04)" },
      { name: "Monash University", rank: "QS Rank: #37", location: "Clayton, Victoria", intakes: "February, July", courses: "Pharmacy, Chemical Engineering, MBA, Arts", badge: "Global Network", bg: "rgba(2, 132, 199, 0.04)" },
      { name: "RMIT University", rank: "QS Rank: #123", location: "Melbourne, Victoria", intakes: "February, July", courses: "Art & Design, Software Engineering, Architecture", badge: "Industry Heavy", bg: "rgba(2, 132, 199, 0.04)" },
      { name: "Australian National University", rank: "QS Rank: #30", location: "Canberra, ACT", intakes: "February, July", courses: "Law, Political Science, Advanced Computing", badge: "Research Leader", bg: "rgba(2, 132, 199, 0.04)" }
    ],
    currency: "AUD",
    calculator: {
      undergrad: 36000,
      postgrad: 41000,
      diploma: 22000,
      provLabel: "Destination State",
      provNames: { on: "Victoria", bc: "New South Wales", qc: "Queensland", ab: "Western Australia" },
      provMultiplier: { on: 1.0, bc: 1.06, qc: 0.92, ab: 0.95 },
      immigrationReq: 29710
    },
    intakes: {
      fall: { name: "Semester 1", month: "Feb / Mar", desc: "The primary academic intake. All programs are open, maximum scholarship opportunities, and vibrant campus orientations.", deadline: "Apply by: Oct - Nov" },
      winter: { name: "Semester 2", month: "July / Aug", desc: "The mid-year intake. Very popular, good course selections, though some highly specialized programs may not be offered.", deadline: "Apply by: Mar - Apr" },
      spring: { name: "Trimester 3", month: "Nov / Dec", desc: "Offered by universities on trimester systems. Fastest pathway to complete your studies quickly.", deadline: "Apply by: Jul - Aug" }
    }
  },
  Canada: {
    badge: "🇨🇦 PR Pathway Choice",
    badgeBg: "#FFE4E6",
    badgeBorder: "#FDA4AF",
    badgeColor: "#E11D48",
    heroImage: "/canada.jpg",
    heroGrad: "linear-gradient(to bottom, #FFEAE9 0%, #FFF5F5 55%, #F0F4FC 100%)",
    gradient: "linear-gradient(135deg, #D62828 0%, #F77F00 100%)",
    whyChooseTitle: "Why Choose Canadian Institutions?",
    whyChooseDesc: "Canada offers affordable premium educational infrastructure, safe learning spaces, and high pathways toward long-term permanent structural residency.",
    bullets: [
      "Post-Graduation Work Permit (PGWP) eligibility configurations.",
      "Highly straightforward, structured economic pathways to Permanent Residency (PR).",
      "Lower domestic fee structures relative to other global options."
    ],
    applyTitle: "Apply to Canada",
    applyDesc: "Connect directly with experienced counselors to streamline application files.",
    timelineTitle: "From Student Visa to Canadian PR",
    timeline: [
      { step: "1", title: "Study Permit", desc: "Get admitted to a Designated Learning Institution and obtain your student visa." },
      { step: "2", title: "Study Period", desc: "Study full-time and work part-time (up to 20h/week) to build dynamic networks." },
      { step: "3", title: "Get PGWP", desc: "Apply for a Post-Graduation Work Permit (valid for up to 3 years)." },
      { step: "4", title: "Work Experience", desc: "Accumulate 1 year of skilled work experience in Canada." },
      { step: "5", title: "Express Entry", desc: "Enter Express Entry (CEC) or PNP draw and receive your PR invitation." },
      { step: "6", title: "Canadian PR", desc: "Become a permanent resident of Canada!" }
    ],
    unis: [
      { name: "University of Toronto", rank: "QS Rank: #21", location: "Toronto, Ontario", intakes: "September (Fall)", courses: "Computer Science, Engineering, MBA, Medicine", badge: "Top Ranked", bg: "rgba(220, 38, 38, 0.04)" },
      { name: "University of British Columbia", rank: "QS Rank: #34", location: "Vancouver, British Columbia", intakes: "September, January", courses: "Business Administration, Forestry, Biotechnology", badge: "Scenic Campus", bg: "rgba(220, 38, 38, 0.04)" },
      { name: "McGill University", rank: "QS Rank: #30", location: "Montreal, Quebec", intakes: "September (Fall)", courses: "Law, Biomedical Engineering, Finance, Economics", badge: "Ivy Equivalent", bg: "rgba(220, 38, 38, 0.04)" },
      { name: "University of Waterloo", rank: "QS Rank: #112", location: "Waterloo, Ontario", intakes: "September, January, May", courses: "Software Engineering, Math, Actuarial Science", badge: "Co-op Leader", bg: "rgba(220, 38, 38, 0.04)" }
    ],
    currency: "CAD",
    calculator: {
      undergrad: 32000,
      postgrad: 26000,
      diploma: 18000,
      provLabel: "Destination Province",
      provNames: { on: "Ontario", bc: "British Columbia", qc: "Quebec", ab: "Alberta" },
      provMultiplier: { on: 1.0, bc: 1.1, qc: 0.9, ab: 0.95 },
      immigrationReq: 20635
    },
    intakes: {
      fall: { name: "Fall Intake", month: "Sept / Oct", desc: "The primary and largest intake in Canada. Almost all courses and universities are open, and scholarship opportunities are max.", deadline: "Apply by: Jan - Mar" },
      winter: { name: "Winter Intake", month: "Jan / Feb", desc: "Second major intake. Good option for students who missed Fall. Limited scholarship availability, but good course selections.", deadline: "Apply by: Jun - Aug" },
      spring: { name: "Spring Intake", month: "May / June", desc: "Mainly for specialized college diplomas, short courses, and foundation programs. Highly limited program availability.", deadline: "Apply by: Oct - Dec" }
    }
  },
  "United Kingdom": {
    badge: "🇬🇧 Graduate Visa Choice",
    badgeBg: "#EEF2F6",
    badgeBorder: "#CBD5E1",
    badgeColor: "#1E293B",
    heroImage: "/uk.jpg",
    heroGrad: "linear-gradient(to bottom, #F1F5F9 0%, #F8FAFC 55%, #F0F4FC 100%)",
    gradient: "linear-gradient(135deg, #0B2265 0%, #CF142B 100%)",
    whyChooseTitle: "Why Choose UK Institutions?",
    whyChooseDesc: "The UK is the global home of academic legacy, offering accelerated degrees and strong pathways into international finance, tech, and research.",
    bullets: [
      "2-Year Graduate Route (Post-Study Work Visa) for all bachelor's and master's graduates.",
      "Accelerated Bachelor's (3 years) and Master's (1 year) saving significant cost and time.",
      "Globally renowned research credentials and legacy of excellence."
    ],
    applyTitle: "Apply to United Kingdom",
    applyDesc: "Connect directly with experienced counselors to streamline application files.",
    timelineTitle: "From Student Visa to UK Residency",
    timeline: [
      { step: "1", title: "CAS Letter", desc: "Secure an offer and Confirmation of Acceptance for Studies (CAS) from a licensed sponsor." },
      { step: "2", title: "Accelerated Study", desc: "Complete a highly intensive, fast-tracked undergraduate or master's program." },
      { step: "3", title: "Graduate Visa", desc: "Transition to a 2-year unsponsored Graduate Route visa to work freely." },
      { step: "4", title: "Skilled Work", desc: "Secure a professional role sponsored under the Skilled Worker Visa program." },
      { step: "5", title: "ILR Route", desc: "Build residency credits towards Indefinite Leave to Remain (ILR)." },
      { step: "6", title: "UK Citizenship", desc: "Achieve permanent settlement and passport eligibility!" }
    ],
    unis: [
      { name: "Oxford University", rank: "QS Rank: #3", location: "Oxford, Oxfordshire", intakes: "September (Fall)", courses: "Philosophy, Mathematics, PPE, MBA, Law", badge: "Legacy of 900 Yrs", bg: "rgba(11, 34, 101, 0.04)" },
      { name: "King's College London", rank: "QS Rank: #40", location: "London, England", intakes: "September, January", courses: "Medicine, Nursing, War Studies, Management", badge: "London Center", bg: "rgba(11, 34, 101, 0.04)" },
      { name: "University of Edinburgh", rank: "QS Rank: #27", location: "Edinburgh, Scotland", intakes: "September (Fall)", courses: "Informatics, Linguistics, Veterinary Medicine", badge: "Scotland Top", bg: "rgba(11, 34, 101, 0.04)" },
      { name: "Imperial College London", rank: "QS Rank: #2", location: "London, England", intakes: "September (Fall)", courses: "Aerospace Engineering, Physics, Artificial Intelligence", badge: "STEM Leader", bg: "rgba(11, 34, 101, 0.04)" }
    ],
    currency: "GBP",
    calculator: {
      undergrad: 24000,
      postgrad: 28000,
      diploma: 15000,
      provLabel: "Destination Region",
      provNames: { on: "London Central", bc: "Outer London / South", qc: "Scotland", ab: "Wales / North" },
      provMultiplier: { on: 1.15, bc: 1.0, qc: 0.92, ab: 0.88 },
      immigrationReq: 12006
    },
    intakes: {
      fall: { name: "Autumn Intake", month: "Sept / Oct", desc: "The main intake in the UK. All subjects, full scholarships, and standard timelines apply.", deadline: "Apply by: Jan - Jun" },
      winter: { name: "Spring Intake", month: "Jan / Feb", desc: "A robust mid-year intake option. Good for master's programs and business fields.", deadline: "Apply by: Aug - Oct" },
      spring: { name: "Summer Intake", month: "May / June", desc: "Highly limited intake, mostly for foundations, English language preparation, and select diplomas.", deadline: "Apply by: Dec - Feb" }
    }
  },
  "United States": {
    badge: "🇺🇸 STEM OPT Extension",
    badgeBg: "#FFF1F2",
    badgeBorder: "#FECDD3",
    badgeColor: "#BE123C",
    heroImage: "/usa.jpg",
    heroGrad: "linear-gradient(to bottom, #EFF6FF 0%, #F8FAFC 55%, #F0F4FC 100%)",
    gradient: "linear-gradient(135deg, #0A1C3E 0%, #B22234 100%)",
    whyChooseTitle: "Why Choose US Institutions?",
    whyChooseDesc: "The US hosts the world's most innovative academic systems, unmatched research funding, and massive tech and finance hiring pools.",
    bullets: [
      "OPT (Optional Practical Training) allowing 1 year of work, plus an additional 2 years for STEM graduates (3 years total).",
      "Unrivaled research infrastructure, massive industry funding, and startup culture.",
      "Flexible academic structures allowing major changes and double-majors."
    ],
    applyTitle: "Apply to United States",
    applyDesc: "Connect directly with experienced counselors to streamline application files.",
    timelineTitle: "From Student Visa to US Green Card",
    timeline: [
      { step: "1", title: "I-20 Form", desc: "Gain admission to a SEVP-approved school and receive your official I-20 form." },
      { step: "2", title: "F-1 Visa", desc: "Pass your visa interview at the embassy and secure your F-1 student visa." },
      { step: "3", title: "Academics", desc: "Study at top universities while maintaining full-time course credits." },
      { step: "4", title: "OPT / STEM", desc: "Work on OPT (1 year) or STEM OPT extension (up to 3 years total) in your field." },
      { step: "5", title: "H-1B Visa", desc: "Transition to a sponsored H-1B specialty occupation work visa." },
      { step: "6", title: "Green Card", desc: "Apply for employer-sponsored Permanent Residency (Green Card)." }
    ],
    unis: [
      { name: "MIT", rank: "QS Rank: #1", location: "Cambridge, Massachusetts", intakes: "September (Fall)", courses: "Computer Science, Robotics, Engineering, Economics", badge: "World Leader", bg: "rgba(10, 28, 62, 0.04)" },
      { name: "Harvard University", rank: "QS Rank: #4", location: "Cambridge, Massachusetts", intakes: "September (Fall)", courses: "Law, Business Administration (MBA), Public Policy, Medicine", badge: "Ivy League Elite", bg: "rgba(10, 28, 62, 0.04)" },
      { name: "Yale University", rank: "QS Rank: #23", location: "New Haven, Connecticut", intakes: "September (Fall)", courses: "Political Science, Law, History, Fine Arts", badge: "Historic Ivy", bg: "rgba(10, 28, 62, 0.04)" },
      { name: "Stanford University", rank: "QS Rank: #6", location: "Stanford, California", intakes: "September, January", courses: "Software Engineering, Finance, Entrepreneurship", badge: "Silicon Valley Hub", bg: "rgba(10, 28, 62, 0.04)" }
    ],
    currency: "USD",
    calculator: {
      undergrad: 45000,
      postgrad: 48000,
      diploma: 25000,
      provLabel: "Destination State",
      provNames: { on: "California", bc: "New York", qc: "Texas", ab: "Massachusetts" },
      provMultiplier: { on: 1.15, bc: 1.18, qc: 0.9, ab: 1.12 },
      immigrationReq: 25000
    },
    intakes: {
      fall: { name: "Fall Semester", month: "Aug / Sept", desc: "The primary and most prestigious intake. Virtually all scholarships, assistantships, and majors are fully accessible.", deadline: "Apply by: Dec - Mar" },
      winter: { name: "Spring Semester", month: "Jan / Feb", desc: "Secondary intake. Good for rolling admissions, though assistantship/scholarship options may be fewer.", deadline: "Apply by: Aug - Oct" },
      spring: { name: "Summer Term", month: "May / June", desc: "Limited term. Mostly dedicated to English language pathways, bootcamps, and specialized fast-track programs.", deadline: "Apply by: Jan - Feb" }
    }
  },
  "New Zealand": {
    badge: "🇳🇿 Green List Pathway",
    badgeBg: "#ECFDF5",
    badgeBorder: "#A7F3D0",
    badgeColor: "#047857",
    heroImage: "/new_zealand.jpg",
    heroGrad: "linear-gradient(to bottom, #ECFDF5 0%, #F0FDF4 55%, #F0F4FC 100%)",
    gradient: "linear-gradient(135deg, #00247D 0%, #008E3C 100%)",
    whyChooseTitle: "Why Choose New Zealand Institutions?",
    whyChooseDesc: "New Zealand provides supportive education environments, incredible natural beauty, and targeted visa pathways for skilled graduates.",
    bullets: [
      "Post-Study Work Visa of up to 3 years depending on qualifications.",
      "Fast-track residency pathways via the NZ Green List for in-demand occupations (Engineering, IT, Nursing).",
      "Extremely safe, welcoming, and scenic environment for international students."
    ],
    applyTitle: "Apply to New Zealand",
    applyDesc: "Connect directly with experienced counselors to streamline application files.",
    timelineTitle: "From Student Visa to NZ PR",
    timeline: [
      { step: "1", title: "Study Visa", desc: "Secure a place at an NZQA-approved provider and obtain your Student Visa." },
      { step: "2", title: "Level 7+ Study", desc: "Complete an eligible Level 7 Bachelor's or Level 8/9 Postgraduate degree." },
      { step: "3", title: "Work Visa", desc: "Apply for an open Post-Study Work Visa (up to 3 years validity)." },
      { step: "4", title: "Green List Job", desc: "Secure a job mapped to Tier 1 or Tier 2 of the New Zealand Green List." },
      { step: "5", title: "SMC Pool", desc: "Submit expressions under the Skilled Migrant Category point system." },
      { step: "6", title: "NZ Residency", desc: "Receive your resident visa and call New Zealand your permanent home!" }
    ],
    unis: [
      { name: "Otago Polytechnic", rank: "NZQA: Category 1", location: "Dunedin & Auckland", intakes: "February, July", courses: "Information Technology, Nursing, Design, Engineering, Business", badge: "Practical Skills", bg: "rgba(0, 142, 60, 0.04)" },
      { name: "Future Skills Academy", rank: "NZQA: Category 1", location: "Auckland", intakes: "Rolling Intakes", courses: "Information Technology, Construction, Health, Business", badge: "Vocational Expert", bg: "rgba(0, 142, 60, 0.04)" }
    ],
    currency: "NZD",
    calculator: {
      undergrad: 28000,
      postgrad: 34000,
      diploma: 19000,
      provLabel: "Destination Region",
      provNames: { on: "Auckland", bc: "Wellington", qc: "Canterbury", ab: "Otago" },
      provMultiplier: { on: 1.05, bc: 1.0, qc: 0.95, ab: 0.92 },
      immigrationReq: 20000
    },
    intakes: {
      fall: { name: "Semester 1", month: "Feb / Mar", desc: "The main intake in New Zealand. Ideal for starting all degrees, high weather compatibility, and orientation cycles.", deadline: "Apply by: Nov - Dec" },
      winter: { name: "Semester 2", month: "July / Aug", desc: "Strong mid-year intake. Very popular for postgraduate courses and specialized diplomas.", deadline: "Apply by: Apr - May" },
      spring: { name: "Trimester 3 / Summer", month: "Nov / Dec", desc: "Short term. Best for preparatory courses, English training, and select computing certifications.", deadline: "Apply by: Aug - Sept" }
    }
  },
  Germany: {
    badge: "🇩🇪 Tuition-Free Option",
    badgeBg: "#FFF7ED",
    badgeBorder: "#FFEDD5",
    badgeColor: "#C2410C",
    heroImage: "/germany.jpg",
    heroGrad: "linear-gradient(to bottom, #FFEAE9 0%, #FFF5F5 55%, #F0F4FC 100%)",
    gradient: "linear-gradient(135deg, #1B1B1B 0%, #E3000F 100%)",
    whyChooseTitle: "Why Choose German Institutions?",
    whyChooseDesc: "Germany provides tuition-free education at public universities, boasting unmatched manufacturing, industrial engineering, and tech careers.",
    bullets: [
      "No tuition fees at most public universities, even for international students.",
      "18-Month Job Seeking Visa post-graduation to find professional employment.",
      "Robust economy and massive industrial base offering countless high-paying engineering & tech jobs."
    ],
    applyTitle: "Apply to Germany",
    applyDesc: "Connect directly with experienced counselors to streamline application files.",
    timelineTitle: "From Free Education to German Settlement",
    timeline: [
      { step: "1", title: "Uni-Assist", desc: "Check recognition and submit your application via Uni-Assist or directly to schools." },
      { step: "2", title: "Blocked Account", desc: "Open a Blocked Account (Sperrkonto) with required living expenses (€11,904)." },
      { step: "3", title: "Free Public Study", desc: "Study in English or German tuition-free at a top-ranked public university." },
      { step: "4", title: "Job Seeker Visa", desc: "Receive an 18-month Job Seeker Visa immediately after graduation." },
      { step: "5", title: "Professional Job", desc: "Secure a professional job related to your degree and transition to an EU Blue Card." },
      { step: "6", title: "German Settlement", desc: "Obtain a Permanent Settlement Permit (PR) after just 2 years of work!" }
    ],
    unis: [
      { name: "TU Munich (TUM)", rank: "QS Rank: #28", location: "Munich, Bavaria", intakes: "October (Winter)", courses: "Mechanical Engineering, Computer Science, Informatics, Management", badge: "#1 in Germany", bg: "rgba(34, 34, 34, 0.04)" },
      { name: "Heidelberg University", rank: "QS Rank: #84", location: "Heidelberg, Baden-Württemberg", intakes: "October (Winter)", courses: "Medicine, Life Sciences, Physics, Archaeology", badge: "Oldest in DE", bg: "rgba(34, 34, 34, 0.04)" },
      { name: "Humboldt University", rank: "QS Rank: #126", location: "Berlin", intakes: "October, April", courses: "Humanities, Social Sciences, Law, Mathematics", badge: "Capital Elite", bg: "rgba(34, 34, 34, 0.04)" },
      { name: "RWTH Aachen", rank: "QS Rank: #99", location: "Aachen, North Rhine-Westphalia", intakes: "October, April", courses: "Automotive Engineering, Production Technology, Physics", badge: "Engineering Giant", bg: "rgba(34, 34, 34, 0.04)" }
    ],
    currency: "EUR",
    calculator: {
      undergrad: 0, // Tuition-free!
      postgrad: 0,
      diploma: 0,
      provLabel: "Federal State",
      provNames: { on: "Bavaria", bc: "Baden-Württemberg", qc: "Berlin", ab: "North Rhine-Westphalia" },
      provMultiplier: { on: 1.0, bc: 1.0, qc: 0.95, ab: 0.9 }, // Living expenses scaling factor
      immigrationReq: 11904
    },
    intakes: {
      fall: { name: "Winter Semester", month: "Oct / Nov", desc: "The main intake in Germany. Virtually all public universities open their academic cycles, offering the complete catalog of programs.", deadline: "Apply by: Apr - Jul" },
      winter: { name: "Summer Semester", month: "Apr / May", desc: "Secondary intake. Good program availability for master's programs and select technical tracks.", deadline: "Apply by: Oct - Jan" },
      spring: { name: "Prep Courses", month: "Variable", desc: "Language school intakes and Studienkolleg foundation entries available on a rolling basis.", deadline: "Apply by: Rolling Admissions" }
    }
  },
  Ireland: {
    badge: "🇮🇪 Stayback Visa Choice",
    badgeBg: "#ECFDF5",
    badgeBorder: "#A7F3D0",
    badgeColor: "#047857",
    heroImage: "/ireland.jpg",
    heroGrad: "linear-gradient(to bottom, #E8F5E9 0%, #F1F8E9 55%, #F0F4FC 100%)",
    gradient: "linear-gradient(135deg, #009A49 0%, #FF7900 100%)",
    whyChooseTitle: "Why Choose Irish Institutions?",
    whyChooseDesc: "Ireland is the European hub for tech and pharma, offering top-ranked English-speaking universities and excellent post-study stayback options.",
    bullets: [
      "2-Year Third Level Graduate Scheme (stayback visa) for master's and PhD graduates.",
      "European headquarters for Google, Apple, Meta, and Pfizer, providing high-quality graduate jobs.",
      "Vibrant culture, friendly communities, and highly rated education standards."
    ],
    applyTitle: "Apply to Ireland",
    applyDesc: "Connect directly with experienced counselors to streamline application files.",
    timelineTitle: "From Student Visa to Ireland Stamp 4",
    timeline: [
      { step: "1", title: "Apply to IHE", desc: "Gain an offer of admission from an Irish Higher Education Institution." },
      { step: "2", title: "Study Visa", desc: "Show block funds (€10,000) and secure your Stamp 2 Student Visa." },
      { step: "3", title: "Study period", desc: "Complete an eligible Level 8 Bachelor's or Level 9 Master's degree." },
      { step: "4", title: "Stayback Visa", desc: "Apply for a 2-year Stamp 1G Graduate Visa to work full-time." },
      { step: "5", title: "Critical Skills", desc: "Secure a Critical Skills Employment Permit sponsored by a local employer." },
      { step: "6", title: "Stamp 4 PR", desc: "Transition to a Stamp 4 residency permit allowing permanent settlement!" }
    ],
    unis: [
      { name: "Trinity College Dublin", rank: "QS Rank: #87", location: "Dublin, Leinster", intakes: "September (Fall)", courses: "Literature, Law, MBA, Computer Science", badge: "#1 in Ireland", bg: "rgba(4, 120, 87, 0.04)" },
      { name: "University College Dublin", rank: "QS Rank: #126", location: "Dublin, Leinster", intakes: "September (Fall)", courses: "Veterinary Science, Business, Software Engineering", badge: "Global Network", bg: "rgba(4, 120, 87, 0.04)" },
      { name: "University of Galway", rank: "QS Rank: #273", location: "Galway, Connacht", intakes: "September, January", courses: "Marine Science, Biomedical Engineering, Humanities", badge: "Research Hub", bg: "rgba(4, 120, 87, 0.04)" },
      { name: "Dublin City University", rank: "QS Rank: #390", location: "Dublin, Leinster", intakes: "September, January", courses: "Communications, Accounting, Computing", badge: "Employment Leader", bg: "rgba(4, 120, 87, 0.04)" }
    ],
    currency: "EUR",
    calculator: {
      undergrad: 18000,
      postgrad: 22000,
      diploma: 12000,
      provLabel: "Destination County",
      provNames: { on: "Dublin", bc: "Cork", qc: "Galway", ab: "Limerick" },
      provMultiplier: { on: 1.15, bc: 1.0, qc: 0.92, ab: 0.88 },
      immigrationReq: 10000
    },
    intakes: {
      fall: { name: "Autumn Semester", month: "Sept / Oct", desc: "The main intake in Ireland. All subjects, full scholarships, and standard timelines apply.", deadline: "Apply by: Jan - May" },
      winter: { name: "Spring Semester", month: "Jan / Feb", desc: "A robust mid-year intake option. Good for master's programs and business fields.", deadline: "Apply by: Jul - Sep" },
      spring: { name: "Summer intake", month: "Variable", desc: "Mostly dedicated to English language prep, business foundations, and short diploma entries.", deadline: "Apply by: Rolling Admissions" }
    }
  }
};

export default function CountryPage({ countryName, onBack, onOpenConsultation }) {
  // Safe Fallback
  const data = COUNTRY_DATA[countryName] || COUNTRY_DATA["Canada"];

  // Reset and scroll when country changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countryName]);

  return (
    <div className="co-page">
      {/* Scope-specific Styles */}
      <style>{`
        .co-page {
          background-color: #F8FAFC;
          color: #1E293B;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
        }

        /* Hero */
        .co-hero {
          padding: 190px 24px 110px;
          background: linear-gradient(to bottom, rgba(248, 250, 252, 0.72) 0%, rgba(248, 250, 252, 0.96) 100%), url(${data.heroImage}) no-repeat center center;
          background-size: cover;
          text-align: center;
          position: relative;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
        }
        .co-badge {
          display: inline-flex;
          align-items: center;
          background: ${data.badgeBg};
          border: 1px solid ${data.badgeBorder};
          color: ${data.badgeColor};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .co-hero h1 {
          font-family: Georgia, serif;
          font-size: clamp(38px, 5vw, 64px);
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 18px;
          line-height: 1.15;
        }
        .co-hero h1 span {
          background: ${data.gradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }
        .co-hero-sub {
          max-width: 780px;
          margin: 0 auto 44px;
          font-size: 16.5px;
          color: #64748B;
          line-height: 1.75;
        }

        /* Two Cards Grid */
        .co-card-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
          max-width: 1100px;
          margin: -20px auto 80px;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }
        .co-card-left {
          background: #FFFFFF;
          border: 1px solid rgba(37, 99, 235, 0.06);
          border-radius: 24px;
          padding: 44px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
          text-align: left;
        }
        .co-card-left h2 {
          font-family: Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 16px;
        }
        .co-card-left p {
          font-size: 14px;
          color: #64748B;
          line-height: 1.65;
          margin-bottom: 24px;
        }
        .co-bullets {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .co-bullet-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 13.5px;
          color: #334155;
          line-height: 1.5;
          font-weight: 500;
        }

        .co-card-right {
          background: ${data.gradient};
          border-radius: 24px;
          padding: 44px;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 12px 36px rgba(15, 23, 42, 0.1);
          position: relative;
          overflow: hidden;
        }
        .co-card-right::before {
          content: '';
          position: absolute;
          width: 250px;
          height: 250px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
          top: -100px;
          right: -100px;
        }
        .co-card-right h2 {
          font-family: Georgia, serif;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 12px;
          z-index: 2;
        }
        .co-card-right p {
          font-size: 14.5px;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 280px;
          z-index: 2;
        }
        .co-btn-white {
          background: #FFFFFF;
          color: #0F172A;
          border: none;
          font-size: 14px;
          font-weight: 700;
          padding: 14px 36px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          z-index: 2;
        }
        .co-btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,255,255,0.25), 0 4px 15px rgba(0,0,0,0.15);
        }

        /* Section Layouts */
        .co-sec {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .co-sec-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .co-sec-label {
          font-size: 11px;
          font-weight: 700;
          color: ${data.badgeColor};
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
          display: block;
        }
        .co-sec-title {
          font-family: Georgia, serif;
          font-size: clamp(26px, 3.5vw, 36px);
          font-weight: 800;
          color: #0F172A;
        }
        
        /* Universities */
        .co-uni-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .co-uni-card {
          background: #FFFFFF;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02);
          transition: all 0.3s ease;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .co-uni-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
          border-color: ${data.badgeColor};
        }
        .co-uni-badge {
          align-self: flex-start;
          background: ${data.badgeBg};
          color: ${data.badgeColor};
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 14px;
        }
        .co-uni-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
        }
        .co-uni-rank {
          font-size: 12px;
          color: #E25822;
          font-weight: 600;
          margin-bottom: 14px;
        }
        .co-uni-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: #475569;
          border-top: 1px dashed #E2E8F0;
          padding-top: 14px;
          margin-top: 14px;
        }
        .co-uni-detail-item strong {
          color: #334155;
        }

        /* Pathway Timeline */
        .co-timeline-sec {
          background: #FFFFFF;
          padding: 80px 24px;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
          border-bottom: 1px solid rgba(226, 232, 240, 0.6);
        }
        .co-timeline {
          display: flex;
          justify-content: space-between;
          max-width: 1000px;
          margin: 60px auto 20px;
          position: relative;
        }
        .co-timeline::before {
          content: '';
          position: absolute;
          top: 24px;
          left: 40px;
          right: 40px;
          height: 4px;
          background: #E2E8F0;
          z-index: 1;
        }
        .co-timeline-step {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 16%;
        }
        .co-step-num {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #F1F5F9;
          color: #64748B;
          border: 3px solid #E2E8F0;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .co-timeline-step:hover .co-step-num {
          background: ${data.gradient};
          color: #FFFFFF;
          border-color: #FFFFFF;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }
        .co-timeline-step.active .co-step-num {
          background: ${data.gradient};
          color: #FFFFFF;
          border-color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }
        .co-step-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #0F172A;
          margin-top: 14px;
          text-align: center;
        }
        .co-step-desc {
          font-size: 11px;
          color: #64748B;
          text-align: center;
          margin-top: 6px;
          line-height: 1.4;
        }



        /* Intakes */
        .co-intake-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 32px;
        }
        .co-intake-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 18px;
          padding: 24px;
          text-align: left;
          transition: all 0.3s;
        }
        .co-intake-card:hover {
          border-color: ${data.badgeColor};
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
        .co-intake-badge {
          background: ${data.badgeBg};
          color: ${data.badgeColor};
          font-weight: 700;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 4px;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 12px;
        }
        .co-intake-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 6px;
        }
        .co-intake-card p {
          font-size: 12px;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .co-intake-timeline {
          font-size: 11.5px;
          font-weight: 600;
          color: #E25822;
        }

        /* Floating Back Button */
        .co-back-btn {
          position: absolute;
          top: 130px;
          left: 40px;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 50px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          z-index: 100;
        }
        .co-back-btn:hover {
          border-color: #CBD5E1;
          color: #0F172A;
          transform: translateX(-4px);
        }

        /* Responsive */
        @media(max-width: 992px) {
          .co-card-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin-top: -30px;
          }
          .co-uni-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: 0 auto;
          }
          .co-timeline {
            flex-direction: column;
            gap: 28px;
            align-items: flex-start;
            padding-left: 20px;
          }
          .co-timeline::before {
            top: 24px;
            bottom: 24px;
            left: 44px;
            width: 4px;
            height: auto;
          }
          .co-timeline-step {
            flex-direction: row;
            width: 100%;
            gap: 20px;
            text-align: left;
            align-items: center;
          }
          .co-step-title {
            margin-top: 0;
            text-align: left;
          }
          .co-step-desc {
            margin-top: 2px;
            text-align: left;
          }

          .co-intake-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 32px auto 0;
          }
          .co-back-btn {
            left: 20px;
            top: 110px;
          }
        }
      `}</style>

      {/* Floating Back Button */}
      <button className="co-back-btn" onClick={onBack}>
        ← Back to Homepage
      </button>

      {/* ── HERO ── */}
      <section className="co-hero">
        <div className="co-badge">
          {data.badge}
        </div>
        <h1>Study in <span>{countryName}</span></h1>
        <p className="co-hero-sub">
          {data.whyChooseDesc}
        </p>

        {/* ── Mockup Double-Card Grid ── */}
        <div className="co-card-grid">
          <div className="co-card-left">
            <h2>{data.whyChooseTitle}</h2>
            <p>
              Ignite Edulink offers a complete ecosystem of admissions, visa processing, and resettlement resources to ensure a successful educational tenure.
            </p>
            <div className="co-bullets">
              {data.bullets.map((b, idx) => (
                <div className="co-bullet-item" key={idx}>
                  <RedCheckIcon />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="co-card-right">
            <h2>{data.applyTitle}</h2>
            <p>{data.applyDesc}</p>
            <button className="co-btn-white" onClick={onOpenConsultation}>
              Start My Journey
            </button>
          </div>
        </div>
      </section>

      {/* ── PR PATHWAY TIMELINE ── */}
      <section className="co-timeline-sec">
        <div className="co-sec-header">
          <span className="co-sec-label">Migration Pathways</span>
          <h2 className="co-sec-title">{data.timelineTitle}</h2>
        </div>
        <div className="co-timeline">
          {data.timeline.map((step, idx) => (
            <div className="co-timeline-step active" key={idx}>
              <div className="co-step-num">{step.step}</div>
              <div>
                <div className="co-step-title">{step.title}</div>
                <div className="co-step-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED UNIVERSITIES ── */}
      <section className="co-sec">
        <div className="co-sec-header">
          <span className="co-sec-label">Featured Institutions</span>
          <h2 className="co-sec-title">Top Universities in {countryName}</h2>
        </div>
        <div className="co-uni-grid">
          {data.unis.map((u) => (
            <div className="co-uni-card" key={u.name}>
              <div>
                <span className="co-uni-badge">{u.badge}</span>
                <h3>{u.name}</h3>
                <div className="co-uni-rank">{u.rank}</div>
              </div>
              <div className="co-uni-details">
                <div className="co-uni-detail-item"><strong>Location:</strong> {u.location}</div>
                <div className="co-uni-detail-item"><strong>Key Intakes:</strong> {u.intakes}</div>
                <div className="co-uni-detail-item"><strong>Popular Fields:</strong> {u.courses}</div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ── ACADEMIC CYCLES ── */}
      <section className="co-sec">
        <div className="co-sec-header">
          <span className="co-sec-label">Intake Seasons</span>
          <h2 className="co-sec-title">Academic Intakes in {countryName}</h2>
        </div>
        <div className="co-intake-grid">
          <div className="co-intake-card">
            <span className="co-intake-badge">{data.intakes.fall.name}</span>
            <h3>{data.intakes.fall.month}</h3>
            <p>{data.intakes.fall.desc}</p>
            <div className="co-intake-timeline">{data.intakes.fall.deadline}</div>
          </div>
          <div className="co-intake-card">
            <span className="co-intake-badge" style={{ background: "#EFF6FF", color: "#2563EB" }}>{data.intakes.winter.name}</span>
            <h3>{data.intakes.winter.month}</h3>
            <p>{data.intakes.winter.desc}</p>
            <div className="co-intake-timeline">{data.intakes.winter.deadline}</div>
          </div>
          <div className="co-intake-card">
            <span className="co-intake-badge" style={{ background: "#ECFDF5", color: "#10B981" }}>{data.intakes.spring.name}</span>
            <h3>{data.intakes.spring.month}</h3>
            <p>{data.intakes.spring.desc}</p>
            <div className="co-intake-timeline">{data.intakes.spring.deadline}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
