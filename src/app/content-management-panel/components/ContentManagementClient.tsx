'use client';
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Shield, Users, Zap, Settings2 } from 'lucide-react';
import FutbolEditor from './FutbolEditor';
import F1Editor from './F1Editor';
import SeleccionEditor from './SeleccionEditor';
import RolesPanel from './RolesPanel';
import Icon from '@/components/ui/AppIcon';


type TabId = 'futbol' | 'f1' | 'seleccion' | 'roles';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'futbol', label: 'Fútbol', icon: Zap },
  { id: 'f1', label: 'Fórmula 1', icon: Settings2 },
  { id: 'seleccion', label: 'Selección', icon: Shield },
  { id: 'roles', label: 'Roles', icon: Users },
];

export default function ContentManagementClient() {
  const [activeTab, setActiveTab] = useState<TabId>('futbol');

  return (
    <div className="py-6 space-y-6">
      <Toaster position="bottom-right" theme="dark" richColors />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">Panel de Gestión</h1>
          <p className="text-[hsl(var(--muted))] mt-1">Actualizá el contenido deportivo en tiempo real para televisión</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--success)/0.1)] border border-[hsl(var(--success)/0.3)]">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
          <span className="text-sm font-semibold text-[hsl(var(--success))]">Sistema en vivo</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-2xl p-1.5 w-fit overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={`mgmt-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                active
                  ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))]'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="fade-in">
        {activeTab === 'futbol' && <FutbolEditor />}
        {activeTab === 'f1' && <F1Editor />}
        {activeTab === 'seleccion' && <SeleccionEditor />}
        {activeTab === 'roles' && <RolesPanel />}
      </div>
    </div>
  );
}