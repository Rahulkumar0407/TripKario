'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { SeedPastVisit } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle2,
  Calendar,
  MapPin,
  ImageIcon,
  Sparkles,
  Camera,
  Layers,
  ZoomIn,
  MoveHorizontal,
} from 'lucide-react';

// Deterministic physical rotations for clipped photographs
const ROTATION_ANGLES = [-2, 1.2, -1, 2, -1.8, 0.8, -1.2, 1.5, -0.5, 1.8];

export default function AdminPastVisitsPage() {
  const [boards, setBoards] = useState<SeedPastVisit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>('ALL');

  // Active Board in Detail View / Edit Mode
  const [activeBoard, setActiveBoard] = useState<SeedPastVisit | null>(null);
  const [isEditingBoardInfo, setIsEditingBoardInfo] = useState(false);

  // New Board Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDestination, setNewDestination] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTitle, setNewTitle] = useState('');

  // Media Picker Modal
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTargetMode, setMediaTargetMode] = useState<'add' | 'replace'>('add');
  const [replaceTargetIndex, setReplaceTargetIndex] = useState<number | null>(null);

  // Lightbox Modal
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  // Hovered photo within a board
  const [hoveredPhotoKey, setHoveredPhotoKey] = useState<string | null>(null);

  // Load from Supabase / localStorage on mount
  useEffect(() => {
    async function loadPastVisits() {
      setIsLoading(true);
      try {
        if (
          process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
        ) {
          // Check for any past trip photos stored in media or specific table
          const { data, error } = await supabase
            .from('media')
            .select('*')
            .eq('category', 'Past Trip');

          if (!error && Array.isArray(data) && data.length > 0) {
            // Group by location or notes
            const groups: { [key: string]: SeedPastVisit } = {};
            data.forEach((item: any) => {
              const loc = item.source || 'Curated Journey';
              if (!groups[loc]) {
                groups[loc] = {
                  id: `board_${loc.toLowerCase().replace(/\s+/g, '_')}`,
                  destination: loc,
                  date: item.alt_text || 'Recent Journey',
                  title: `${loc} Travel Memories`,
                  coverImageUrl: item.url,
                  photos: [],
                };
              }
              groups[loc].photos.push(item.url);
            });
            const boardList = Object.values(groups);
            setBoards(boardList);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Could not query Supabase for past visits:', e);
      }

      // Check persistent localStorage
      try {
        const local = localStorage.getItem('tripkario_admin_past_visits');
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) {
            setBoards(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Could not read past visits from localStorage:', e);
      }

      // Default: Clean empty state (NO FAKE / MOCK DATA)
      setBoards([]);
      setIsLoading(false);
    }

    loadPastVisits();
  }, []);

  const persistBoards = async (updatedList: SeedPastVisit[]) => {
    setBoards(updatedList);
    try {
      localStorage.setItem('tripkario_admin_past_visits', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('Could not persist past visits to localStorage:', e);
    }
  };

  // Location filter tabs derived dynamically from real boards
  const locationTabs = useMemo(() => {
    const locations = Array.from(new Set(boards.map((b) => b.destination.toUpperCase())));
    return ['ALL', ...locations];
  }, [boards]);

  const filteredBoards = useMemo(() => {
    if (selectedLocationFilter === 'ALL') return boards;
    return boards.filter((b) => b.destination.toUpperCase() === selectedLocationFilter);
  }, [boards, selectedLocationFilter]);

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestination.trim() || !newDate.trim()) return;

    const newBoard: SeedPastVisit = {
      id: `board_${Date.now()}`,
      destination: newDestination.trim(),
      date: newDate.trim(),
      title: newTitle.trim() || `${newDestination.trim()} Journey`,
      coverImageUrl: '',
      photos: [],
    };

    const updated = [newBoard, ...boards];
    await persistBoards(updated);
    setActiveBoard(newBoard);
    setIsCreateModalOpen(false);
    setNewDestination('');
    setNewDate('');
    setNewTitle('');
  };

  const handleDeleteBoard = async (id: string, destination: string) => {
    if (confirm(`Are you sure you want to remove the "${destination}" travel memory board?`)) {
      const updated = boards.filter((b) => b.id !== id);
      await persistBoards(updated);
      if (activeBoard?.id === id) {
        setActiveBoard(null);
        setLightboxPhotoIndex(null);
      }
    }
  };

  const handleAddPhotosToBoard = async (url: string) => {
    if (!activeBoard) return;
    const currentPhotos = activeBoard.photos || [];
    const updatedPhotos = [...currentPhotos, url];
    const updatedBoard: SeedPastVisit = {
      ...activeBoard,
      photos: updatedPhotos,
      coverImageUrl: activeBoard.coverImageUrl || url,
    };

    setActiveBoard(updatedBoard);
    const updatedBoards = boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b));
    await persistBoards(updatedBoards);
  };

  const handleReplacePhoto = async (newUrl: string) => {
    if (!activeBoard || replaceTargetIndex === null) return;
    const updatedPhotos = [...activeBoard.photos];
    const oldUrl = updatedPhotos[replaceTargetIndex];
    updatedPhotos[replaceTargetIndex] = newUrl;

    let updatedCover = activeBoard.coverImageUrl;
    if (oldUrl === activeBoard.coverImageUrl) {
      updatedCover = newUrl;
    }

    const updatedBoard: SeedPastVisit = {
      ...activeBoard,
      photos: updatedPhotos,
      coverImageUrl: updatedCover,
    };

    setActiveBoard(updatedBoard);
    const updatedBoards = boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b));
    await persistBoards(updatedBoards);
    setReplaceTargetIndex(null);
  };

  const handleRemovePhoto = async (photoIndex: number) => {
    if (!activeBoard) return;
    const targetUrl = activeBoard.photos[photoIndex];
    const updatedPhotos = activeBoard.photos.filter((_, idx) => idx !== photoIndex);
    let updatedCover = activeBoard.coverImageUrl;

    if (updatedCover === targetUrl) {
      updatedCover = updatedPhotos[0] || '';
    }

    const updatedBoard: SeedPastVisit = {
      ...activeBoard,
      photos: updatedPhotos,
      coverImageUrl: updatedCover,
    };

    setActiveBoard(updatedBoard);
    const updatedBoards = boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b));
    await persistBoards(updatedBoards);

    if (lightboxPhotoIndex !== null) {
      if (updatedPhotos.length === 0) {
        setLightboxPhotoIndex(null);
      } else if (lightboxPhotoIndex >= updatedPhotos.length) {
        setLightboxPhotoIndex(updatedPhotos.length - 1);
      }
    }
  };

  const handleSetCoverPhoto = async (photoUrl: string) => {
    if (!activeBoard) return;
    const updatedBoard: SeedPastVisit = {
      ...activeBoard,
      coverImageUrl: photoUrl,
    };

    setActiveBoard(updatedBoard);
    const updatedBoards = boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b));
    await persistBoards(updatedBoards);
  };

  const handleMovePhoto = async (index: number, direction: 'left' | 'right') => {
    if (!activeBoard) return;
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= activeBoard.photos.length) return;

    const list = [...activeBoard.photos];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const updatedBoard: SeedPastVisit = {
      ...activeBoard,
      photos: list,
    };

    setActiveBoard(updatedBoard);
    const updatedBoards = boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b));
    await persistBoards(updatedBoards);

    if (lightboxPhotoIndex !== null) {
      setLightboxPhotoIndex(targetIdx);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 min-h-screen select-none pb-28">
      {/* ══════════════════════════════════════════════════
          PAGE HERO & STUDIO HEADER
          ══════════════════════════════════════════════════ */}
      <div className="border-b border-[#262420]/15 dark:border-[#262420] pb-8 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C85D3A] font-semibold block">
              TRAVEL MEMORY WALL & ARCHIVE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171512] dark:text-[#F5EFE6] tracking-tight leading-none">
              Location Boards & Field Photography
            </h1>
            <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#A8A095] font-light leading-relaxed pt-1">
              Curate physical location boards pinning authentic photographs and memories from completed journeys.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeBoard ? (
              <button
                type="button"
                onClick={() => {
                  setActiveBoard(null);
                  setLightboxPhotoIndex(null);
                  setIsEditingBoardInfo(false);
                }}
                className="px-5 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] hover:bg-black/5 dark:hover:bg-white/10 text-xs font-mono font-bold uppercase text-[#171512] dark:text-white border border-[#262420]/15 dark:border-[#262420] flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>All Boards</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#171512] dark:bg-[#F5EFE6] text-white dark:text-[#171512] hover:bg-[#C85D3A] dark:hover:bg-[#C85D3A] dark:hover:text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2.5 shadow-lg transition-all duration-300 active:scale-98 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Location Board</span>
              </button>
            )}
          </div>
        </div>

        {/* Top Horizontal Editorial Index */}
        {!activeBoard && !isLoading && boards.length > 0 && (
          <div className="mt-8 pt-4 border-t border-[#262420]/10 dark:border-[#262420] flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C8479] mr-2 shrink-0">
              Filter Boards:
            </span>
            {locationTabs.map((loc) => {
              const isSelected = selectedLocationFilter === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocationFilter(loc)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#C85D3A] text-white shadow-sm'
                      : 'bg-white/60 dark:bg-[#14120F] text-[#6D665E] dark:text-[#8C8479] border border-[#262420]/10 dark:border-[#262420] hover:border-[#C85D3A]/40'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          EDITORIAL EMPTY STATE (IF ZERO BOARDS)
          ══════════════════════════════════════════════════ */}
      {!isLoading && boards.length === 0 && (
        <div className="py-20 sm:py-28 px-6 text-center max-w-xl mx-auto rounded-3xl border border-dashed border-[#262420]/20 dark:border-[#262420] bg-white/40 dark:bg-[#14120F]/40 backdrop-blur-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#262420]/15 dark:border-[#262420] mx-auto flex items-center justify-center text-[#C85D3A]">
            <Camera className="w-7 h-7 stroke-1" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#C85D3A] uppercase font-bold">
              NO TRAVEL MEMORIES YET
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#171512] dark:text-[#F5EFE6]">
              Your Travel Memories Will Appear Here
            </h2>
            <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#A8A095] font-light max-w-sm mx-auto leading-relaxed">
              Create a location board to pin and curate authentic photographs from completed journeys.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold tracking-widest uppercase inline-flex items-center gap-2 shadow-lg shadow-[#C85D3A]/25 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Location Board</span>
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 1: LOCATION BOARDS GRID (STUDIO WALL)
          ══════════════════════════════════════════════════ */}
      {!activeBoard && !isLoading && filteredBoards.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {filteredBoards.map((board, boardIndex) => {
            const hasPhotos = board.photos && board.photos.length > 0;
            const photoCount = board.photos ? board.photos.length : 0;

            return (
              <div
                key={board.id}
                onClick={() => setActiveBoard(board)}
                className="group relative rounded-3xl p-7 sm:p-9 bg-[#FAF7F2] dark:bg-[#14120F] border border-[#262420]/15 dark:border-[#262420] shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-[#C85D3A]/50 transition-all duration-500 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Physical Studio Board Header */}
                <div className="space-y-3 pb-6 border-b border-[#262420]/10 dark:border-[#262420]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C85D3A]" />
                      <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#8C8479] font-bold">
                        LOCATION BOARD #{String(boardIndex + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono font-bold text-[#174E48] dark:text-[#D4A467] bg-[#174E48]/10 dark:bg-[#D4A467]/10 px-3 py-1 rounded-full">
                      {photoCount} {photoCount === 1 ? 'Photograph' : 'Photographs'}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#171512] dark:text-[#F5EFE6] tracking-tight uppercase group-hover:text-[#C85D3A] transition-colors">
                      {board.destination}
                    </h2>
                    <span className="text-xs font-mono text-[#C85D3A] font-bold shrink-0">
                      {board.date}
                    </span>
                  </div>

                  {board.title && board.title !== `${board.destination} Journey` && (
                    <p className="text-xs font-light text-[#6D665E] dark:text-[#A8A095] italic font-serif">
                      "{board.title}"
                    </p>
                  )}
                </div>

                {/* Physical Clipped Photographs Canvas on Board */}
                <div className="py-8 min-h-[260px] flex items-center justify-center relative">
                  {hasPhotos ? (
                    <div className="relative w-full h-56 flex items-center justify-center">
                      {board.photos.slice(0, 4).map((photoUrl, pIdx) => {
                        const rotation = ROTATION_ANGLES[pIdx % ROTATION_ANGLES.length];
                        const offsetLeft = pIdx * 22; // Layered offset cascade

                        return (
                          <div
                            key={pIdx}
                            style={{
                              transform: `rotate(${rotation}deg) translateX(${pIdx * 12 - 18}px)`,
                              zIndex: pIdx + 1,
                            }}
                            className="absolute w-44 sm:w-52 aspect-[4/3] rounded-xl p-1.5 bg-white dark:bg-[#1E1B18] shadow-xl border border-black/10 transition-all duration-300 group-hover:scale-103 group-hover:rotate-0"
                          >
                            {/* Tape Strip on Top Edge */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-[#E0D5C1]/70 dark:bg-white/20 backdrop-blur-xs rotate-[-2deg] rounded-xs shadow-xs z-10" />

                            <div className="relative w-full h-full rounded-lg overflow-hidden bg-black/10">
                              <Image
                                src={photoUrl}
                                alt={`${board.destination} photo ${pIdx + 1}`}
                                fill
                                sizes="240px"
                                className="object-cover"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-2 text-[#8C8479]">
                      <ImageIcon className="w-8 h-8 mx-auto stroke-1 text-[#C85D3A]/60" />
                      <span className="text-xs font-mono block">No photographs pinned yet</span>
                      <span className="text-[11px] text-[#C85D3A] font-bold">
                        Click board to add photos →
                      </span>
                    </div>
                  )}
                </div>

                {/* Board Footer Bar */}
                <div className="pt-4 border-t border-[#262420]/10 dark:border-[#262420] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8C8479] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C85D3A]" />
                    <span>Open Physical Board</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBoard(board.id, board.destination);
                    }}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Location Board"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 2: ACTIVE LOCATION BOARD (PHYSICAL MEMORY PINBOARD)
          ══════════════════════════════════════════════════ */}
      {activeBoard && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Active Board Canvas */}
          <div className="rounded-3xl p-6 sm:p-12 bg-[#FAF7F2] dark:bg-[#14120F] border border-[#262420]/15 dark:border-[#262420] shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)] space-y-8 relative">
            {/* Top Board Meta & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#262420]/10 dark:border-[#262420]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-[#174E48] text-white font-bold uppercase tracking-wider">
                    {activeBoard.destination}
                  </span>
                  <span className="text-[#C85D3A] font-bold font-mono">{activeBoard.date}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#171512] dark:text-[#F5EFE6]">
                  {activeBoard.title || `${activeBoard.destination} Travel Memory Board`}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingBoardInfo(!isEditingBoardInfo)}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1916] hover:bg-[#FAF7F2] text-[#171512] dark:text-white border border-[#262420]/15 dark:border-[#262420] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 inline mr-1.5" />
                  <span>{isEditingBoardInfo ? 'Close Edit' : 'Edit Info'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMediaTargetMode('add');
                    setIsMediaPickerOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Photos</span>
                </button>
              </div>
            </div>

            {/* Quick Edit Board Information Accordion */}
            {isEditingBoardInfo && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/70 dark:bg-[#1A1815] border border-[#262420]/15 dark:border-[#262420] text-xs font-mono animate-in fade-in">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                    Location Name
                  </label>
                  <input
                    type="text"
                    value={activeBoard.destination}
                    onChange={(e) => {
                      const updated = { ...activeBoard, destination: e.target.value };
                      setActiveBoard(updated);
                      persistBoards(boards.map((b) => (b.id === updated.id ? updated : b)));
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#14120F] border border-[#262420]/15 text-[#171512] dark:text-white text-xs font-sans font-bold"
                  />
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                    Trip Period / Date
                  </label>
                  <input
                    type="text"
                    value={activeBoard.date}
                    onChange={(e) => {
                      const updated = { ...activeBoard, date: e.target.value };
                      setActiveBoard(updated);
                      persistBoards(boards.map((b) => (b.id === updated.id ? updated : b)));
                    }}
                    placeholder="e.g. March 2026"
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#14120F] border border-[#262420]/15 text-[#171512] dark:text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                    Board Title / Quote
                  </label>
                  <input
                    type="text"
                    value={activeBoard.title || ''}
                    onChange={(e) => {
                      const updated = { ...activeBoard, title: e.target.value };
                      setActiveBoard(updated);
                      persistBoards(boards.map((b) => (b.id === updated.id ? updated : b)));
                    }}
                    placeholder="e.g. Cedar Chalets & Spring Rivers"
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#14120F] border border-[#262420]/15 text-[#171512] dark:text-white text-xs font-sans"
                  />
                </div>
              </div>
            )}

            {/* Pinned Photographs Wall Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#8C8479]">
                <span className="uppercase font-bold tracking-wider">
                  Pinned Photographs ({activeBoard.photos.length})
                </span>
                <span className="hidden sm:inline">
                  Click photograph to open Lightbox & Actions
                </span>
              </div>

              {activeBoard.photos.length === 0 ? (
                <div className="py-16 text-center rounded-2xl border border-dashed border-[#262420]/20 dark:border-[#262420] space-y-3">
                  <Camera className="w-10 h-10 mx-auto text-[#C85D3A]/70 stroke-1" />
                  <p className="text-xs font-mono text-[#8C8479]">
                    No photographs have been pinned to this location board yet.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaTargetMode('add');
                      setIsMediaPickerOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#C85D3A] text-white text-xs font-mono font-bold uppercase cursor-pointer"
                  >
                    + Add Photos from Media Library
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-8 pt-4">
                  {activeBoard.photos.map((photoUrl, idx) => {
                    const isCover = activeBoard.coverImageUrl === photoUrl;
                    const rotation = ROTATION_ANGLES[idx % ROTATION_ANGLES.length];
                    const photoKey = `${activeBoard.id}_${idx}`;
                    const isHovered = hoveredPhotoKey === photoKey;

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredPhotoKey(photoKey)}
                        onMouseLeave={() => setHoveredPhotoKey(null)}
                        onClick={() => setLightboxPhotoIndex(idx)}
                        style={{
                          transform: isHovered
                            ? 'translateY(-6px) scale(1.07) rotate(0deg)'
                            : `rotate(${rotation}deg)`,
                        }}
                        className={`group relative rounded-2xl p-2 bg-white dark:bg-[#1E1B18] shadow-lg hover:shadow-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                          isCover
                            ? 'border-[#C85D3A] ring-2 ring-[#C85D3A]/50'
                            : 'border-black/10 dark:border-white/10 hover:border-[#C85D3A]/60'
                        }`}
                      >
                        {/* Washi Tape Strip on Top Edge */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#E0D5C1]/75 dark:bg-white/20 backdrop-blur-xs rotate-[-1deg] rounded-xs shadow-xs z-10 pointer-events-none" />

                        {/* Image Canvas */}
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/10">
                          <Image
                            src={photoUrl}
                            alt={`${activeBoard.destination} photograph ${idx + 1}`}
                            fill
                            sizes="280px"
                            className="object-cover"
                          />

                          {/* Cover Badge */}
                          {isCover && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#C85D3A] text-white text-[9px] font-mono font-bold uppercase shadow-md flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              <span>Cover</span>
                            </div>
                          )}

                          {/* Zoom Icon Hint on Hover */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="p-2 rounded-full bg-white/90 text-[#171512] shadow-lg">
                              <ZoomIn className="w-4 h-4" />
                            </span>
                          </div>
                        </div>

                        {/* Bottom Meta Pill on Physical Frame */}
                        <div className="pt-2 px-1 flex items-center justify-between text-[10px] font-mono text-[#8C8479]">
                          <span className="truncate uppercase font-bold">
                            {activeBoard.destination} · #{idx + 1}
                          </span>
                          <span className="text-[#C85D3A] group-hover:underline">Open</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          PHOTO LIGHTBOX MODAL
          ══════════════════════════════════════════════════ */}
      {activeBoard && lightboxPhotoIndex !== null && activeBoard.photos[lightboxPhotoIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-[#FAF7F2] dark:bg-[#14120F] rounded-3xl overflow-hidden border border-[#262420]/20 dark:border-[#262420] shadow-2xl flex flex-col max-h-[92vh]">
            {/* Lightbox Header */}
            <div className="p-5 sm:p-6 border-b border-[#262420]/15 dark:border-[#262420] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C85D3A] font-bold block">
                  {activeBoard.destination} MEMORY ARCHIVE
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#171512] dark:text-white">
                  Photograph {lightboxPhotoIndex + 1} of {activeBoard.photos.length}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxPhotoIndex(null)}
                className="p-2 rounded-xl text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Image Preview */}
            <div className="relative flex-1 min-h-[360px] sm:min-h-[460px] bg-black flex items-center justify-center p-2">
              <Image
                src={activeBoard.photos[lightboxPhotoIndex]}
                alt="Enlarged photo"
                fill
                sizes="800px"
                className="object-contain"
                priority
              />

              {/* Prev / Next Navigation Arrows */}
              {activeBoard.photos.length > 1 && (
                <>
                  <button
                    type="button"
                    disabled={lightboxPhotoIndex === 0}
                    onClick={() => setLightboxPhotoIndex(lightboxPhotoIndex - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white disabled:opacity-20 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    disabled={lightboxPhotoIndex === activeBoard.photos.length - 1}
                    onClick={() => setLightboxPhotoIndex(lightboxPhotoIndex + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white disabled:opacity-20 cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Actions Bar */}
            <div className="p-5 border-t border-[#262420]/15 dark:border-[#262420] flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#11100E]">
              {/* Left Actions: Cover / Position */}
              <div className="flex items-center gap-2">
                {activeBoard.coverImageUrl !== activeBoard.photos[lightboxPhotoIndex] && (
                  <button
                    type="button"
                    onClick={() =>
                      handleSetCoverPhoto(activeBoard.photos[lightboxPhotoIndex])
                    }
                    className="px-4 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white border border-[#262420]/15 text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>Set as Cover</span>
                  </button>
                )}

                <button
                  type="button"
                  disabled={lightboxPhotoIndex === 0}
                  onClick={() => handleMovePhoto(lightboxPhotoIndex, 'left')}
                  className="p-2 rounded-xl border border-[#262420]/15 hover:bg-black/5 disabled:opacity-20 cursor-pointer"
                  title="Move Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  disabled={lightboxPhotoIndex === activeBoard.photos.length - 1}
                  onClick={() => handleMovePhoto(lightboxPhotoIndex, 'right')}
                  className="p-2 rounded-xl border border-[#262420]/15 hover:bg-black/5 disabled:opacity-20 cursor-pointer"
                  title="Move Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Actions: Replace / Remove */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMediaTargetMode('replace');
                    setReplaceTargetIndex(lightboxPhotoIndex);
                    setIsMediaPickerOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-[#1C1916] hover:bg-black/5 text-[#171512] dark:text-white border border-[#262420]/15 text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  Replace Photo
                </button>

                <button
                  type="button"
                  onClick={() => handleRemovePhoto(lightboxPhotoIndex)}
                  className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          MODAL: CREATE NEW LOCATION BOARD
          ══════════════════════════════════════════════════ */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <form
            onSubmit={handleCreateBoard}
            className="bg-[#FAF7F2] dark:bg-[#14120F] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#262420]/20 dark:border-[#262420] shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#262420]/15 dark:border-[#262420]">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#C85D3A] uppercase font-bold">
                  NEW ARCHIVE
                </span>
                <h3 className="text-xl font-serif text-[#171512] dark:text-white">
                  Create Location Board
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl text-[#8C8479] hover:bg-black/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                  Location Name
                </label>
                <input
                  type="text"
                  required
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="e.g. Kashmir, Spiti Valley, Munnar"
                  className="w-full p-3 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 text-[#171512] dark:text-white text-sm outline-none focus:border-[#C85D3A]"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                  Trip Period / Date
                </label>
                <input
                  type="text"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. March 2026"
                  className="w-full p-3 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 text-[#171512] dark:text-white text-sm outline-none focus:border-[#C85D3A]"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                  Description / Quote (Optional)
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. A week through Srinagar, Gulmarg and Pahalgam"
                  className="w-full p-3 rounded-xl bg-white dark:bg-[#1C1916] border border-[#262420]/15 text-[#171512] dark:text-white text-sm outline-none focus:border-[#C85D3A]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#6D665E] dark:text-[#8C8479] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-[#C85D3A]/25 cursor-pointer"
              >
                Pin Board
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          EXISTING MEDIA PICKER INTEGRATION
          ══════════════════════════════════════════════════ */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => {
          setIsMediaPickerOpen(false);
          setReplaceTargetIndex(null);
        }}
        onSelectImage={(url) => {
          if (mediaTargetMode === 'replace') {
            handleReplacePhoto(url);
          } else {
            handleAddPhotosToBoard(url);
          }
        }}
        categoryFilter="Past Trip"
        title="Select Photograph for Location Board"
      />
    </div>
  );
}
