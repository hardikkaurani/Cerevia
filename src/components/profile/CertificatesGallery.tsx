'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Award, ShieldCheck, Download, Share2, Eye, Lock, CheckCircle2, Search, Filter } from 'lucide-react';
import { CertificateViewerModal, CertificateItem } from './CertificateViewerModal';

export function CertificatesGallery() {
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'specialization' | 'locked'>('all');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const certificateList: CertificateItem[] = [
    {
      id: 'cert-1',
      title: 'Full-Stack Distributed Engineering Specialization',
      category: 'Software Engineering',
      completionDate: 'June 18, 2026',
      credentialId: 'CER-8942-FS',
      grade: '98.4%',
      instructor: 'Elena Rostova, Principal Architect',
      skillsCovered: ['Next.js 15 App Router', 'Prisma ORM', 'PostgreSQL Query Tuning', 'Redis Caching Layer'],
      thumbnail: '/images/profile/certificates/fullstack-specialization.webp',
      status: 'unlocked',
      type: 'specialization',
    },
    {
      id: 'cert-2',
      title: 'Artificial Intelligence & LLM Systems Specialization',
      category: 'AI & Data Science',
      completionDate: 'May 24, 2026',
      credentialId: 'CER-7721-AI',
      grade: '96.2%',
      instructor: 'Dr. Alan Vance, Head of AI Research',
      skillsCovered: ['PyTorch Tensor Operations', 'RAG Vector Search', 'Prompt Engineering', 'LangChain Agents'],
      thumbnail: '/images/profile/certificates/ai-engineering.webp',
      status: 'unlocked',
      type: 'specialization',
    },
    {
      id: 'cert-3',
      title: 'Distributed Systems & Microservices Architecture',
      category: 'Cloud Infrastructure',
      completionDate: 'April 10, 2026',
      credentialId: 'CER-6034-DS',
      grade: '95.0%',
      instructor: 'Vikram Mehta, Cloud Staff Engineer',
      skillsCovered: ['Docker Containers', 'Event-Driven RabbitMQ', 'Consistent Hashing', 'Load Balancing'],
      thumbnail: '/images/profile/certificates/system-design.webp',
      status: 'unlocked',
      type: 'course',
    },
    {
      id: 'cert-4',
      title: 'Quantum & Edge Computing Masterclass',
      category: 'Emerging Tech',
      completionDate: 'Expected August 2026',
      credentialId: 'CER-LOCKED-04',
      grade: 'In Progress (82%)',
      instructor: 'Prof. Sofia Lin',
      skillsCovered: ['Qiskit Quantum Circuit Design', 'Edge AI Acceleration', 'Post-Quantum Encryption'],
      thumbnail: '/images/profile/certificates/fullstack-specialization.webp',
      status: 'locked',
      type: 'course',
    },
  ];

  const filteredCerts = certificateList.filter((cert) => {
    if (activeTab === 'unlocked') return cert.status === 'unlocked';
    if (activeTab === 'specialization') return cert.type === 'specialization';
    if (activeTab === 'locked') return cert.status === 'locked';
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Verified Certificates & Specializations</h2>
          <p className="text-xs text-slate-500 font-medium">Industry-recognized credentials awarded upon passing Cerevia proctored evaluations.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'all' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({certificateList.length})
          </button>
          <button
            onClick={() => setActiveTab('unlocked')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'unlocked' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Unlocked (3)
          </button>
          <button
            onClick={() => setActiveTab('specialization')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'specialization' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Specializations (2)
          </button>
          <button
            onClick={() => setActiveTab('locked')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'locked' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Locked (1)
          </button>
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCerts.map((cert) => {
          const isUnlocked = cert.status === 'unlocked';
          return (
            <div
              key={cert.id}
              className={`rounded-3xl border bg-white p-6 space-y-4 shadow-2xs transition-all duration-300 relative group overflow-hidden ${
                isUnlocked ? 'border-slate-200 hover:border-blue-300 hover:shadow-md' : 'border-slate-200/80 bg-slate-50/50 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                      {cert.type === 'specialization' ? 'Specialization Honors' : 'Verified Course'}
                    </span>
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700">
                        <Lock className="h-3.5 w-3.5 text-amber-600" /> In Progress
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {cert.title}
                  </h3>
                </div>

                <div className="relative h-16 w-24 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden shrink-0 shadow-2xs">
                  <Image src={cert.thumbnail} alt={cert.title} fill className="object-cover" />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center">
                      <Lock className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skillsCovered.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Credential Details */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div>
                  <p className="font-bold text-slate-900">{cert.instructor}</p>
                  <p className="text-[11px]">{cert.completionDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[11px] font-bold text-slate-700">ID: {cert.credentialId}</p>
                  <p className="text-[11px] font-semibold text-emerald-700">{cert.grade}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-1">
                {isUnlocked ? (
                  <>
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Credential</span>
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold cursor-not-allowed flex items-center gap-1.5"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Locked (Complete Capstone)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <CertificateViewerModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
}
