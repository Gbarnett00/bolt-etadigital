import { useState, useEffect } from 'react';
import { Copy, CheckCircle, Link, Clock, Trash2 } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

interface HistoryEntry {
  id: string;
  timestamp: string;
  page: string;
  placement: string;
  campaignName: string;
  url: string;
}

const PAGES = [
  { value: 'case-study', label: 'Case Study' },
  { value: 'free-guide', label: 'Free Guide' },
  { value: 'free-automations', label: 'Free Automations' },
];

const PLACEMENTS = [
  { value: 'post', label: 'Post', medium: 'social' },
  { value: 'featured', label: 'Featured Section', medium: 'profile' },
  { value: 'bio', label: 'Profile Bio', medium: 'profile' },
  { value: 'article', label: 'Article', medium: 'social' },
  { value: 'comment', label: 'Comment', medium: 'social' },
];

const BASE_URL = 'https://etadigital.co.uk';
const HISTORY_KEY = 'utm_history';
const MAX_HISTORY = 10;

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}

export function UTMBuilder() {
  const [page, setPage] = useState('case-study');
  const [placement, setPlacement] = useState('post');
  const [campaignName, setCampaignName] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Prevent search engines from indexing this internal tool
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const placementData = PLACEMENTS.find(p => p.value === placement) || PLACEMENTS[0];
  const campaignSlug = slugify(campaignName);
  const isValid = campaignSlug.length > 0;
  const fullCampaign = `${placement}_${campaignSlug}`;

  const generatedUrl = isValid
    ? `${BASE_URL}/${page}?utm_source=linkedin&utm_medium=${placementData.medium}&utm_campaign=${fullCampaign}`
    : '';

  const saveToHistory = (url: string) => {
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      page: PAGES.find(p => p.value === page)?.label ?? page,
      placement: placementData.label,
      campaignName,
      url,
    };
    const updated = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const handleCopy = async () => {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
    saveToHistory(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyHistory = async (entry: HistoryEntry) => {
    await navigator.clipboard.writeText(entry.url);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Section spacing="xl">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
              <Link className="w-5 h-5 text-accent-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-100">
              LinkedIn Link Generator
            </h1>
          </div>
          <p className="text-gray-600 dark:text-dark-400">
            Generate a tracking link for your LinkedIn post. Each link tells us exactly where your clicks came from so we can see what's working.
          </p>
        </div>

        {/* Form card */}
        <Card className="mb-6">
          <div className="space-y-5">
            <Select
              label="Which page are you linking to?"
              value={page}
              onChange={e => setPage(e.target.value)}
              options={PAGES}
            />

            <Select
              label="Where on LinkedIn will this link appear?"
              value={placement}
              onChange={e => setPlacement(e.target.value)}
              options={PLACEMENTS.map(p => ({ value: p.value, label: p.label }))}
            />

            <Input
              label="Give this link a name"
              placeholder="e.g. march_case_study or spring_guide_launch"
              value={campaignName}
              onChange={e => setCampaignName(e.target.value)}
              helperText="Short name so you can identify this post in analytics. Letters, numbers and spaces are fine."
            />
          </div>

          {/* Generated link output */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-dark-800">
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
              Your tracking link
            </label>
            <div className="flex gap-2 items-stretch">
              <div className="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-sm text-gray-700 dark:text-dark-300 font-mono overflow-hidden text-ellipsis whitespace-nowrap min-w-0 flex items-center">
                {isValid
                  ? generatedUrl
                  : <span className="text-gray-400 dark:text-dark-500 font-sans italic">Enter a name above to generate your link</span>
                }
              </div>
              <Button
                variant="primary"
                onClick={handleCopy}
                disabled={!isValid}
                className="shrink-0"
              >
                {copied
                  ? <><CheckCircle className="w-4 h-4" />Copied!</>
                  : <><Copy className="w-4 h-4" />Copy</>
                }
              </Button>
            </div>
          </div>
        </Card>

        {/* History */}
        {history.length > 0 && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-700 dark:text-dark-300">
                  Previously generated
                </h2>
              </div>
              <button
                onClick={handleClearHistory}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear all
              </button>
            </div>

            <div className="space-y-0">
              {history.map((entry, i) => (
                <div
                  key={entry.id}
                  className={`flex items-start justify-between gap-3 py-3 ${i > 0 ? 'border-t border-gray-100 dark:border-dark-800' : ''}`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-medium bg-accent-500/10 text-accent-600 dark:text-accent-400 px-2 py-0.5 rounded">
                        {entry.page}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-dark-500">
                        {entry.placement}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-dark-200 truncate">
                      {entry.campaignName}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-dark-500 mt-0.5">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyHistory(entry)}
                    className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-accent-500 hover:bg-accent-500/10 transition-all"
                    title="Copy link"
                  >
                    {copiedId === entry.id
                      ? <CheckCircle className="w-4 h-4 text-accent-500" />
                      : <Copy className="w-4 h-4" />
                    }
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

      </div>
    </Section>
  );
}
