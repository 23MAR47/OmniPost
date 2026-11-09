'use client';

import React, { useState, useEffect } from 'react';
import {
  ApprovalPost,
  ApprovalStatus,
  UserRole,
  AuditLogEntry,
} from '@/types/approvals';
import { WORKSPACES } from '@/lib/approvalsService';
import { PlatformIcon } from './PlatformIcon';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
  Send,
  MessageSquare,
  History,
  Eye,
  X,
  FileCheck2,
} from 'lucide-react';

export const ApprovalEngineView: React.FC = () => {
  const [posts, setPosts] = useState<ApprovalPost[]>([]);
  const [currentRole, setCurrentRole] = useState<UserRole>('manager');
  const [currentActor, setCurrentActor] = useState('Emre (Pazarlama Müdürü)');
  const [selectedWorkspace, setSelectedWorkspace] = useState('ws-1');
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [activeAuditPost, setActiveAuditPost] = useState<ApprovalPost | null>(null);
  const [activeRevisionPost, setActiveRevisionPost] = useState<ApprovalPost | null>(null);
  const [revisionNote, setRevisionNote] = useState('');

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/approvals`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedWorkspace]);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'editor') setCurrentActor('Zeynep (İçerik Editörü)');
    else if (role === 'manager') setCurrentActor('Emre (Pazarlama Müdürü)');
    else setCurrentActor('Murat Bey (Müşteri Yetkilisi)');
  };

  const handleUpdateStatus = async (
    postId: string,
    newStatus: ApprovalStatus,
    note?: string
  ) => {
    try {
      const res = await fetch('/api/approvals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          newStatus,
          actorName: currentActor,
          actorRole: currentRole,
          note,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.map((p) => (p.id === postId ? data.data : p)));
        setActiveRevisionPost(null);
        setRevisionNote('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const columns: { status: ApprovalStatus; label: string; color: string }[] = [
    { status: 'draft', label: 'Taslaklar', color: 'border-slate-300' },
    { status: 'pending_review', label: 'İnceleme Bekliyor', color: 'border-amber-400' },
    { status: 'needs_changes', label: 'Revizyon Gerekli', color: 'border-rose-400' },
    { status: 'approved', label: 'Onaylandı', color: 'border-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Governance Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900">
                  Çok Kademeli Ekip & Müşteri Onay Motoru
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  Hootsuite Governance
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Editör, Yönetici ve Müşteri onay mekanizması, revizyon yorumları ve geriye dönük denetim izi (Audit Log).
              </p>
            </div>
          </div>

          {/* Role Switcher Simulator */}
          <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <span className="text-[11px] font-bold text-slate-500 px-2">Rol Simülatörü:</span>
            <button
              onClick={() => handleRoleChange('editor')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${currentRole === 'editor'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              ✍️ Editör
            </button>
            <button
              onClick={() => handleRoleChange('manager')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${currentRole === 'manager'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              🛡️ Yönetici
            </button>
            <button
              onClick={() => handleRoleChange('client')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${currentRole === 'client'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              👑 Müşteri
            </button>
          </div>
        </div>

        {/* Current Active Persona Reminder */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <span>
              Şu anki Aktif Kullanıcı: <strong>{currentActor}</strong> (Yetki Düzeyi: <span className="uppercase font-mono">{currentRole}</span>)
            </span>
          </div>

          <span className="text-[11px]">
            {currentRole === 'client'
              ? 'Yetki: İçeriği doğrudan onaylayabilir veya revizyona gönderebilir.'
              : currentRole === 'manager'
                ? 'Yetki: Editör taslaklarını onaylayabilir, müşteriye sunabilir.'
                : 'Yetki: Taslak oluşturabilir ve yönetici incelemesine sunabilir.'}
          </span>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colPosts = posts.filter((p) => p.status === col.status);
          return (
            <div
              key={col.status}
              className={`bg-slate-50/80 rounded-2xl border-t-4 border border-slate-200 p-3.5 space-y-3 ${col.color}`}
            >
              <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-xs text-slate-800">{col.label}</h3>
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                  {colPosts.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {colPosts.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-[11px] border border-dashed border-slate-200 rounded-xl">
                    Bu aşamada içerik yok.
                  </div>
                ) : (
                  colPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2.5 hover:shadow-sm transition-all"
                    >
                      {/* Platforms & Target Date */}
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center space-x-1">
                          {post.platforms.map((p) => (
                            <div
                              key={p}
                              className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center p-0.5"
                            >
                              <PlatformIcon platform={p} className="w-2.5 h-2.5" />
                            </div>
                          ))}
                        </div>
                        <span className="text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(post.targetDate).toLocaleDateString('tr-TR')}</span>
                        </span>
                      </div>

                      {/* Title & Preview */}
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {post.content.caption}
                      </p>

                      {/* Submitter */}
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                        <span>Hazırlayan: <strong>{post.submittedBy}</strong></span>
                        {post.comments.length > 0 && (
                          <span className="flex items-center space-x-1 text-indigo-600 font-bold">
                            <MessageSquare className="w-3 h-3" />
                            <span>{post.comments.length}</span>
                          </span>
                        )}
                      </div>

                      {/* Interactive Action Buttons based on Role */}
                      <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-slate-100">
                        {/* Audit Trail Button */}
                        <button
                          onClick={() => setActiveAuditPost(post)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 text-[11px] flex items-center space-x-1"
                          title="Denetim İzi (Audit Log)"
                        >
                          <History className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center space-x-1.5">
                          {/* Request Changes Button (Manager or Client) */}
                          {(currentRole === 'manager' || currentRole === 'client') &&
                            post.status !== 'needs_changes' &&
                            post.status !== 'approved' && (
                              <button
                                onClick={() => setActiveRevisionPost(post)}
                                className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10px] border border-rose-200"
                              >
                                Revizyon İste
                              </button>
                            )}

                          {/* Submit / Approve Button */}
                          {currentRole === 'editor' && post.status === 'draft' && (
                            <button
                              onClick={() => handleUpdateStatus(post.id, 'pending_review')}
                              className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px]"
                            >
                              İncelemeye Gönder
                            </button>
                          )}

                          {currentRole === 'editor' && post.status === 'needs_changes' && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(post.id, 'pending_review', 'Revizyonlar uygulandı.')
                              }
                              className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px]"
                            >
                              Tekrar Gönder
                            </button>
                          )}

                          {(currentRole === 'manager' || currentRole === 'client') &&
                            post.status !== 'approved' && (
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    post.id,
                                    'approved',
                                    `${currentActor} tarafından onaylandı.`
                                  )
                                }
                                className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] shadow-xs flex items-center space-x-1"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Onayla</span>
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Audit Log Modal */}
      {activeAuditPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <History className="w-4 h-4 text-indigo-600" />
                <span>Denetim Geçmişi (Audit Trail): {activeAuditPost.title}</span>
              </h3>
              <button
                onClick={() => setActiveAuditPost(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto text-xs">
              {activeAuditPost.auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">{log.actorName}</span>
                    <span className="text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600">{log.action}</p>
                  {log.note && (
                    <p className="p-2 rounded bg-white border border-slate-200 text-slate-700 text-[11px] italic">
                      &quot;{log.note}&quot;
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveAuditPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revision Request Modal */}
      {activeRevisionPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Revizyon / Değişiklik Talebi</span>
              </h3>
              <button
                onClick={() => setActiveRevisionPost(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                <strong>{activeRevisionPost.title}</strong> başlıklı içerik için editöre iletilecek düzeltme notunuzu yazın:
              </p>
              <textarea
                value={revisionNote}
                onChange={(e) => setRevisionNote(e.target.value)}
                rows={3}
                placeholder="Örn: Görselin sağ altına kampanya tarihini ve yasal izin metnini ekleyelim..."
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setActiveRevisionPost(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
              >
                İptal
              </button>
              <button
                onClick={() =>
                  handleUpdateStatus(
                    activeRevisionPost.id,
                    'needs_changes',
                    revisionNote
                  )
                }
                disabled={!revisionNote.trim()}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm"
              >
                Revizyon Notunu İlet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
