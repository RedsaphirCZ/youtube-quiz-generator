import React from 'react';
import { Sparkles, FileJson, BookOpen } from 'lucide-react';
export function StudioMenu({ onPrompt, onImport, onLibrary }: { onPrompt: () => void; onImport: () => void; onLibrary: () => void }) {
  return <nav aria-label="Quiz project menu" className="studio-menu">{[
    { title: 'Get prompt', description: 'Choose your quiz details and download a research prompt.', icon: Sparkles, action: onPrompt },
    { title: 'Import', description: 'Load a file or paste your quiz response.', icon: FileJson, action: onImport },
    { title: 'Library', description: 'Browse sample quizzes and your saved drafts.', icon: BookOpen, action: onLibrary },
  ].map(({ title, description, icon: Icon, action }) => <button key={title} onClick={action} className="studio-menu-button"><Icon aria-hidden="true" /><span><strong>{title}</strong><span>{description}</span></span></button>)}</nav>;
}
