'use client';

import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  X,
  Terminal,
  Zap,
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { PostContent, SocialPlatformId } from '@/types';

interface ApiCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: PostContent;
  selectedPlatforms: SocialPlatformId[];
}

export const ApiCodeModal: React.FC<ApiCodeModalProps> = ({
  isOpen,
  onClose,
  content,
  selectedPlatforms,
}) => {
  const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python' | 'php'>('curl');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const payload = {
    title: content.title || 'Yeni Gönderi',
    caption: content.caption || '',
    platforms: selectedPlatforms.length > 0 ? selectedPlatforms : ['twitter', 'instagram', 'facebook'],
    mediaUrls: content.media.map((m) => m.url),
    scheduleDate: null,
    publishImmediately: true,
  };

  const jsonPayload = JSON.stringify(payload, null, 2);

  const snippets = {
    curl: `curl -X POST https://api.omnipost.io/v1/publish \\
  -H "Authorization: Bearer omni_live_sec_8949201948201" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(payload)}'`,

    node: `// Node.js (v18+) / Next.js / TypeScript
const response = await fetch('https://api.omnipost.io/v1/publish', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer omni_live_sec_8949201948201',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${jsonPayload})
});

const result = await response.json();
console.log('OmniPost API Yayını:', result.data.broadcastId);`,

    python: `# Python 3.9+ (requests)
import requests

url = "https://api.omnipost.io/v1/publish"
headers = {
    "Authorization": "Bearer omni_live_sec_8949201948201",
    "Content-Type": "application/json"
}
payload = ${jsonPayload.replace(/true/g, 'True').replace(/false/g, 'False').replace(/null/g, 'None')}

response = requests.post(url, json=payload, headers=headers)
print("OmniPost API Response:", response.json())`,

    php: `<?php
// PHP cURL
$ch = curl_init('https://api.omnipost.io/v1/publish');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer omni_live_sec_8949201948201',
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => '${JSON.stringify(payload)}'
]);

$response = curl_exec($ch);
curl_close($ch);
echo $response;
?>`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-backdrop">
      <div className="bg-slate-900 text-white rounded-3xl border border-slate-700 shadow-2xl max-w-2xl w-full p-6 animate-scale-in relative space-y-4 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/3 w-64 h-24 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-white">OmniPost Geliştirici API Kodu</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  REST v1.4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Bu gönderiyi kodunuzdan veya CI/CD boru hatlarınızdan programatik olarak yayınlayın.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Tabs & Copy Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 bg-slate-800/80 p-1 rounded-xl text-xs font-mono">
            {(['curl', 'node', 'python', 'php'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLang === lang
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* Code Snippet Box */}
        <div className="relative rounded-2xl bg-[#0b1120] border border-slate-800 p-4 font-mono text-xs overflow-x-auto max-h-72 leading-relaxed text-blue-200 shadow-inner">
          <pre className="whitespace-pre">
            <code>{snippets[activeLang]}</code>
          </pre>
        </div>

        {/* Footer info: Rate limits & Auth note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800 gap-2">
          <div className="flex items-center space-x-2 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Rate Limit: <strong>200 req/min</strong> • TLS 1.3 Şifreli</span>
          </div>

          <a
            href="https://github.com/omnipost"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 text-[11px] font-bold"
          >
            <span>Resmi API Dokümantasyonu</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
