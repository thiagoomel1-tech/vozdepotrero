'use client';
import React, { useState, useRef, useCallback } from 'react';
import { X, Mic, MicOff, Send, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { SportId } from './MainDisplayClient';

interface UpdateModalProps {
  onClose: () => void;
  activeSport?: SportId;
}

const EXAMPLES: Record<string, string[]> = {
  futbol: [
    'Agregar jugador Boca 9 Benedetto',
    'Eliminar jugador River Quintero',
    'Lesionado Cavani',
    'Capitán Boca Paredes',
    'Boca 27 puntos',
    'River primero zona B',
    'Editar DT Rosario Central Almirón',
  ],
  basquet: [
    'Central agregar jugador Gómez',
    'Cambiar DT Náutico Pérez',
    'Gimnasia 10 victorias',
    'Temperley 5 puntos',
  ],
  automovilismo: [
    'F1 Colapinto 8 puntos',
    'Verstappen primero',
    'Ferrari 200 puntos',
    'Marcar Miami como disputada',
  ],
  seleccion: [
    'Argentina agregar gol Messi',
    'Argentina 3 títulos Copa América',
    'Cambiar DT Scaloni',
    'Agregar jugador 10 Messi Delantero',
  ],
};

const SPORT_LABELS: Record<string, string> = {
  futbol: 'Fútbol',
  basquet: 'Básquet',
  automovilismo: 'Automovilismo',
  seleccion: 'Selección Argentina',
};

export default function UpdateModal({ onClose, activeSport }: UpdateModalProps) {
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentExamples = activeSport
    ? EXAMPLES[activeSport] ?? []
    : Object.values(EXAMPLES).flat();

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success('Comando procesado', {
      description: `"${text.trim()}" aplicado correctamente.`,
    });
    setText('');
    onClose();
  };

  const toggleRecording = () => {
    setRecording((prev) => !prev);
    if (!recording) {
      toast.info('Micrófono activado', { description: 'Dictá el comando para actualizar.' });
    } else {
      toast.info('Grabación detenida');
    }
  };

  const applyExample = useCallback((example: string) => {
    setText(example);
    setShowExamples(false);
    textareaRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Actualizar contenido"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-2xl shadow-2xl modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
          <div>
            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Actualizar Data</h2>
            <p className="text-sm text-[hsl(var(--muted))] mt-0.5">
              {activeSport
                ? `Editando: ${SPORT_LABELS[activeSport]}`
                : 'Universal — todas las burbujas'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Sport indicator */}
          {activeSport && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.3)]">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
              <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                Contexto activo: {SPORT_LABELS[activeSport]}
              </span>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest">
                Comando
              </label>
              <button
                onClick={() => setShowExamples((v) => !v)}
                className="flex items-center gap-1 text-xs text-[hsl(var(--primary))] hover:opacity-70 transition-opacity"
              >
                <HelpCircle size={12} />
                Ejemplos
              </button>
            </div>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                activeSport === 'futbol' ? 'Ej: Agregar jugador Boca 9 Benedetto' :
                activeSport === 'basquet' ? 'Ej: Central agregar jugador Gómez' :
                activeSport === 'automovilismo' ? 'Ej: F1 Colapinto 8 puntos' :
                activeSport === 'seleccion'? 'Ej: Argentina agregar gol Messi' : 'Ej: Boca 27 puntos · Colapinto 8 puntos · Argentina 3 títulos...'
              }
              rows={4}
              className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] resize-none transition-all duration-200"
              onKeyDown={(e) => { if (e.key === 'Enter' && e.ctrlKey) handleSubmit(); }}
            />
          </div>

          {/* Examples panel */}
          {showExamples && (
            <div className="bg-[hsl(var(--surface-elevated))] rounded-xl p-3 space-y-1 max-h-48 overflow-y-auto">
              <p className="text-xs font-semibold text-[hsl(var(--muted))] uppercase tracking-widest mb-2">
                Comandos de ejemplo
              </p>
              {currentExamples.map((ex, i) => (
                <button
                  key={`ex-${i}`}
                  onClick={() => applyExample(ex)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted))]">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
            Actualización en vivo — sin recargar página
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[hsl(var(--border))]">
          <button
            onClick={toggleRecording}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 ${
              recording
                ? 'bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.4)]'
                : 'bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            {recording ? <MicOff size={16} /> : <Mic size={16} />}
            {recording ? 'Detener' : 'Dictado'}
            {recording && <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent))] animate-pulse" />}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold hover:brightness-110 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[hsl(var(--primary-foreground)/0.4)] border-t-[hsl(var(--primary-foreground))] rounded-full animate-spin" />
                  Aplicando...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Aplicar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}