import React from 'react';
import { CheckCircle2, Shield, Eye, ArrowRight, Users, Globe } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Button from '../common/Button';

export default function BeyondRecruitmentSection() {
  const { beyondRecruitment } = homeContent;

  return (
    <Section
      id="beyond-recruitment"
      background="light"
      align="left"
    >
      {/* Top Badge */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/30 text-foreground text-xs sm:text-sm font-semibold max-w-3xl leading-relaxed shadow-xs">
          <Shield className="w-4 h-4 text-accent shrink-0" />
          <span>{beyondRecruitment.badge}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Institutional Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {beyondRecruitment.title}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {beyondRecruitment.subtitle}
            </h2>
          </div>

          <p className="text-lg text-foreground/90 leading-relaxed font-normal">
            {beyondRecruitment.lead}
          </p>

          <div className="p-5 sm:p-6 rounded-2xl bg-card/95 border border-border/80 shadow-soft ring-1 ring-black/[0.02]">
            <p className="text-foreground font-semibold italic text-base leading-relaxed">
              "{beyondRecruitment.statement}"
            </p>
          </div>

          <div className="pt-2 space-y-4">
            <h3 className="text-base font-bold text-foreground tracking-wide flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent" />
              <span>{beyondRecruitment.consoleHeading}</span>
            </h3>

            <div className="space-y-3">
              {beyondRecruitment.consoleItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-card/80 p-3.5 rounded-xl border border-border/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground pt-2 font-medium">
            {beyondRecruitment.invitation}
          </p>

          <div className="pt-2">
            <Button
              to="/book-a-demo"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              className="w-full sm:w-auto shadow-md"
            >
              {beyondRecruitment.buttonText}
            </Button>
          </div>
        </div>

        {/* Right Column: Private Institutional Console Mockup (5 cols) */}
        <div className="lg:col-span-5 relative">
          {/* Ambient Glowing Backdrop */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-primary/30 via-accent/15 to-navy-800/40 rounded-3xl blur-2xl -z-10 opacity-75 animate-pulse-glow" aria-hidden="true" />

          <div className="bg-navy-950 text-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-navy-800 relative animate-float">
            {/* Console Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 transition-transform hover:scale-125" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 transition-transform hover:scale-125" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 transition-transform hover:scale-125" />
                <span className="text-xs text-slate-400 font-mono ml-2">console.institution.internal</span>
              </div>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-gold-500/20 text-gold-400 border border-gold-500/30">
                Encrypted · Partner School
              </span>
            </div>

            {/* Console Overview Cards */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-xl bg-navy-900/90 border border-navy-800 hover:border-gold-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>Outbound Cohort</span>
                  <Users className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div className="text-xl font-bold text-white">48 Students</div>
                <div className="text-[11px] text-green-400 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> 100% Milestone Tracked
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-navy-900/90 border border-navy-800 hover:border-gold-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>Global Corridors</span>
                  <Globe className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div className="text-xl font-bold text-white">12 Countries</div>
                <div className="text-[11px] text-gold-400 mt-1">Tier-1 Direct Lines</div>
              </div>
            </div>

            {/* Live Pipeline Feed */}
            <div className="space-y-3 mb-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Live Student Trajectories</span>
                <span className="flex items-center gap-1.5 text-green-400 text-[10px] font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Synchronized
                </span>
              </div>

              {/* Pipeline item 1 */}
              <div className="p-3 rounded-lg bg-navy-900/70 border border-navy-800 hover:border-gold-500/40 hover:bg-navy-900 hover:translate-x-1 transition-all duration-200 flex items-center justify-between text-xs cursor-pointer group">
                <div>
                  <div className="font-semibold text-white group-hover:text-gold-300 transition-colors">Amara K. · Terminale S</div>
                  <div className="text-slate-400 text-[11px]">McGill Univ. / B.Sc. Computer Engineering</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-green-950 text-green-300 border border-green-800 shrink-0">
                  Offer Received
                </span>
              </div>

              {/* Pipeline item 2 */}
              <div className="p-3 rounded-lg bg-navy-900/70 border border-navy-800 hover:border-gold-500/40 hover:bg-navy-900 hover:translate-x-1 transition-all duration-200 flex items-center justify-between text-xs cursor-pointer group">
                <div>
                  <div className="font-semibold text-white group-hover:text-gold-300 transition-colors">Kwame O. · Grade 12 IB</div>
                  <div className="text-slate-400 text-[11px]">Univ. of Edinburgh / Economics</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-950 text-blue-300 border border-blue-800 shrink-0">
                  Interview Stage
                </span>
              </div>

              {/* Pipeline item 3 */}
              <div className="p-3 rounded-lg bg-navy-900/70 border border-navy-800 hover:border-gold-500/40 hover:bg-navy-900 hover:translate-x-1 transition-all duration-200 flex items-center justify-between text-xs cursor-pointer group">
                <div>
                  <div className="font-semibold text-white group-hover:text-gold-300 transition-colors">Fatou D. · Terminale C</div>
                  <div className="text-slate-400 text-[11px]">TU Munich / Mechanical & Robotics</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-gold-950 text-gold-300 border border-gold-800 shrink-0">
                  Visa & Arrival Support
                </span>
              </div>
            </div>

            {/* Console Footer / Security Seal */}
            <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold-400" /> Co-branded Institutional Governance
              </span>
              <span className="text-gold-400 font-medium">Full Data Ownership</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
