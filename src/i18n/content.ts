/* =============================================================
   Site content (English).
   Source of truth: résumé of Nguyen Trong Thuan.
   `Localized` is a plain string — the site is English-only — but the
   alias is kept so component prop types read clearly.
   ============================================================= */

export type Localized = string

/* ---------------------------------- UI ---------------------------------- */
export const ui = {
  nav: {
    about: 'About',
    impact: 'Impact',
    experience: 'Experience',
    projects: 'Projects',
    stack: 'Stack',
    education: 'Education',
    contact: 'Contact',
  },
  actions: {
    viewCv: 'View CV',
    getInTouch: 'Get in touch',
    backToTop: 'Back to top',
    toggleTheme: 'Toggle light / dark',
  },
  hero: {
    available: 'Open to DevOps, Platform & Backend roles',
    role: 'Senior Platform Engineer',
    tagline: `Just a Software Engineer with a head full of "sky-high" dreams`,
    headline: 'I build the infrastructure behind systems that scale — and stay up.',
    sub: 'I care about the unglamorous parts — the ones nobody notices until they break.',
  },
  sections: {
    about: {
      title: 'A bit about me',
      lead: 'Platform engineer focused on reliability, scale, and systems that are pleasant to operate.',
    },
    impact: {
      title: 'Impact in numbers',
      lead: 'A few figures from systems I have designed, shipped, and operated in production.',
    },
    experience: {
      title: 'Where I have worked',
      lead: 'Three teams, one throughline: infrastructure that carries real traffic.',
    },
    projects: {
      title: 'Things I have built',
      lead: 'Open-source work around live media — servers, control planes, and observability.',
    },
    stack: {
      title: 'Tools I reach for',
      lead: 'The languages, datastores, and platforms I work with day to day.',
    },
    education: {
      title: 'Education',
    },
    contact: {
      title: "Let's talk",
      lead: 'Have a role, a system to scale, or just want to say hi? My inbox is open.',
    },
  },
  contact: {
    nameLabel: 'Name',
    namePh: 'Your name',
    emailLabel: 'Email',
    emailPh: 'you@example.com',
    messageLabel: 'Message',
    messagePh: 'What would you like to talk about?',
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Thanks — your message is on its way.',
    error: 'Something went wrong. You can also email me directly.',
    orReach: 'Or reach me at',
    invalidEmail: 'Please enter a valid email.',
    required: 'This field is required.',
  },
  footer: {
    built: 'Designed & built with React, Vite and a lot of care.',
    rights: 'All rights reserved.',
  },
  meta: {
    current: 'Current',
  },
} as const

/* -------------------------------- Profile -------------------------------- */
export const profile = {
  name: 'Nguyen Trong Thuan',
  role: 'Senior Platform Engineer',
  location: 'District 3, Ho Chi Minh City',
  email: 'ntthuan060102.work@gmail.com',
  phone: '+84 328 221 179',
  phoneHref: '+84328221179',
  resumePath: '/Nguyen-Trong-Thuan-Resume.pdf',
}

export const social = {
  github: 'https://github.com/ntt0601zcoder',
  linkedin: 'https://www.linkedin.com/in/nguyen-trong-thuan',
  email: 'mailto:ntthuan060102.work@gmail.com',
}

/* -------------------------------- Summary -------------------------------- */
export const summary: string[] = [
  "I'm a platform engineer who works where software meets the metal. Right now I'm at VieON, designing and operating the infrastructure behind live video and large-scale backend systems — the layer that decides whether hundreds of thousands of people can watch without buffering.",
  'Day to day I work mostly in **Go** and **Python**, lean hard on observability, and enjoy turning gnarly infrastructure — gRPC services, Kubernetes, Terraform, and the monitoring stack around them — into reusable platforms other teams can build on.',
]

/* --------------------------------- Metrics ------------------------------- */
export interface Metric {
  value: number
  prefix?: string
  suffix: string
  decimals?: number
  label: string
  context: string
  /** id of the Experience/Projects detail this figure comes from. */
  target?: string
  /** Render as a full-width feature row at the top of the grid. */
  wide?: boolean
}

export const metrics: Metric[] = [
  {
    value: 1400,
    prefix: '$',
    suffix: '/mo',
    wide: true,
    label: 'Monthly license cost cut',
    context: 'Flussonic → self-built Open Streamer',
    target: 'hl-flussonic-cost',
  },
  {
    value: 700,
    suffix: 'K',
    label: 'Peak concurrent viewers',
    context: 'Live streaming platform',
    target: 'hl-livestream',
  },
  {
    value: 10,
    suffix: 'B+',
    label: 'Telemetry records / day',
    context: 'Monitoring-as-a-Service',
    target: 'hl-monitoring',
  },
  {
    value: 5,
    prefix: '~',
    suffix: ' TB',
    label: 'Data processed / day',
    context: 'ETL pipelines',
    target: 'hl-etl',
  },
  {
    value: 200,
    prefix: '~',
    suffix: '',
    label: 'Live channels operated',
    context: 'LiveTV infrastructure',
    target: 'hl-livetv',
  },
  {
    value: 4,
    suffix: ' Gb/s',
    label: 'Peak egress traffic',
    context: 'LiveTV edge',
    target: 'hl-livetv',
  },
  {
    value: 150,
    prefix: '~',
    suffix: ' ms',
    label: 'Failover time',
    context: 'Open Streamer',
    target: 'proj-open-streamer',
  },
]

