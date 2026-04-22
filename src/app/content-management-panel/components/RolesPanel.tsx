'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, Shield, Eye, Edit3, Settings, AlertCircle } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
  memberCount: number;
}

const permissionsList = [
  { id: 'perm-futbol', label: 'Editar Fútbol', icon: '⚽' },
  { id: 'perm-f1', label: 'Editar F1', icon: '🏎️' },
  { id: 'perm-seleccion', label: 'Editar Selección', icon: '🇦🇷' },
  { id: 'perm-basquet', label: 'Editar Básquet', icon: '🏀' },
  { id: 'perm-view', label: 'Solo lectura', icon: '👁️' },
  { id: 'perm-publish', label: 'Publicar en vivo', icon: '📺' },
  { id: 'perm-roles', label: 'Gestión de roles', icon: '🔑' },
];

const initialRoles: Role[] = [
  {
    id: 'role-01',
    name: 'Director de Contenido',
    description: 'Acceso completo a todos los módulos y configuración de roles.',
    permissions: ['perm-futbol', 'perm-f1', 'perm-seleccion', 'perm-basquet', 'perm-view', 'perm-publish', 'perm-roles'],
    color: '#E8FF00',
    memberCount: 1,
  },
  {
    id: 'role-02',
    name: 'Editor de Fútbol',
    description: 'Puede editar planteles, goleadores y datos de los equipos de fútbol.',
    permissions: ['perm-futbol', 'perm-view', 'perm-publish'],
    color: '#00D2BE',
    memberCount: 2,
  },
  {
    id: 'role-03',
    name: 'Editor de Motorsport',
    description: 'Responsable de actualizar tablas de F1 y datos de pilotos.',
    permissions: ['perm-f1', 'perm-view', 'perm-publish'],
    color: '#FF8000',
    memberCount: 1,
  },
  {
    id: 'role-04',
    name: 'Productor TV',
    description: 'Acceso de lectura para visualizar datos en pantalla durante transmisiones.',
    permissions: ['perm-view'],
    color: '#6692FF',
    memberCount: 4,
  },
  {
    id: 'role-05',
    name: 'Editor General',
    description: 'Puede editar todos los deportes pero sin gestión de roles.',
    permissions: ['perm-futbol', 'perm-f1', 'perm-seleccion', 'perm-basquet', 'perm-view', 'perm-publish'],
    color: '#FF87BC',
    memberCount: 2,
  },
];

