import React, { useState } from 'react';
import { Github, TerminalSquare, Globe, Link as LinkIcon, ChevronDown, Plus, Minus, Lightbulb, Zap, Copy, Check } from 'lucide-react';
import './portfolio.css';

export default function PortfolioLanding() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = [
    { cmd: "git init", desc: "Initialize a new Git repository in your folder." },
    { cmd: "git add .", desc: "Stage all your project files." },
    { cmd: "git commit -m \"Initial portfolio commit\"", desc: "Commit the staged files." },
    { cmd: "git branch -M main", desc: "Ensure your primary branch is named 'main'." },
    { cmd: "git remote add origin https://github.com/yourusername/portfolio.git", desc: "Link your local code to your new GitHub repository.", note: "Important: Replace the URL above with your actual GitHub repository link!" },
    { cmd: "git push -u origin main", desc: "Push the code up to GitHub." }
  ];

  return (
    <div className="portfolio-scope bg-background text-on-background font-body antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <section className="relative pt-36 pb-32 px-6 overflow-hidden bg-surface-container-lowest border-b border-outline z-0">
          {/* Soft Ambient Background: Dots + Corner Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(#8d7166_1px,transparent_1px)] [background-size:24px_24px] opacity-10 -z-10"></div>
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-primary-container/40 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-lowest -z-10"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-brand-orange/20 rounded-full shadow-sm mb-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <span className="font-sans text-xs font-bold text-gray-800 tracking-widest uppercase">
                Infobee | Information Technology
              </span>
            </div>
            
            <h1 className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-on-surface mb-8 uppercase">
              Build Your Own <br /> <span className="text-brand-orange font-italianno lowercase">Developer Portfolio</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
              Code it. Push it to GitHub. Host it live. This is the tangible proof of skill that modern tech recruiters are actually looking for.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 w-full sm:w-auto">
              <a className="btn-primary w-full sm:w-auto text-lg px-8 py-4 text-white" href="/Student_Portfolio_Guide.docx" download>
                Start Building
              </a>
              <a className="btn-ghost w-full sm:w-auto text-lg px-8 py-4 bg-white/50 backdrop-blur-sm" href="#submit">
                Submit Portfolio
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-outline-variant max-w-md mx-auto">
              <span className="material-symbols-outlined text-[16px]">code_blocks</span>
              <span>No drag-and-drop builders. Real code required.</span>
            </div>
          </div>
        </section>

        {/* 2. "Why Code This" Section */}
        <section className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Text Block (5 cols) */}
              <div className="md:col-span-5 order-2 md:order-1 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-outline hidden md:block"></div>
                <h2 className="font-headline text-2xl font-bold text-on-surface mb-6 uppercase">
                  Why Hand-Code It?
                </h2>
                <div className="space-y-6 font-body text-base text-on-surface-variant">
                  <p>
                    A developer portfolio built with a website builder is like a mechanic bringing their car to another shop for an oil change. It defeats the purpose.
                  </p>
                  <p>
                    By coding this yourself from scratch, you demonstrate foundational web development skills like semantic structure, responsive styling, and modern deployment workflows. This is not just a showcase. The site itself is your first project.
                  </p>
                </div>
                {/* Tip Banners */}
                <div className="mt-10 space-y-4">
                  <div className="bg-secondary-fixed-dim border border-outline p-4 clip-facet flex items-start gap-4">
                    <span className="material-symbols-outlined text-on-secondary-fixed mt-1">code</span>
                    <div>
                      <h4 className="font-headline text-sm font-bold uppercase mb-1">Frameworks Allowed</h4>
                      <p className="font-mono text-sm text-on-secondary-fixed-variant">While raw HTML/CSS is great, using React, Vue, or Tailwind CSS is highly encouraged to show modern tooling.</p>
                    </div>
                  </div>
                  <div className="bg-tertiary-fixed-dim border border-outline p-4 clip-facet flex items-start gap-4">
                    <span className="material-symbols-outlined text-on-tertiary-fixed mt-1">cloud_upload</span>
                    <div>
                      <h4 className="font-headline text-sm font-bold uppercase mb-1">Free Hosting</h4>
                      <p className="font-mono text-sm text-on-tertiary-fixed-variant">Deploy using modern PaaS solutions like Vercel, Netlify, or GitHub Pages. Connect your repository for CI/CD.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Visual Block (7 cols) */}
              <div className="md:col-span-7 order-1 md:order-2">
                <div className="relative w-full aspect-video bg-surface-container-low border border-outline clip-facet-reverse shadow-solid-lg overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-surface-container opacity-50 z-10 pointer-events-none"></div>
                  
                  {/* Neat SVG Graphic Background instead of image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center overflow-hidden">
                    <svg className="w-64 h-64 text-primary opacity-20 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  
                  {/* Overlay Elements */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-surface border border-outline px-4 py-2 opacity-90 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-error rounded-none"></div>
                      <div className="w-3 h-3 bg-secondary rounded-none"></div>
                      <div className="w-3 h-3 bg-primary-container rounded-none"></div>
                    </div>
                    <span className="font-mono text-sm">index.html</span>
                  </div>
                </div>
                
                {/* Outcome Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="bg-surface-bright border border-outline p-4 text-center hover:bg-surface-container-high transition-colors shadow-solid">
                    <span className="material-symbols-outlined text-primary-container text-3xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                    <p className="font-headline text-sm font-bold uppercase text-on-surface">A Real Coded Portfolio</p>
                  </div>
                  <div className="bg-surface-bright border border-outline p-4 text-center hover:bg-surface-container-high transition-colors shadow-solid">
                    <span className="material-symbols-outlined text-primary-container text-3xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>folder_data</span>
                    <p className="font-headline text-sm font-bold uppercase text-on-surface">A Public GitHub Repo</p>
                  </div>
                  <div className="bg-surface-bright border border-outline p-4 text-center hover:bg-surface-container-high transition-colors shadow-solid">
                    <span className="material-symbols-outlined text-primary-container text-3xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
                    <p className="font-headline text-sm font-bold uppercase text-on-surface">A Live Hosted Link</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. "Required Sections" Checklist */}
        <section className="py-24 px-6 bg-surface-container-lowest border-t border-outline relative" id="requirements">
          {/* Decorative Diagonal Crease */}
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 40px, #8d7166 40px, #8d7166 41px)" }}></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 text-center md:text-left">
              <h2 className="font-headline text-2xl font-bold text-on-surface uppercase mb-4">Architecture Blueprint</h2>
              <p className="font-body text-lg text-on-surface-variant max-w-3xl">
                Sections needed in your portfolio.
              </p>
            </div>
            
            {/* Bento Grid (3-2-2) Asymmetric */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[250px]">
              {/* 1. Header/Navbar (Spans 2) */}
              <div className="md:col-span-2 bg-surface border border-outline p-6 flex flex-col justify-between clip-facet relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-mono text-sm px-3 py-1 font-bold">01</div>
                <div>
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">menu</span>
                  <h3 className="font-headline text-xl font-bold uppercase mb-2">Header / Navbar</h3>
                  <p className="font-body text-base text-on-surface-variant">Sticky navigation for easy access to sections.</p>
                </div>
              </div>
              
              {/* 2. About/Hero (Spans 4) */}
              <div className="md:col-span-4 bg-surface border border-outline p-6 flex flex-col justify-between clip-facet-reverse relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-surface to-primary-container/20 opacity-50"></div>
                <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-mono text-sm px-3 py-1 font-bold z-10">02</div>
                <div className="relative z-10 max-w-md">
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">person</span>
                  <h3 className="font-headline text-xl font-bold uppercase mb-2">Hero &amp; About</h3>
                  <p className="font-body text-base text-on-surface-variant">Your name, a professional tagline, and a brief summary of who you are and what you build.</p>
                </div>
              </div>
              
              {/* 3. Skills (Spans 3) */}
              <div className="md:col-span-3 bg-surface border border-outline p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-solid">
                <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-mono text-sm px-3 py-1 font-bold">03</div>
                <div>
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">construction</span>
                  <h3 className="font-headline text-xl font-bold uppercase mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="font-mono text-sm bg-surface-container-high px-2 py-1 border border-outline">HTML/CSS</span>
                    <span className="font-mono text-sm bg-surface-container-high px-2 py-1 border border-outline">JavaScript</span>
                    <span className="font-mono text-sm bg-surface-container-high px-2 py-1 border border-outline">Frameworks</span>
                    <span className="font-mono text-sm bg-surface-container-high px-2 py-1 border border-outline">Git</span>
                  </div>
                </div>
              </div>
              
              {/* 4. Projects (Spans 3) */}
              <div className="md:col-span-3 bg-primary-fixed border border-outline p-6 flex flex-col justify-between clip-facet relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 right-0 bg-on-primary-fixed text-primary-fixed font-mono text-sm px-3 py-1 font-bold">04</div>
                <div>
                  <span className="material-symbols-outlined text-on-primary-fixed text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>integration_instructions</span>
                  <h3 className="font-headline text-xl font-bold uppercase text-on-primary-fixed mb-2">Projects</h3>
                  <p className="font-body text-base text-on-primary-fixed-variant">The core of the site. Display at least three projects with descriptions, tech stacks, and repo/live links.</p>
                </div>
              </div>
              
              {/* 5. Education/Experience (Spans 2) */}
              <div className="md:col-span-2 bg-surface border border-outline p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-mono text-sm px-3 py-1 font-bold">05</div>
                <div>
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">school</span>
                  <h3 className="font-headline text-xl font-bold uppercase mb-2">Experience</h3>
                  <p className="font-body text-base text-on-surface-variant">Timeline of education, bootcamps, or relevant work history.</p>
                </div>
              </div>
              
              {/* 6. Contact (Spans 2) */}
              <div className="md:col-span-2 bg-surface border border-outline p-6 flex flex-col justify-between clip-facet-reverse relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-mono text-sm px-3 py-1 font-bold">06</div>
                <div>
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">mail</span>
                  <h3 className="font-headline text-xl font-bold uppercase mb-2">Contact</h3>
                  <p className="font-body text-base text-on-surface-variant">Links to LinkedIn, GitHub, and an email address.</p>
                </div>
              </div>
              
              {/* 7. Footer (Spans 2) */}
              <div className="md:col-span-2 bg-surface-container-highest border border-outline p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-mono text-sm px-3 py-1 font-bold">07</div>
                <div>
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">bottom_panel_close</span>
                  <h3 className="font-headline text-xl font-bold uppercase mb-2">Footer</h3>
                  <p className="font-body text-base text-on-surface-variant">Copyright info and quick links anchored at the bottom.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Step-by-Step Walkthrough */}
        <section className="py-24 px-6 bg-surface border-t border-outline">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-on-surface uppercase mb-12 text-center md:text-left">Step-by-Step Walkthrough</h2>
            
            <div className="relative border-l-2 border-outline ml-4 md:ml-6 space-y-12 pb-8">
              {/* Step 1 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-primary-container border-2 border-outline rotate-45"></div>
                <h3 className="font-headline text-xl font-bold uppercase mb-4 text-on-surface flex items-center gap-3">
                  <Github className="w-6 h-6 text-primary-container" /> Step 1: Create GitHub Repository
                </h3>
                <details className="group bg-surface-container-lowest border border-outline shadow-solid mb-4" open>
                  <summary className="font-headline text-sm font-bold uppercase p-4 cursor-pointer hover:bg-surface-container-high transition-colors flex justify-between items-center">
                    Instructions
                    <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 border-t border-outline font-body text-base text-on-surface-variant space-y-2">
                    <p>1. Log in to your GitHub account.</p>
                    <p>2. Click the '+' icon and select 'New repository'.</p>
                    <p>3. Name your repository (e.g., <code>portfolio-website</code>).</p>
                    <p>4. Keep it Public so we can review your code.</p>
                    <p>5. Do NOT initialize with a README (we'll push existing code).</p>
                  </div>
                </details>
                
                <div className="bg-secondary-fixed-dim border border-outline p-4 clip-facet flex items-start gap-4">
                  <Lightbulb className="w-5 h-5 text-on-secondary-fixed mt-1" />
                  <div>
                    <h4 className="font-headline text-sm font-bold uppercase mb-1">Pro Tip: Username</h4>
                    <p className="font-mono text-sm text-on-secondary-fixed-variant">Ensure your GitHub username is professional (ideally some variation of your real name). This is your digital resume.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-primary-container border-2 border-outline rotate-45"></div>
                <h3 className="font-headline text-xl font-bold uppercase mb-4 text-on-surface flex items-center gap-3">
                  <TerminalSquare className="w-6 h-6 text-primary-container" /> Step 2: Push Your Code
                </h3>
                <p className="font-body text-base text-on-surface-variant mb-4">Open your terminal in your project directory and run the following commands to push your local code to GitHub.</p>
                <div className="space-y-6">
                  {gitCommands.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <p className="font-body text-sm text-on-surface-variant font-medium">
                        {index + 1}. {item.desc}
                        {item.note && (
                          <span className="block mt-1 text-primary font-bold">{item.note}</span>
                        )}
                      </p>
                      <div className="bg-inverse-surface border border-outline rounded-none overflow-hidden shadow-solid-sm">
                        <div className="flex justify-between items-center bg-surface border-b border-outline px-4 py-2">
                          <span className="font-mono text-xs text-on-surface-variant">Terminal</span>
                          <button 
                            onClick={() => handleCopy(item.cmd, index)}
                            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-mono text-xs"
                          >
                            {copiedIndex === index ? (
                              <><Check className="w-3 h-3 text-primary" /> Copied</>
                            ) : (
                              <><Copy className="w-3 h-3" /> Copy</>
                            )}
                          </button>
                        </div>
                        <div className="p-3 overflow-x-auto">
                          <pre className="font-mono text-sm text-inverse-on-surface"><code>{item.cmd}</code></pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-primary-container border-2 border-outline rotate-45"></div>
                <h3 className="font-headline text-xl font-bold uppercase mb-4 text-on-surface flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary-container" /> Step 3: Host with Vercel
                </h3>
                <p className="font-body text-base text-on-surface-variant mb-6">Deploy your site globally in seconds using Vercel's free Hobby plan. Your approach depends on how you built your portfolio.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Vanilla JS Deployment */}
                  <div className="bg-surface border border-outline p-6 clip-facet">
                    <h4 className="font-headline text-lg font-bold uppercase mb-3 text-primary">Plain HTML/CSS/JS</h4>
                    <ul className="list-disc list-outside font-body text-sm text-on-surface-variant space-y-2 ml-4">
                      <li>Create an account at vercel.com with GitHub.</li>
                      <li>Click 'Add New Project' and import your repository.</li>
                      <li>Vercel will detect it's a static site. <strong>Leave all settings as default</strong>.</li>
                      <li>Click 'Deploy'. Your <code>index.html</code> will be served instantly.</li>
                    </ul>
                  </div>

                  {/* Framework Deployment */}
                  <div className="bg-surface-container-high border border-outline p-6 clip-facet-reverse">
                    <h4 className="font-headline text-lg font-bold uppercase mb-3 text-secondary">Framework (React/Vite/Next)</h4>
                    <ul className="list-disc list-outside font-body text-sm text-on-surface-variant space-y-2 ml-4">
                      <li>Import your repository into Vercel.</li>
                      <li>Vercel usually auto-detects your framework. If not, select it from the Framework Preset dropdown.</li>
                      <li>Ensure the <strong>Build Command</strong> (e.g., <code>npm run build</code>) and <strong>Output Directory</strong> (e.g., <code>dist</code> or <code>.next</code>) are correct.</li>
                      <li>Click 'Deploy' to build and host your app.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-tertiary-fixed-dim border border-outline p-4 flex items-start gap-4">
                  <Zap className="w-5 h-5 text-on-tertiary-fixed mt-1 shrink-0" />
                  <div>
                    <h4 className="font-headline text-sm font-bold uppercase mb-1">Auto-Redeploy</h4>
                    <p className="font-mono text-sm text-on-tertiary-fixed-variant">Once connected, every time you <code>git push</code> to your main branch, Vercel will automatically rebuild and update your live site!</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-primary-container border-2 border-outline rotate-45"></div>
                <h3 className="font-headline text-xl font-bold uppercase mb-4 text-on-surface flex items-center gap-3">
                  <LinkIcon className="w-6 h-6 text-primary-container" /> Step 4: Add Links &amp; Submit
                </h3>
                <p className="font-body text-base text-on-surface-variant">Update your portfolio's Contact or Footer section to include the link to your GitHub repository. Once everything is live and working, submit your Vercel URL to the assignment portal below.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Final Checklist & 6. FAQ Section */}
        <section className="py-24 px-6 bg-surface-container-lowest border-t border-outline">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Checklist */}
            <div>
              <h2 className="font-headline text-3xl font-bold text-on-surface uppercase mb-8">Final Checklist</h2>
              <div className="bg-surface border-l-8 border-primary-container border-t border-r border-b border-outline p-8 shadow-solid-lg clip-facet">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-surface-container-highest border border-outline flex items-center justify-center"></div>
                    <span className="font-headline text-lg font-bold uppercase">All 7 sections present</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-surface-container-highest border border-outline flex items-center justify-center"></div>
                    <span className="font-headline text-lg font-bold uppercase">Hand-written code</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-surface-container-highest border border-outline flex items-center justify-center"></div>
                    <span className="font-headline text-lg font-bold uppercase">3+ real projects</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-surface-container-highest border border-outline flex items-center justify-center"></div>
                    <span className="font-headline text-lg font-bold uppercase">Public repo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-surface-container-highest border border-outline flex items-center justify-center"></div>
                    <span className="font-headline text-lg font-bold uppercase">Live &amp; loading</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-surface-container-highest border border-outline flex items-center justify-center"></div>
                    <span className="font-headline text-lg font-bold uppercase">Links included</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* FAQ */}
            <div>
              <h2 className="font-headline text-3xl font-bold text-on-surface uppercase mb-8">Stuck? Common Fixes</h2>
              <div className="space-y-4">
                <details className="group bg-surface border border-outline shadow-solid">
                  <summary className="font-headline text-sm font-bold uppercase p-4 cursor-pointer hover:bg-surface-container-high transition-colors flex justify-between items-center">
                    "git command not found"
                    <Plus className="w-5 h-5 group-open:hidden" />
                    <Minus className="w-5 h-5 hidden group-open:block" />
                  </summary>
                  <div className="p-4 border-t border-outline font-body text-base text-on-surface-variant">
                    You need to install Git on your machine first. Download it from git-scm.com and restart your terminal.
                  </div>
                </details>
                <details className="group bg-surface border border-outline shadow-solid">
                  <summary className="font-headline text-sm font-bold uppercase p-4 cursor-pointer hover:bg-surface-container-high transition-colors flex justify-between items-center">
                    "remote origin already exists"
                    <Plus className="w-5 h-5 group-open:hidden" />
                    <Minus className="w-5 h-5 hidden group-open:block" />
                  </summary>
                  <div className="p-4 border-t border-outline font-body text-base text-on-surface-variant">
                    Run <code>git remote remove origin</code>, then try adding the new remote URL again.
                  </div>
                </details>
                <details className="group bg-surface border border-outline shadow-solid">
                  <summary className="font-headline text-sm font-bold uppercase p-4 cursor-pointer hover:bg-surface-container-high transition-colors flex justify-between items-center">
                    Authentication / Token Rejection
                    <Plus className="w-5 h-5 group-open:hidden" />
                    <Minus className="w-5 h-5 hidden group-open:block" />
                  </summary>
                  <div className="p-4 border-t border-outline font-body text-base text-on-surface-variant">
                    GitHub requires a Personal Access Token (PAT) instead of a password for terminal pushes. Generate one in GitHub Settings &gt; Developer Settings.
                  </div>
                </details>
                <details className="group bg-surface border border-outline shadow-solid">
                  <summary className="font-headline text-sm font-bold uppercase p-4 cursor-pointer hover:bg-surface-container-high transition-colors flex justify-between items-center">
                    Blank Vercel Deploy
                    <Plus className="w-5 h-5 group-open:hidden" />
                    <Minus className="w-5 h-5 hidden group-open:block" />
                  </summary>
                  <div className="p-4 border-t border-outline font-body text-base text-on-surface-variant">
                    Ensure your main HTML file is named exactly <code>index.html</code> and is in the root directory of your repository, not inside a subfolder.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Closing CTA */}
        <section className="relative py-24 px-6 bg-primary-container text-on-primary-container text-center border-t border-outline overflow-hidden" id="submit">
          
          {/* Professional Coming Soon Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-black/5">
            <div className="bg-surface/95 backdrop-blur-xl border border-outline px-12 py-8 rounded-3xl shadow-2xl flex flex-col items-center gap-3 transform transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-brand-orange text-2xl">update</span>
              </div>
              <span className="font-headline text-3xl font-bold text-on-surface uppercase tracking-widest">
                Coming Soon
              </span>
              <p className="font-body text-base text-on-surface-variant max-w-xs">
                The portfolio submission portal will open soon. Get your projects ready!
              </p>
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto select-none pointer-events-none">
            <h2 className="font-display text-white text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight uppercase mb-8">
              Ready to submit your portfolio?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-surface text-primary-container font-headline font-bold uppercase tracking-wider px-8 py-4 border border-outline opacity-70 w-full sm:w-auto" disabled>
                Submit Your Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto full-width bottom-0">
        <div className="font-headline text-xl font-bold text-on-surface uppercase tracking-widest">
          INFOBEE
        </div>
        <div className="font-body text-sm text-on-surface-variant text-center md:text-right font-mono">
          © {new Date().getFullYear()} Department of IT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
