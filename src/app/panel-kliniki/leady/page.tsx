'use client';

import { useState, useMemo } from 'react';
import {
  Search, Filter, MoreHorizontal, Star, Phone, Mail, MessageSquare, Video, Calendar,
  ChevronDown, Inbox, CheckCircle2, Clock, UserCheck, XCircle, Sparkles, MapPin,
  Banknote, ArrowUpRight, Reply, ArchiveX, Tag, Building2
} from 'lucide-react';
import { Eyebrow } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGold } from '@/components/ui/Buttons';
import { AIMatchBadge } from '@/components/ui/Badges';
import { leads, type Lead } from '@/data/mock';
import { cn } from '@/lib/utils';

const statusConfig: Record<Lead['status'], { label: string; color: string; bg: string; icon: any }> = {
  new: { label: 'Nowy', color: 'text-burgundy-500', bg: 'bg-burgundy-500/10 border-burgundy-500/30', icon: Inbox },
  contacted: { label: 'Kontakt', color: 'text-champagne-700', bg: 'bg-champagne-500/15 border-champagne-500/40', icon: Phone },
  qualified: { label: 'Zakwalifikowany', color: 'text-rosegold-500', bg: 'bg-rosegold-500/10 border-rosegold-500/30', icon: UserCheck },
  booked: { label: 'Umówiony', color: 'text-charcoal-100', bg: 'bg-charcoal-800 border-charcoal-700', icon: CheckCircle2 },
  lost: { label: 'Utracony', color: 'text-charcoal-400', bg: 'bg-charcoal-400/10 border-charcoal-300', icon: XCircle },
};

const channelConfig: Record<Lead['channel'], string> = {
  'AI Doradca': 'text-rosegold-500',
  'Profil chirurga': 'text-champagne-700',
  'Magazyn': 'text-charcoal-600',
  'Telekonsultacja': 'text-burgundy-500',
  'Bezpośredni': 'text-charcoal-700',
  'Medical Tourism': 'text-champagne-600',
};

