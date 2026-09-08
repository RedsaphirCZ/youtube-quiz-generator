import React, { useEffect, useRef, useState } from 'react';
import type { QuizDataset } from '../types';
import { generateCardPreviewPDF } from '../lib/pdfExporter';

export function PDFCardPreview({ quiz, index, side }: {
  quiz: QuizDataset; index: number; side: 'front' | 'back';
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState('Rendering card…');
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    setStatus('Rendering card…');
    async function render() {
      try {
        const pdfjs = await import('pdfjs-dist');
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        if (cancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        const data = new Uint8Array(generateCardPreviewPDF(quiz, index, side).output('arraybuffer'));
        const task = pdfjs.getDocument({ data });
        cleanup = () => { void task.destroy(); };
        const pdf = await task.promise;
        const page = await pdf.getPage(1);
        if (cancelled) return;
        const viewport = page.getViewport({ scale: 3 });
        // Render offscreen so changing cards cannot show a partly drawn or stale face.
        const buffer = document.createElement('canvas');
        buffer.width = Math.ceil(viewport.width);
        buffer.height = Math.ceil(viewport.height);
        await page.render({ canvas: buffer, viewport }).promise;
        if (cancelled || !canvasRef.current) return;
        const canvas = canvasRef.current;
        canvas.width = buffer.width;
        canvas.height = buffer.height;
        canvas.getContext('2d')!.drawImage(buffer, 0, 0);
        setStatus('');
      } catch (error) {
        if (!cancelled) setStatus(error instanceof Error ? error.message : 'Unable to render this card.');
      }
    }
    void render();
    return () => { cancelled = true; cleanup(); };
  }, [quiz, index, side]);
  return <div className="flex flex-col items-center gap-2 py-2">
    {status && <p role="status" className="text-sm text-[#706860]">{status}</p>}
    <canvas ref={canvasRef} role="img" aria-label={`PDF card ${index + 1}, ${side}`}
      className={`w-full max-w-[400px] shadow-md ${status ? 'hidden' : ''}`} />
    <p className="text-xs text-[#706860]">Actual PDF artwork, including 3 mm bleed.</p>
  </div>;
}
