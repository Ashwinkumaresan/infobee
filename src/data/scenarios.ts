export interface Scenario {
  id: string;
  title: string;
  industry: string;
  abstract: string;
}

export const scenarios: Scenario[] = [
  {
    id: '1',
    title: 'Smart Health Record & Care Coordination Platform',
    industry: 'HealthTech / Digital Healthcare / Healthcare SaaS / Clinical Workflow',
    abstract: 'Develop a patient-centric platform that unifies medical records, consultations, prescriptions, diagnostic reports, appointments, and follow-up activities across healthcare providers. The system should provide a consolidated health timeline while enabling patients to control access to their information through consent-based sharing. Healthcare professionals can access authorized records, update care information, and track follow-ups. Teams may extend the platform with healthcare interoperability, report extraction, analytics, and intelligent care coordination features.'
  },
  {
    id: '2',
    title: 'Mobility — Smart Campus & City Mobility Management System',
    industry: 'Mobility Tech / Transportation / Smart City / Fleet Management / Logistics',
    abstract: 'Develop an intelligent mobility platform that connects passengers, vehicles, routes, and transportation operators through a unified system. The platform should support route discovery, trip management, vehicle tracking, estimated arrival information, and mobility analytics. Historical or simulated transportation data can be analysed to identify demand patterns, overcrowding, route utilization, and peak periods. Teams may extend the solution with demand forecasting, route optimization, geospatial analytics, and intelligent vehicle allocation capabilities.'
  },
  {
    id: '3',
    title: 'Finance — Personal Finance & Expense Intelligence Platform',
    industry: 'FinTech / Personal Finance Management / Financial Analytics / SaaS',
    abstract: 'Develop a personal finance platform that transforms raw financial transactions into meaningful spending insights. Users should be able to securely record or import transactions, categorize income and expenses, define budgets, monitor recurring payments, and analyse financial trends. The system should provide dashboards and reports that help users understand their financial behaviour. Teams may extend the platform with automated categorization, anomaly detection, cash-flow forecasting, spending prediction, and natural-language financial analysis.'
  },
  {
    id: '4',
    title: 'ERP — Small Business ERP & Workflow Management System',
    industry: 'ERP / Enterprise SaaS / Business Process Automation/SME Technology',
    abstract: 'Develop an integrated ERP platform that connects sales, purchasing, inventory, suppliers, customers, and basic financial operations for small and medium-sized businesses. The system should demonstrate how activities in one business function trigger appropriate workflows in another, such as generating purchase requests when inventory falls below defined levels. Teams should implement role-based access, transaction tracking, approvals, notifications, and reporting, with opportunities to extend the solution using automation, forecasting, analytics, and event-driven architecture.'
  },
  {
    id: '5',
    title: 'Campus — Unified Campus Student Success Platform',
    industry: 'EdTech / Campus Tech / HRTech / Student Analytics / Education SaaS',
    abstract: 'Develop a unified campus platform that combines academic performance, attendance, skills, certifications, internships, extracurricular activities, and placement information into a single student profile. The system should transform institutional data into meaningful insights for students, faculty, and placement teams. Teams can implement performance analytics, skill-gap identification, placement tracking, and personalized recommendations. Advanced implementations may incorporate resume parsing, job-skill matching, learning recommendations, trend analysis, and explainable student-success analytics.'
  }
];