export default function LeadyPage() {
  const [activeFilter, setActiveFilter] = useState<Lead['status'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>(leads[0].id);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (activeFilter !== 'all' && l.status !== activeFilter) return false;
      if (search && !`${l.name} ${l.procedure} ${l.city}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [activeFilter, search]);

  const counts = useMemo(() => ({
    all: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    booked: leads.filter((l) => l.status === 'booked').length,
    lost: leads.filter((l) => l.status === 'lost').length,
  }), []);

  const selected = filtered.find((l) => l.id === selectedId) ?? filtered[0] ?? leads[0];

  return (
    <div className="p-6 md:p-10 max-w-[1600px]">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>CRM · Leady</Eyebrow>
            <h1 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-2">
              Zapytania pacjentek
            </h1>
            <p className="font-serif-editorial italic text-charcoal-500 mt-2">
              {counts.new} nowych zapytań · średni czas odpowiedzi 2h 14min · konwersja 38%
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <ButtonGold size="sm">Eksportuj CSV</ButtonGold>
            <ButtonPrimary size="sm">+ Dodaj manualnie</ButtonPrimary>
          </div>
        </div>

        {/* KPI strip */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <MiniStat label="Nowe (24h)" value="12" delta="+3" />
          <MiniStat label="Zakwalifikowane" value={String(counts.qualified)} delta="+2" />
          <MiniStat label="Konwersja" value="38%" delta="+4%" />
          <MiniStat label="Przychód (28 dni)" value="284 tys." accent />
        </div>
      </header>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-5 border-b border-champagne-500/30 overflow-x-auto">
        <FilterTab active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} label="Wszystkie" count={counts.all} />
        <FilterTab active={activeFilter === 'new'} onClick={() => setActiveFilter('new')} label="Nowe" count={counts.new} variant="primary" />
        <FilterTab active={activeFilter === 'contacted'} onClick={() => setActiveFilter('contacted')} label="W kontakcie" count={counts.contacted} />
        <FilterTab active={activeFilter === 'qualified'} onClick={() => setActiveFilter('qualified')} label="Zakwalifikowane" count={counts.qualified} />
        <FilterTab active={activeFilter === 'booked'} onClick={() => setActiveFilter('booked')} label="Umówione" count={counts.booked} />
        <FilterTab active={activeFilter === 'lost'} onClick={() => setActiveFilter('lost')} label="Utracone" count={counts.lost} />
      </div>

      {/* Search + filters bar */}
      <div className="mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po imieniu, zabiegu, mieście..."
            className="input-editorial pl-9"
          />
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-3.5 border border-champagne-500/40 text-xs text-charcoal-700 hover:bg-champagne-500/10">
          <Filter size={13} strokeWidth={1.5} />
          Filtry
          <ChevronDown size={12} strokeWidth={1.5} />
        </button>
        <button className="inline-flex items-center gap-2 h-10 px-3.5 border border-champagne-500/40 text-xs text-charcoal-700 hover:bg-champagne-500/10">
          <Tag size={13} strokeWidth={1.5} />
          Kanał
          <ChevronDown size={12} strokeWidth={1.5} />
        </button>
        <button className="inline-flex items-center gap-2 h-10 px-3.5 border border-champagne-500/40 text-xs text-charcoal-700 hover:bg-champagne-500/10">
          <Building2 size={13} strokeWidth={1.5} />
          Chirurg
          <ChevronDown size={12} strokeWidth={1.5} />
        </button>
        <div className="ml-auto text-[11px] text-charcoal-500 font-serif-editorial italic">
          Pokazano {filtered.length} z {leads.length}
        </div>
      </div>

      {/* Two-pane layout: list + detail */}
      <div className="grid lg:grid-cols-[420px_1fr] gap-5 bg-surface-card border-t border-champagne-500/80 min-h-[640px]">
        {/* Lead list */}
        <ul className="border-r border-champagne-500/20 max-h-[80vh] overflow-y-auto">
          {filtered.map((lead) => {
            const cfg = statusConfig[lead.status];
            const Icon = cfg.icon;
            const isActive = selectedId === lead.id;
            return (
              <li key={lead.id}>
                <button
                  onClick={() => setSelectedId(lead.id)}
                  className={cn(
                    'w-full text-left px-5 py-4 border-b border-champagne-500/15 transition-colors relative',
                    isActive ? 'bg-champagne-500/10' : 'hover:bg-nude-50',
                    lead.unread && 'border-l-2 border-l-burgundy-500'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-champagne-500/30 to-burgundy-500/20 flex items-center justify-center font-display text-sm text-charcoal-800 flex-shrink-0">
                      {lead.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className={cn('font-display text-sm text-charcoal-800 truncate', lead.unread && 'font-semibold')}>
                          {lead.name}
                        </h3>
                        <span className="text-[10px] text-charcoal-400 flex-shrink-0">{lead.timeAgo}</span>
                      </div>
                      <p className="text-xs text-charcoal-600 mt-0.5 truncate">{lead.procedure}</p>

                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] uppercase tracking-widest font-semibold border', cfg.bg, cfg.color)}>
                          <Icon size={9} strokeWidth={2} />
                          {cfg.label}
                        </span>
                        <span className={cn('text-[10px] uppercase tracking-wider font-medium', channelConfig[lead.channel])}>
                          {lead.channel}
                        </span>
                      </div>

                      {/* AI score bar */}
                      <div className="mt-2.5 flex items-center gap-2">
                        <Sparkles size={9} strokeWidth={1.5} className="text-rosegold-500" />
                        <div className="flex-1 h-0.5 bg-charcoal-100">
                          <div className="h-full bg-gradient-to-r from-rosegold-500 to-champagne-500" style={{ width: `${lead.aiScore}%` }} />
                        </div>
                        <span className="text-[9px] tabular-nums text-charcoal-500 font-semibold">{lead.aiScore}</span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-5 py-16 text-center text-sm text-charcoal-500 font-serif-editorial italic">
              Brak zapytań pasujących do filtrów.
            </li>
          )}
        </ul>

        {/* Lead detail */}
        <div className="p-6 md:p-8">
          <LeadDetail lead={selected} />
        </div>
      </div>
    </div>
  );
}

function LeadDetail({ lead }: { lead: Lead }) {
  const cfg = statusConfig[lead.status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-champagne-500/30">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-champagne-500/40 to-burgundy-500/20 flex items-center justify-center font-display text-lg text-charcoal-800">
            {lead.initials}
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-2xl text-charcoal-800">{lead.name}</h2>
              <span className="text-sm text-charcoal-500 tabular-nums">· {lead.age} lat</span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-charcoal-500">
              <span className="flex items-center gap-1"><MapPin size={11} strokeWidth={1.5} />{lead.city}</span>
              <span>·</span>
              <span className="tabular-nums">{lead.id}</span>
              <span>·</span>
              <span className="font-serif-editorial italic">{lead.timeAgo}</span>
            </div>
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <span className={cn('inline-flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-widest font-semibold border', cfg.bg, cfg.color)}>
                {cfg.label}
              </span>
              <AIMatchBadge percentage={lead.aiScore} variant="inline" />
              <span className={cn('text-[10px] uppercase tracking-widest font-semibold', channelConfig[lead.channel])}>
                via {lead.channel}
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 text-charcoal-500 hover:text-charcoal-800">
          <MoreHorizontal size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <ActionTile icon={Phone} label="Zadzwoń" sublabel="+48 ••• ••• 142" />
        <ActionTile icon={Mail} label="E-mail" sublabel="Szablon odpowiedzi" primary />
        <ActionTile icon={Video} label="Telekonsultacja" sublabel="Umów wideo" />
        <ActionTile icon={Calendar} label="Wizyta" sublabel="Otwórz kalendarz" />
      </div>

      {/* Patient details */}
      <div className="grid md:grid-cols-2 gap-4">
        <InfoBlock title="Zainteresowanie">
          <InfoRow label="Zabieg" value={lead.procedure} />
          {lead.surgeon && <InfoRow label="Preferowany chirurg" value={lead.surgeon} />}
          <InfoRow label="Budżet" value={lead.budget} />
          {lead.preferredDate && <InfoRow label="Preferowany termin" value={lead.preferredDate} />}
        </InfoBlock>
        <InfoBlock title="AI Insight">
          <div className="flex items-start gap-2 mb-3">
            <Sparkles size={13} strokeWidth={1.5} className="text-rosegold-500 mt-0.5" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-rosegold-500 font-semibold">Trafność AI</div>
              <div className="font-display text-2xl text-charcoal-800 tabular-nums">{lead.aiScore}/100</div>
            </div>
          </div>
          <p className="text-xs text-charcoal-600 leading-relaxed font-serif-editorial italic">
            {lead.aiScore >= 90 ? 'Bardzo wysokie dopasowanie. Pacjentka aktywnie poszukuje terminu, gotowa do decyzji w ciągu 14 dni.'
              : lead.aiScore >= 80 ? 'Wysokie dopasowanie. Sugerujemy szybki kontakt w ciągu 24h.'
              : 'Średnie dopasowanie. Pacjentka w fazie eksploracji — przygotuj materiały edukacyjne.'}
          </p>
        </InfoBlock>
      </div>

      {/* Message */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-display text-base text-charcoal-800">Wiadomość pacjentki</h3>
          <span className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold">{lead.timeAgo}</span>
        </div>
        <blockquote className="px-5 py-4 bg-nude-100 border-l-2 border-champagne-500 font-serif-editorial italic text-sm text-charcoal-700 leading-relaxed">
          „{lead.message}"
        </blockquote>
      </div>

      {/* Reply box */}
      <div className="border border-champagne-500/30 bg-nude-50">
        <div className="px-4 py-2.5 border-b border-champagne-500/20 flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold">
            Odpowiedz pacjentce
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[11px] text-rosegold-500 hover:text-rosegold-600 inline-flex items-center gap-1">
              <Sparkles size={11} strokeWidth={1.5} />
              AI sugeruje odpowiedź
            </button>
          </div>
        </div>
        <textarea
          rows={4}
          placeholder="Napisz odpowiedź..."
          defaultValue={`Dzień dobry ${lead.name.split(' ')[0]},\n\ndziękujemy za zainteresowanie. Cieszę się, że trafiła Pani do nas w sprawie ${lead.procedure}.`}
          className="w-full bg-transparent px-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none resize-none"
        />
        <div className="px-4 py-2.5 border-t border-champagne-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <button className="text-charcoal-500 hover:text-charcoal-800 px-2 py-1 border border-champagne-500/30">+ Szablon</button>
            <button className="text-charcoal-500 hover:text-charcoal-800 px-2 py-1 border border-champagne-500/30">+ Załącznik</button>
          </div>
          <ButtonPrimary size="sm" icon={<Reply size={12} strokeWidth={1.75} />}>
            Wyślij odpowiedź
          </ButtonPrimary>
        </div>
      </div>

      {/* Activity timeline */}
      <div>
        <h3 className="font-display text-base text-charcoal-800 mb-3">Historia kontaktu</h3>
        <ul className="space-y-3">
          <TimelineItem icon={Inbox} time={lead.timeAgo} title="Zapytanie utworzone" description={`via ${lead.channel}`} />
          <TimelineItem icon={Sparkles} time={lead.timeAgo} title="AI Score wyliczony" description={`Trafność ${lead.aiScore}/100`} accent />
          {lead.status !== 'new' && <TimelineItem icon={Mail} time="2h temu" title="Wysłano potwierdzenie odbioru" description={`Auto-reply · szablon „Powitanie"`} />}
          {(lead.status === 'qualified' || lead.status === 'booked') && <TimelineItem icon={Phone} time="3h temu" title="Pierwszy kontakt telefoniczny" description="Recepcjonistka · 12 min" />}
          {lead.status === 'booked' && <TimelineItem icon={CheckCircle2} time="6h temu" title="Wizyta umówiona" description={`${lead.preferredDate} · ${lead.surgeon ?? 'Dyżurujący chirurg'}`} />}
        </ul>
      </div>
    </div>
  );
}

/* ─────── Atoms ─────── */
function FilterTab({ active, onClick, label, count, variant }: { active: boolean; onClick: () => void; label: string; count: number; variant?: 'primary' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center gap-2 px-4 py-3 text-xs font-medium transition-colors whitespace-nowrap',
        active
          ? 'text-burgundy-500 border-b-2 border-burgundy-500 -mb-px'
          : 'text-charcoal-600 hover:text-charcoal-800 border-b-2 border-transparent'
      )}
    >
      {label}
      <span className={cn(
        'text-[10px] tabular-nums px-1.5 py-0.5 rounded-sm font-semibold',
        active ? 'bg-burgundy-500 text-nude-50' :
        variant === 'primary' ? 'bg-burgundy-500/15 text-burgundy-500' :
        'bg-charcoal-100 text-charcoal-600'
      )}>
        {count}
      </span>
    </button>
  );
}