export default function RolesPanel() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', color: '#888888', permissions: [] as string[] });
  const [addError, setAddError] = useState('');
  const [saving, setSaving] = useState(false);

  const togglePermission = (permId: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter((p) => p !== permId)
        : [...prev.permissions, permId],
    }));
  };

  const toggleExistingPermission = (role: Role, permId: string) => {
    const updated = {
      ...role,
      permissions: role.permissions.includes(permId)
        ? role.permissions.filter((p) => p !== permId)
        : [...role.permissions, permId],
    };
    setRoles((prev) => prev.map((r) => r.id === role.id ? updated : r));
    setSelectedRole(updated);
  };

  const addRole = () => {
    if (!newRole.name.trim()) {
      setAddError('El nombre del rol es obligatorio.');
      return;
    }
    if (roles.some((r) => r.name.toLowerCase() === newRole.name.toLowerCase())) {
      setAddError(`El rol "${newRole.name}" ya existe.`);
      return;
    }
    setAddError('');
    const id = `role-new-${Date.now()}`;
    setRoles((prev) => [...prev, {
      id,
      name: newRole.name.trim(),
      description: newRole.description.trim() || 'Sin descripción',
      permissions: newRole.permissions,
      color: newRole.color,
      memberCount: 0,
    }]);
    setNewRole({ name: '', description: '', color: '#888888', permissions: [] });
    setAddingNew(false);
    toast.success('Rol creado', { description: `"${newRole.name}" agregado al sistema.` });
  };

  const removeRole = (id: string) => {
    const role = roles.find((r) => r.id === id);
    if (role?.id === 'role-01') {
      toast.error('No se puede eliminar', { description: 'El rol de Director de Contenido no puede eliminarse.' });
      return;
    }
    setRoles((prev) => prev.filter((r) => r.id !== id));
    if (selectedRole?.id === id) setSelectedRole(null);
    toast.success('Rol eliminado', { description: role?.name });
  };

  const handleSaveRole = async () => {
    if (!selectedRole) return;
    setSaving(true);
    // Backend integration: PUT /api/roles/{selectedRole.id} with selectedRole
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    toast.success('Rol guardado', { description: `"${selectedRole.name}" actualizado.` });
  };

  const getPermissionIcon = (permId: string) => permissionsList.find((p) => p.id === permId)?.icon ?? '•';
  const getPermissionLabel = (permId: string) => permissionsList.find((p) => p.id === permId)?.label ?? permId;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Roles list */}
      <div className="lg:col-span-1 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Roles del sistema</h3>
          <button
            onClick={() => { setAddingNew(true); setSelectedRole(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.3)] text-xs font-bold text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.2)] transition-all duration-150 active:scale-95"
          >
            <Plus size={14} />
            Nuevo rol
          </button>
        </div>

        <div className="space-y-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => { setSelectedRole(role); setAddingNew(false); }}
              className={`w-full text-left tv-card transition-all duration-150 hover:border-[hsl(var(--primary)/0.4)] active:scale-[0.99] ${
                selectedRole?.id === role.id ? 'border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.05)]' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: role.color }} />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[hsl(var(--foreground))] truncate">{role.name}</p>
                    <p className="text-xs text-[hsl(var(--muted))] mt-0.5 line-clamp-2">{role.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="font-mono text-xs font-bold text-[hsl(var(--muted-foreground))]">
                    {role.memberCount} {role.memberCount === 1 ? 'usuario' : 'usuarios'}
                  </span>
                  <span className="text-xs text-[hsl(var(--muted))]">{role.permissions.length} permisos</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Role detail / add form */}
      <div className="lg:col-span-2">
        {addingNew && (
          <div className="tv-card space-y-5 fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.3)] flex items-center justify-center">
                <Plus size={20} className="text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">Nuevo Rol</h3>
                <p className="text-sm text-[hsl(var(--muted))]">Configurá los permisos del nuevo rol</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Nombre del rol
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Editor de Básquet"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Color identificador
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={newRole.color}
                    onChange={(e) => setNewRole((p) => ({ ...p, color: e.target.value }))}
                    className="w-12 h-12 rounded-xl border border-[hsl(var(--border))] cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-sm text-[hsl(var(--muted-foreground))]">{newRole.color}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                Descripción
              </label>
              <input
                type="text"
                value={newRole.description}
                onChange={(e) => setNewRole((p) => ({ ...p, description: e.target.value }))}
                placeholder="Responsable de actualizar datos de básquet en vivo"
                className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-3 uppercase tracking-widest">
                Permisos
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {permissionsList.map((perm) => {
                  const active = newRole.permissions.includes(perm.id);
                  return (
                    <button
                      key={`new-perm-${perm.id}`}
                      onClick={() => togglePermission(perm.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                        active
                          ? 'bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))]'
                          : 'bg-[hsl(var(--surface-elevated))] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                      }`}
                    >
                      <span className="text-lg">{perm.icon}</span>
                      <span className="text-sm font-semibold">{perm.label}</span>
                      {active && (
                        <span className="ml-auto w-4 h-4 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                          <span className="text-[hsl(var(--primary-foreground))] text-xs font-bold">✓</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {addError && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--accent)/0.1)] border border-[hsl(var(--accent)/0.3)]">
                <AlertCircle size={16} className="text-[hsl(var(--accent))] flex-shrink-0" />
                <p className="text-sm text-[hsl(var(--accent))]">{addError}</p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => { setAddingNew(false); setAddError(''); }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150"
              >
                Cancelar
              </button>
              <button
                onClick={addRole}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold hover:brightness-110 active:scale-95 transition-all duration-150"
              >
                <Shield size={16} />
                Crear rol
              </button>
            </div>
          </div>
        )}

        {selectedRole && !addingNew && (
          <div className="tv-card space-y-5 fade-in">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selectedRole.color}22`, border: `1px solid ${selectedRole.color}44` }}>
                  <Shield size={20} style={{ color: selectedRole.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">{selectedRole.name}</h3>
                  <p className="text-sm text-[hsl(var(--muted))] mt-0.5">{selectedRole.description}</p>
                </div>
              </div>
              <button
                onClick={() => removeRole(selectedRole.id)}
                className="p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.1)] transition-all duration-150 flex-shrink-0"
                aria-label={`Eliminar rol ${selectedRole.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[hsl(var(--surface-elevated))] rounded-xl p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Usuarios</p>
                <p className="text-3xl font-bold font-mono text-[hsl(var(--foreground))]">{selectedRole.memberCount}</p>
              </div>
              <div className="bg-[hsl(var(--surface-elevated))] rounded-xl p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Permisos</p>
                <p className="text-3xl font-bold font-mono text-[hsl(var(--primary))]">{selectedRole.permissions.length}</p>
              </div>
              <div className="bg-[hsl(var(--surface-elevated))] rounded-xl p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Estado</p>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] border border-[hsl(var(--success)/0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--success))]" />
                  Activo
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings size={16} className="text-[hsl(var(--muted))]" />
                <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">
                  Permisos asignados
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {permissionsList.map((perm) => {
                  const active = selectedRole.permissions.includes(perm.id);
                  return (
                    <button
                      key={`edit-perm-${selectedRole.id}-${perm.id}`}
                      onClick={() => toggleExistingPermission(selectedRole, perm.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                        active
                          ? 'bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))]'
                          : 'bg-[hsl(var(--surface-elevated))] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                      }`}
                    >
                      <span className="text-lg">{perm.icon}</span>
                      <span className="text-sm font-semibold">{perm.label}</span>
                      <span className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                        active ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]' : 'border-[hsl(var(--border))]'
                      }`}>
                        {active && <span className="text-[hsl(var(--primary-foreground))] text-xs font-bold">✓</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveRole}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold hover:brightness-110 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[hsl(var(--primary-foreground)/0.4)] border-t-[hsl(var(--primary-foreground))] rounded-full animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Edit3 size={15} />
                    Guardar cambios
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {!selectedRole && !addingNew && (
          <div className="tv-card flex flex-col items-center justify-center py-16 text-center fade-in">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center mb-4">
              <Eye size={28} className="text-[hsl(var(--muted))]" />
            </div>
            <p className="text-lg font-semibold text-[hsl(var(--muted-foreground))]">Seleccioná un rol</p>
            <p className="text-sm text-[hsl(var(--muted))] mt-1">
              Elegí un rol de la lista para ver y editar sus permisos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}