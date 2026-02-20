import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Lock,
  Unlock,
  EyeOff,
} from 'lucide-react';

function MenuItem({ icon: Icon, label, shortcut, onClick, destructive }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-3 py-1.5 text-sm rounded-md transition-colors ${
        destructive
          ? 'text-red-400 hover:bg-red-500/10'
          : 'text-gray-200 hover:bg-[#333]'
      }`}
    >
      <Icon size={15} className="shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {shortcut && (
        <span className="text-xs text-gray-500 ml-4">{shortcut}</span>
      )}
    </button>
  );
}

function Divider() {
  return <div className="my-1 border-t border-gray-700" />;
}

export default function ContextMenu({
  x,
  y,
  onClose,
  onDuplicate,
  onDelete,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onToggleLock,
  onToggleHide,
  isLocked,
  elementType,
}) {
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    if (!menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const nx = x + rect.width > window.innerWidth ? window.innerWidth - rect.width - 8 : x;
    const ny = y + rect.height > window.innerHeight ? window.innerHeight - rect.height - 8 : y;
    setPos({ x: nx, y: ny });
  }, [x, y]);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const menu = (
    <div
      ref={menuRef}
      className="fixed z-[9999] min-w-[200px] rounded-lg border border-gray-700 bg-[#222] p-1 shadow-xl"
      style={{ left: pos.x, top: pos.y }}
    >
      {elementType && (
        <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide select-none">
          {elementType}
        </div>
      )}

      <MenuItem icon={Copy} label="Duplicate" shortcut="⌘D" onClick={onDuplicate} />
      <MenuItem icon={Trash2} label="Delete" shortcut="⌫" onClick={onDelete} destructive />

      <Divider />

      <MenuItem icon={ArrowUp} label="Bring Forward" onClick={onBringForward} />
      <MenuItem icon={ArrowDown} label="Send Backward" onClick={onSendBackward} />
      <MenuItem icon={ChevronsUp} label="Bring to Front" onClick={onBringToFront} />
      <MenuItem icon={ChevronsDown} label="Send to Back" onClick={onSendToBack} />

      <Divider />

      <MenuItem
        icon={isLocked ? Unlock : Lock}
        label={isLocked ? 'Unlock' : 'Lock'}
        onClick={() => { onToggleLock(); onClose(); }}
      />
      <MenuItem icon={EyeOff} label="Hide" onClick={() => { onToggleHide(); onClose(); }} />
    </div>
  );

  return createPortal(menu, document.body);
}
