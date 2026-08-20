import { useState } from 'react';
import { authApi } from '../services/authApi';
import { ADMIN_TOKEN_KEY } from '../../../config/api.config';
import { Lock, Loader2, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await authApi.login(password);
      localStorage.setItem(ADMIN_TOKEN_KEY, response.token);
      setPassword('');
      onSuccess();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-medical-dark font-sans font-bold text-base">
            <Lock className="h-5 w-5 text-primary" />
            Acceso Administrativo
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Clave de Seguridad</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña del negocio"
              required
              autoFocus
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary"
            />
          </div>

          {errorMessage && (
            <p className="text-xs font-medium text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-700 disabled:opacity-50 transition-colors cursor-pointer font-sans"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Verificando...
              </>
            ) : (
              'Ingresar al Panel'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}