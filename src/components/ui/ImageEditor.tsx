import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { ZoomIn, ZoomOut, Move, X, Save } from 'lucide-react';

interface ImageEditorProps {
  imageSrc: string;
  onSave: (settings: ImageSettings) => void;
  initialSettings?: ImageSettings;
}

export interface ImageSettings {
  zoom: number;
  offsetX: number;
  offsetY: number;
}

export function ImageEditor({ imageSrc, onSave, initialSettings }: ImageEditorProps) {
  const [zoom, setZoom] = useState(initialSettings?.zoom || 1);
  const [offsetX, setOffsetX] = useState(initialSettings?.offsetX || 0);
  const [offsetY, setOffsetY] = useState(initialSettings?.offsetY || 0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showEditor, setShowEditor] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only show in development mode
  const isDev = import.meta.env.DEV;

  // Update internal state when initialSettings change
  useEffect(() => {
    if (initialSettings) {
      setZoom(initialSettings.zoom);
      setOffsetX(initialSettings.offsetX);
      setOffsetY(initialSettings.offsetY);
    }
  }, [initialSettings]);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setOffsetX(prev => prev + deltaX);
        setOffsetY(prev => prev + deltaY);
        setDragStart({ x: e.clientX, y: e.clientY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleSave = () => {
    onSave({ zoom, offsetX, offsetY });
    setShowEditor(false);
  };

  if (!isDev) {
    return null;
  }

  return (
    <>
      {!showEditor && (
        <button
          onClick={() => setShowEditor(true)}
          className="absolute top-2 right-2 z-30 px-3 py-1 bg-accent-500 text-white rounded-lg text-sm hover:bg-accent-600 transition-colors"
        >
          Edit Image
        </button>
      )}

      {showEditor && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-900 rounded-xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Adjust Profile Image
              </h3>
              <button
                onClick={() => setShowEditor(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={containerRef}
              className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-800 cursor-move"
              onMouseDown={handleMouseDown}
            >
              <img
                src={imageSrc}
                alt="Profile preview"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                style={{
                  transform: `scale(${zoom}) translate(${offsetX / zoom}px, ${offsetY / zoom}px)`,
                  transformOrigin: 'center center',
                }}
                draggable={false}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                  Zoom: {zoom.toFixed(1)}x
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleZoomOut}
                    variant="secondary"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleZoomIn}
                    variant="secondary"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-400">
                <Move className="w-4 h-4" />
                <span>Click and drag the image to reposition</span>
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={handleReset} variant="secondary" className="flex-1">
                  Reset
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
