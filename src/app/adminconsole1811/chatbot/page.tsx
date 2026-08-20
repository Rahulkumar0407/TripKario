'use client';

import React, { useState } from 'react';
import { initialChatbotNodes, SeedChatbotNode } from '@/lib/admin/seedData';
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Check,
  X,
} from 'lucide-react';

export default function AdminChatbotPage() {
  const [nodes, setNodes] = useState<SeedChatbotNode[]>(initialChatbotNodes);
  const [editingNode, setEditingNode] = useState<SeedChatbotNode | null>(null);

  const handleAddQuestion = () => {
    const newNode: SeedChatbotNode = {
      nodeKey: `step_${Date.now()}`,
      message: 'When are you planning to travel?',
      options: ['Within 2 weeks', 'Next month', 'Later this year', 'Flexible'],
      nextAction: 'whatsapp_handoff',
    };
    setNodes([...nodes, newNode]);
    setEditingNode(newNode);
  };

  const handleSave = (saved: SeedChatbotNode) => {
    setNodes((prev) => prev.map((n) => (n.nodeKey === saved.nodeKey ? saved : n)));
    setEditingNode(null);
  };

  const handleDelete = (key: string) => {
    setNodes((prev) => prev.filter((n) => n.nodeKey !== key));
    if (editingNode?.nodeKey === key) setEditingNode(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            WEBSITE TRAVEL CONCIERGE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Chatbot Conversation Builder
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Customize the friendly travel assistant questions, option chips, and WhatsApp handoff text.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddQuestion}
          className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Question Step</span>
        </button>
      </div>

      {/* Visual Conversation Flow (#22) */}
      <div className="max-w-3xl space-y-6">
        {nodes.map((node, idx) => (
          <div
            key={node.nodeKey}
            className="p-6 rounded-3xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] shadow-sm relative space-y-4"
          >
            {/* Step header */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#174E48]/10 text-[#174E48] dark:text-[#D4A467] text-xs font-mono font-bold">
                Step 0{idx + 1}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingNode(node)}
                  className="px-3 py-1 rounded-xl bg-[#FAF7F2] dark:bg-white/5 hover:bg-[#C85D3A] hover:text-white text-xs font-mono font-bold uppercase transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(node.nodeKey)}
                  className="p-1 rounded-xl text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C85D3A]/15 text-[#C85D3A] flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] flex-1">
                <p className="text-sm font-medium text-[#171512] dark:text-white">
                  &ldquo;{node.message}&rdquo;
                </p>
              </div>
            </div>

            {/* Quick reply options */}
            <div className="pl-11 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-[#8C8479] font-bold block">
                Visitor Selects:
              </span>
              <div className="flex flex-wrap gap-2">
                {node.options.map((opt, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono text-[#171512] dark:text-white"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Connecting Step Arrow */}
            {idx < nodes.length - 1 && (
              <div className="flex justify-center -mb-8 pt-2">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] dark:bg-white/5 border border-[#E5DFD5] dark:border-[#262420] flex items-center justify-center text-[#8C8479]">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Drawer */}
      {editingNode && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60" onClick={() => setEditingNode(null)} />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#14120F] h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5] dark:border-[#262420]">
                <h2 className="text-base font-bold text-[#171512] dark:text-white">Edit Question Step</h2>
                <button onClick={() => setEditingNode(null)}><X className="w-5 h-5" /></button>
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Bot Question Prompt</label>
                <textarea
                  rows={3}
                  value={editingNode.message}
                  onChange={(e) => setEditingNode({ ...editingNode, message: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Quick Reply Choices (One per line)</label>
                <textarea
                  rows={4}
                  value={editingNode.options.join('\n')}
                  onChange={(e) =>
                    setEditingNode({ ...editingNode, options: e.target.value.split('\n') })
                  }
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262420] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleSave(editingNode)}
                className="px-5 py-2 rounded-xl bg-[#174E48] text-white text-xs font-mono font-bold uppercase"
              >
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