/* ------------------------------- Experience ------------------------------ */
export interface Highlight {
  text: string
  /** Optional anchor id so Impact metrics can deep-link to this line. */
  id?: string
}

export interface Experience {
  company: string
  org?: string
  role: string
  period: string
  current?: boolean
  summary: string
  highlights: Highlight[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    company: 'VieON',
    org: 'DatVietVAC',
    role: 'Senior Platform Engineer',
    period: 'Nov 2025 — Present',
    current: true,
    summary:
      'Own the live-video infrastructure powering VieON: LiveTV, the live-streaming platform, transcoding, CDN routing, and identity.',
    highlights: [
      {
        text: 'Architected and operate **LiveTV infrastructure** on Flussonic — **~500 MB/s inbound**, **~4 Gb/s outbound**, **~60K peak CCU** across **10+ servers** and **~200 live channels**.',
        id: 'hl-livetv',
      },
      {
        text: 'Cut **~$1,400/mo (~35M VND)** of recurring **Flussonic** license cost by building and adopting **Open Streamer** — a self-built open-source media server.',
        id: 'hl-flussonic-cost',
      },
      {
        text: 'Built the **Live Streaming Platform** as reusable infrastructure — scaled to **700K peak concurrent viewers** across multiple internal products.',
        id: 'hl-livestream',
      },
      {
        text: 'Designed the **Playlist Service** — a CDN routing & optimization layer that routes to the nearest, most cost-efficient CDN, cutting cost, latency, and origin load.',
      },
      {
        text: 'Built an **in-house transcoding system** processing **6 profiles / ~4 TB raw video per day**, balanced for cost and throughput.',
      },
      {
        text: 'Developed the **User Service** unifying end-user and internal identity with OAuth 2.0 and SSO.',
      },
      {
        text: 'Set up end-to-end **monitoring & alerting** with anomaly detection and auto-scaling to absorb traffic spikes.',
      },
      {
        text: 'Built **internal admin platforms** for LiveTV, Live Streaming, User Management, and Transcoding operations.',
      },
    ],
    tags: [
      'Go',
      'Flussonic',
      'Live Streaming',
      'CDN',
      'Transcoding',
      'OAuth 2.0',
      'Monitoring',
      'Auto-scaling',
    ],
  },
  {
    company: 'VNPAY',
    role: 'Backend Engineer',
    period: 'May 2024 — Sep 2025',
    summary:
      'Built cloud-native platform services: observability, private networking, and managed databases for VNPAY Cloud.',
    highlights: [
      {
        text: 'Built **scalable microservices** on **gRPC**, **MySQL**, and **Elasticsearch**, applying **Saga**, **message queues**, and **2PC**.',
      },
      {
        text: 'Built **Monitoring-as-a-Service** with a custom **OpenTelemetry Collector** processing **10B+ records/day**; **Mimir** & **Loki** for storage; **APISIX** for auth and tenant routing.',
        id: 'hl-monitoring',
      },
      {
        text: 'Designed **VPC Peering** and **Service Endpoints** on **Juniper / OpenStack** — high-speed private connectivity between VPCs and managed services (**DBaaS**, **S3**).',
      },
      {
        text: 'Built a **network monitoring system** (**Goflow2**, **ClickHouse**, **Grafana**) ingesting **~5 GB/day** of compressed telemetry for capacity and SLO observability.',
      },
      {
        text: 'Developed **Database-as-a-Service** — customer-facing orchestration of DB clusters on **Kubernetes** with replication and sharding.',
      },
      {
        text: 'Key contributor to the open-source **terraform-provider-vnpaycloud**.',
      },
    ],
    tags: [
      'Go',
      'gRPC',
      'OpenTelemetry',
      'Mimir',
      'Loki',
      'APISIX',
      'Kubernetes',
      'OpenStack',
      'ClickHouse',
      'Terraform',
    ],
  },
  {
    company: 'FPT Telecom',
    role: 'Backend Developer',
    period: 'Jun 2022 — May 2024',
    summary:
      'Built backend services and data pipelines: microservices, notifications, ETL, and database security.',
    highlights: [
      {
        text: 'Designed and built a **microservices architecture** supporting **~5,000 CCU**.',
      },
      {
        text: 'Developed a **push notification service** on **Firebase Cloud Messaging** handling **100K+ messages/day**.',
      },
      {
        text: 'Built **ETL workflows** on **Airflow** processing **~5 TB/day** of internal data across multiple warehouses.',
        id: 'hl-etl',
      },
      {
        text: 'Implemented fine-grained **database security** using **OLS** and **VPD** on **Oracle** for access control and data protection.',
      },
      {
        text: 'Shipped a **user-behavior tracking system** powering analytics and feature-optimization workflows.',
      },
    ],
    tags: ['Python', 'Microservices', 'Airflow', 'FCM', 'Oracle', 'ETL'],
  },
]