function MiniStat({ label, value, delta, accent }: { label: string; value: string; delta?: string; accent?: boolean }) {
  return (
    <div className="px-4 py-3 bg-surface-card border-t border-champagne-500/60">
      <div className="text-[9px] uppercase tracking-widest text-charcoal-500 font-semibold mb-1">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className={cn('font-display text-xl tabular-nums', accent ? 'text-champagne-700' : 'text-charcoal-800')}>{value}</span>
        {delta && (
          <span className={cn('text-[10px] px-1 py-0.5 rounded-sm font-medium tabular-nums', delta.startsWith('+') ? 'text-champagne-700 bg-champagne-500/15' : 'text-burgundy-500 bg-burgundy-500/10')}>
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}

function ActionTile({ icon: Icon, label, sublabel, primary }: { icon: any; label: string; sublabel: string; primary?: boolean }) {
  return (
    <button className={cn(
      'group p-3 border text-left transition-colors',
      primary ? 'bg-burgundy-500 border-burgundy-500 text-nude-50 hover:bg-burgundy-600' : 'border-champagne-500/40 hover:bg-champagne-500/10'
    )}>
      <Icon size={14} strokeWidth={1.5} className={cn('mb-2', primary ? 'text-nude-50' : 'text-champagne-700')} />
      <div className={cn('text-xs font-medium', primary ? 'text-nude-50' : 'text-charcoal-800')}>{label}</div>
      <div className={cn('text-[10px] font-serif-editorial italic mt-0.5', primary ? 'text-nude-200' : 'text-charcoal-500')}>{sublabel}</div>
    </button>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 bg-nude-100 border border-champagne-500/20">
      <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-3">{title}</div>
      <div className="space-y-2 text-xs">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold flex-shrink-0">{label}</dt>
      <dd className="text-charcoal-800 text-right">{value}</dd>
    </div>
  );
}

function TimelineItem({ icon: Icon, time, title, description, accent }: { icon: any; time: string; title: string; description: string; accent?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <div className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
        accent ? 'bg-rosegold-500/15 text-rosegold-500' : 'bg-champagne-500/15 text-champagne-700'
      )}>
        <Icon size={12} strokeWidth={1.5} />
      </div>
      <div className="flex-1 pb-1">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="text-xs font-medium text-charcoal-800">{title}</h4>
          <span className="text-[10px] text-charcoal-400">{time}</span>
        </div>
        <p className="text-[11px] text-charcoal-500 font-serif-editorial italic mt-0.5">{description}</p>
      </div>
    </li>
  );
}
