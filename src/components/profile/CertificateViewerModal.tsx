'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, Download, Printer, Share2, ShieldCheck, Check, Award, ExternalLink, X } from 'lucide-react';

export interface CertificateItem {
  id: string;
  title: string;
  category: string;
  completionDate: string;
  credentialId: string;
  grade: string;
  instructor: string;
  skillsCovered: string[];
  thumbnail: string;
  status: 'unlocked' | 'locked';
  type: 'specialization' | 'course';
}

interface CertificateViewerModalProps {
  certificate: CertificateItem;
  onClose: () => void;
}

export function CertificateViewerModal({ certificate, onClose }: CertificateViewerModalProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copied, setCopied] = useState(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 85));

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`https://cerevia.edu/verify/${certificate.credentialId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificate.thumbnail;
    link.download = `Cerevia-Certificate-${certificate.credentialId}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-4xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                Verified Credential #{certificate.credentialId}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 line-clamp-1">{certificate.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 85}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-slate-600 px-1">{zoomLevel}%</span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1" />

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              title="Print Certificate"
            >
              <Printer className="h-4 w-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              title="Share Link"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Certificate Render Canvas */}
        <div className="p-6 sm:p-10 bg-slate-100/70 overflow-auto flex justify-center max-h-[70vh]">
          <div
            className="transition-transform duration-300 ease-out origin-top"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            <div className="relative w-[720px] h-[500px] rounded-2xl bg-white border-8 border-slate-900 p-8 shadow-xl flex flex-col justify-between select-none">
              
              {/* Certificate Decorative Border */}
              <div className="absolute inset-3 border-2 border-amber-400/60 rounded-lg pointer-events-none" />

              {/* Certificate Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-widest text-slate-900 uppercase">Cerevia Academy</span>
                    <ShieldCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Board of Academic Standards & Verified Engineering Honors
                  </p>
                </div>
                <div className="relative h-16 w-16">
                  <Image src="/images/coursera/coursera-badge.webp" alt="Gold Badge" fill className="object-contain" />
                </div>
              </div>

              {/* Certificate Body */}
              <div className="text-center space-y-3 my-auto">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">This official document certifies that</p>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight underline decoration-amber-400 decoration-2 underline-offset-4">
                  Hardik Kaurani
                </h2>
                <p className="text-xs font-medium text-slate-600 max-w-lg mx-auto">
                  has successfully passed the comprehensive evaluations and practical capstones for the specialization:
                </p>
                <h3 className="text-xl font-black text-blue-700">{certificate.title}</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  <span>Grade Achieved: {certificate.grade}</span>
                  <span>•</span>
                  <span>Completed on {certificate.completionDate}</span>
                </div>
              </div>

              {/* Certificate Footer */}
              <div className="flex items-end justify-between border-t border-slate-200 pt-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900">Dr. Marcus Vance</p>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase">Chair, Academic Board</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative h-12 w-12 mb-1">
                    <Image src="/images/coursera/certificate-gold.webp" alt="Gold Seal" fill className="object-contain" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-400">ID: {certificate.credentialId}</span>
                </div>

                <div className="space-y-1 text-right">
                  <p className="text-xs font-bold text-slate-900">{certificate.instructor}</p>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase">Lead Systems Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Verification Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="font-semibold">Authenticity Cryptographically Verified on Cerevia Blockchain Registry</span>
          </div>
          <a
            href={`https://cerevia.edu/verify/${certificate.credentialId}`}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Public Verification Portal <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