/* -------------------------------- Projects ------------------------------- */
export interface Project {
  name: string
  tagline: string
  description: string
  tags: string[]
  repo: string
  language: string
  featured?: boolean
  /** Optional anchor id so Impact metrics can deep-link to this card. */
  id?: string
}

export const projects: Project[] = [
  {
    name: 'Open Streamer',
    tagline: 'High-availability live media server',
    description:
      'A live media server written in Go with multi-protocol ingest/egress and ~150 ms failover for uninterrupted streaming.',
    tags: ['Go', 'HLS', 'RTMP', 'High availability'],
    repo: 'https://github.com/ntt0601zcoder/open-streamer',
    language: 'Go',
    featured: true,
    id: 'proj-open-streamer',
  },
  {
    name: 'Open Streamer Console',
    tagline: 'Web control plane for Open Streamer',
    description:
      'The control-plane UI: dashboards, stream configuration, webhooks, and a built-in YAML editor for operating the platform.',
    tags: ['React', 'TypeScript', 'Dashboard', 'YAML'],
    repo: 'https://github.com/ntt0601zcoder/open-streamer-console',
    language: 'TypeScript',
    featured: true,
  },
  {
    name: 'Flussonic Exporter',
    tagline: 'Prometheus exporter for Flussonic',
    description:
      'A lightweight Prometheus exporter for Flussonic Media Server, surfacing real-time stream and server metrics for monitoring.',
    tags: ['Python', 'Prometheus', 'Observability'],
    repo: 'https://github.com/ntt0601zcoder/flussonic-exporter',
    language: 'Python',
    featured: true,
  },
  {
    name: 'Music Converter',
    tagline: 'Audio & video → sheet music',
    description:
      'Turns audio or video into sheet music in the browser — AI note detection with MIDI / MusicXML / PDF export, piano playback, and a falling-notes view.',
    tags: ['TypeScript', 'AI', 'Web Audio', 'MIDI'],
    repo: 'https://github.com/ntt0601zcoder/music-converter',
    language: 'TypeScript',
    featured: true,
  },
  {
    name: 'PDF Reader',
    tagline: 'Online PDF reader',
    description:
      'A clean, browser-based PDF reader — a small side project for reading documents without installs.',
    tags: ['JavaScript', 'Web'],
    repo: 'https://github.com/ntt0601zcoder/pdf-reader',
    language: 'JavaScript',
  },
]

/* --------------------------------- Stack --------------------------------- */
export interface StackSubgroup {
  label: string
  items: string[]
  // Span the full row inside the group card (for long item lists).
  wide?: boolean
}

export interface StackGroup {
  label: string
  items?: string[]
  subgroups?: StackSubgroup[]
}

// Mirrors the résumé's "Technical proficiency" section.
export const stack: StackGroup[] = [
  {
    label: 'Programming languages',
    items: ['Golang', 'Python', 'JavaScript', 'Bash Script'],
  },
  {
    label: 'Databases',
    items: ['MySQL', 'Redis', 'MongoDB', 'Elasticsearch', 'Clickhouse'],
  },
  {
    label: 'BaaS / Cloud services',
    items: ['GCP', 'Byteplus'],
  },
  {
    label: 'Frameworks / Development packages',
    subgroups: [
      { label: 'Backend', items: ['Django', 'Go-gRPC', 'Gin', 'ExpressJS'] },
      { label: 'Frontend', items: ['React'] },
      {
        label: 'DevOps',
        wide: true,
        items: [
          'Terraform',
          'Grafana',
          'Kubernetes',
          'Consul',
          'ELK Stack',
          'Jenkins',
          'Vault',
          'OpenTelemetry',
        ],
      },
    ],
  },
  {
    label: 'Others',
    items: ['Kafka', 'Ubuntu', 'Flussonic'],
  },
]

/* ------------------------------- Education ------------------------------- */
export interface Education {
  degree: string
  school: string
  period: string
  detail: string
}

export const education: Education[] = [
  {
    degree: 'B.Sc. in Information Technology',
    school: 'University of Science, VNU-HCM',
    period: '2020 — 2024',
    detail: 'GPA 3.2 / 4.0',
  },
]
