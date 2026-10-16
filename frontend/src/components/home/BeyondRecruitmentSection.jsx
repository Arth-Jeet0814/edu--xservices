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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0f2fe] border border-[#cfe6f5] text-[#082f49] text-xs sm:text-sm font-semibold max-w-3xl leading-relaxed shadow-xs">
          <Shield className="w-4 h-4 text-[#0369a1] shrink-0" />
          <span>{beyondRecruitment.badge}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Institutional Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0369a1]">
              {beyondRecruitment.title}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082f49] tracking-tight leading-tight">
              {beyondRecruitment.subtitle}
            </h2>
          </div>

          <p className="text-lg text-[#082f49]/90 leading-relaxed font-normal">
            {beyondRecruitment.lead}
          </p>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#e0f2fe]/50 border border-[#cfe6f5] shadow-xs">
            <p className="text-[#082f49] font-semibold italic text-base leading-relaxed">
              "{beyondRecruitment.statement}"
            </p>
          </div>

          <div className="pt-2 space-y-4">
            <h3 className="text-base font-bold text-[#082f49] tracking-wide flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#0369a1]" />
              <span>{beyondRecruitment.consoleHeading}</span>
            </h3>

            <div className="space-y-3">
              {beyondRecruitment.consoleItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#cfe6f5] shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#0369a1] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-[#082f49] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#4b6b82] pt-2 font-medium">
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
          <div className="absolute -inset-3 bg-gradient-to-tr from-[#0369a1]/15 via-[#0ea5e9]/10 to-[#e0f2fe]/40 rounded-3xl blur-2xl -z-10 opacity-75 animate-pulse-glow" aria-hidden="true" />

          <div className="bg-white text-[#082f49] rounded-2xl p-5 sm:p-6 shadow-xl border border-[#cfe6f5] relative animate-float">
            {/* Console Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#cfe6f5] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-400 transition-transform hover:scale-125" />
                <div className="w-3 h-3 rounded-full bg-amber-400 transition-transform hover:scale-125" />
                <div className="w-3 h-3 rounded-full bg-emerald-400 transition-transform hover:scale-125" />
                <span className="text-xs text-[#4b6b82] font-mono ml-2">console.institution.internal</span>
              </div>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[#e0f2fe] text-[#0369a1] border border-[#cfe6f5]">
                Encrypted · Partner School
              </span>
            </div>

            {/* Console Overview Cards */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-xl bg-[#f0f9ff] border border-[#cfe6f5] hover:border-[#0ea5e9] transition-colors">
                <div className="flex items-center justify-between text-[#4b6b82] text-xs mb-1">
                  <span>Outbound Cohort</span>
                  <Users className="w-3.5 h-3.5 text-[#0369a1]" />
                </div>
                <div className="text-xl font-bold text-[#082f49]">48 Students</div>
                <div className="text-[11px] text-[#0369a1] mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0369a1]"></span> 100% Milestone Tracked
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f0f9ff] border border-[#cfe6f5] hover:border-[#0ea5e9] transition-colors">
                <div className="flex items-center justify-between text-[#4b6b82] text-xs mb-1">
                  <span>Global Corridors</span>
                  <Globe className="w-3.5 h-3.5 text-[#0369a1]" />
                </div>
                <div className="text-xl font-bold text-[#082f49]">12 Countries</div>
                <div className="text-[11px] text-[#0369a1] mt-1 font-medium">Tier-1 Direct Lines</div>
              </div>
            </div>

            {/* Live Pipeline Feed */}
            <div className="space-y-3 mb-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#4b6b82] flex items-center justify-between">
                <span>Live Student Trajectories</span>
                <span className="flex items-center gap-1.5 text-[#0369a1] text-[10px] font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#0369a1] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0369a1]"></span>
                  </span>
                  Synchronized
                </span>
              </div>

              {/* Pipeline item 1 */}
              <div className="p-3 rounded-lg bg-[#f0f9ff] border border-[#cfe6f5] hover:border-[#0ea5e9] hover:bg-white hover:translate-x-1 transition-all duration-200 flex items-center justify-between text-xs cursor-pointer group">
                <div>
                  <div className="font-semibold text-[#082f49] group-hover:text-[#0369a1] transition-colors">Amara K. · Terminale S</div>
                  <div className="text-[#4b6b82] text-[11px]">McGill Univ. / B.Sc. Computer Engineering</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#e0f2fe] text-[#075985] border border-[#cfe6f5] shrink-0 font-medium">
                  Offer Received
                </span>
              </div>

              {/* Pipeline item 2 */}
              <div className="p-3 rounded-lg bg-[#f0f9ff] border border-[#cfe6f5] hover:border-[#0ea5e9] hover:bg-white hover:translate-x-1 transition-all duration-200 flex items-center justify-between text-xs cursor-pointer group">
                <div>
                  <div className="font-semibold text-[#082f49] group-hover:text-[#0369a1] transition-colors">Kwame O. · Grade 12 IB</div>
                  <div className="text-[#4b6b82] text-[11px]">Univ. of Edinburgh / Economics</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#e0f2fe] text-[#075985] border border-[#cfe6f5] shrink-0 font-medium">
                  Interview Stage
                </span>
              </div>

              {/* Pipeline item 3 */}
              <div className="p-3 rounded-lg bg-[#f0f9ff] border border-[#cfe6f5] hover:border-[#0ea5e9] hover:bg-white hover:translate-x-1 transition-all duration-200 flex items-center justify-between text-xs cursor-pointer group">
                <div>
                  <div className="font-semibold text-[#082f49] group-hover:text-[#0369a1] transition-colors">Fatou D. · Terminale C</div>
                  <div className="text-[#4b6b82] text-[11px]">TU Munich / Mechanical & Robotics</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#e0f2fe] text-[#075985] border border-[#cfe6f5] shrink-0 font-medium">
                  Visa & Arrival Support
                </span>
              </div>
            </div>

            {/* Console Footer / Security Seal */}
            <div className="pt-3 border-t border-[#cfe6f5] flex items-center justify-between text-[11px] text-[#4b6b82]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#0369a1]" /> Co-branded Institutional Governance
              </span>
              <span className="text-[#0369a1] font-medium">Full Data Ownership</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
