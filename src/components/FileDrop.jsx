import React, { useRef, useState } from "react";
import { UploadCloud, X, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function FileDrop({ label, accept = "image/*,application/pdf", value = [], onChange }) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  async function handleFiles(files) {
    if (!files || !files.length) return;
    setBusy(true);
    try {
      const uploaded = [];
      for (const file of Array.from(files)) {
        const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
        uploaded.push({ name: file.name, url: file_url, type: label });
      }
      onChange([...value, ...uploaded]);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        className="mt-1.5 cursor-pointer border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-gold hover:bg-muted/40 transition"
      >
        <input ref={inputRef} type="file" accept={accept} multiple className="hidden"
          onChange={(e) => handleFiles(e.target.files)} />
        <UploadCloud className="w-7 h-7 text-gold mx-auto" />
        <p className="text-sm font-600 text-navy mt-2">{busy ? "Téléversement..." : "Glissez-déposez ou cliquez"}</p>
        <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, PDF — 10 Mo max</p>
      </div>
      {value.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {value.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <FileText className="w-4 h-4 text-gold shrink-0" />
              <span className="text-xs font-medium text-foreground truncate flex-1">{f.name}</span>
              <button onClick={() => onChange(value.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}