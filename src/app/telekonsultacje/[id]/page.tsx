import { notFound } from 'next/navigation';
import { teleconsultations, surgeons } from '@/data/mock';
import { TelekonsultacjaRoomClient } from '@/components/video/TelekonsultacjaRoomClient';

type Props = { params: Promise<{ id: string }> };

export default async function TelekonsultacjaRoom({ params }: Props) {
  const { id } = await params;
  const session = teleconsultations.find((t) => t.id === id);
  if (!session) notFound();

  const surgeon = surgeons.find((s) => s.slug === session.surgeonSlug) ?? surgeons[0];

  return (
    <TelekonsultacjaRoomClient
      session={{
        id: session.id,
        topic: session.topic,
        patientName: session.patientName,
      }}
      surgeon={{
        slug: surgeon.slug,
        name: surgeon.name,
        initials: surgeon.initials,
        specialty: surgeon.specialty,
        city: surgeon.city,
        aiMatch: surgeon.aiMatch,
      }}
    />
  );
}
