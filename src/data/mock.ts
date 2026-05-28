// Mock data for ChirurgiaPiekna marketplace

export type Surgeon = {
  slug: string;
  name: string;
  age: number;
  specialty: string;
  procedures: string[];
  city: string;
  rating: number;
  reviewCount: number;
  consultationPrice: number;
  aiMatch: number;
  verified: boolean;
  experience: number;
  patientsCount: number;
  initials: string;
  badge?: 'board-certified' | 'premium' | 'medical-tourism';
};

export const surgeons: Surgeon[] = [
  { slug: 'dr-anna-kowalska', name: 'Dr Anna Kowalska', age: 42, specialty: 'Chirurg plastyczny', procedures: ['Rhinoplastyka', 'Lifting twarzy'], city: 'Warszawa', rating: 4.9, reviewCount: 847, consultationPrice: 450, aiMatch: 94, verified: true, experience: 14, patientsCount: 2400, initials: 'AK', badge: 'premium' },
  { slug: 'dr-tomasz-wisniewski', name: 'Dr Tomasz Wiśniewski', age: 47, specialty: 'Chirurg plastyczny', procedures: ['Powiększanie piersi', 'Liposukcja'], city: 'Kraków', rating: 4.8, reviewCount: 612, consultationPrice: 500, aiMatch: 92, verified: true, experience: 18, patientsCount: 3100, initials: 'TW', badge: 'board-certified' },
  { slug: 'dr-maria-nowak', name: 'Dr Maria Nowak', age: 50, specialty: 'Chirurg plastyczny', procedures: ['Blefaroplastyka', 'Lifting'], city: 'Wrocław', rating: 4.7, reviewCount: 423, consultationPrice: 480, aiMatch: 89, verified: true, experience: 22, patientsCount: 2800, initials: 'MN', badge: 'premium' },
  { slug: 'dr-piotr-kaminski', name: 'Dr Piotr Kamiński', age: 39, specialty: 'Chirurg plastyczny', procedures: ['Powiększanie piersi', 'Lipotransfer'], city: 'Poznań', rating: 4.9, reviewCount: 512, consultationPrice: 520, aiMatch: 95, verified: true, experience: 11, patientsCount: 1700, initials: 'PK', badge: 'board-certified' },
  { slug: 'dr-agnieszka-zajac', name: 'Dr Agnieszka Zając', age: 45, specialty: 'Chirurg plastyczny', procedures: ['Liposukcja', 'Blefaroplastyka'], city: 'Gdańsk', rating: 4.6, reviewCount: 385, consultationPrice: 420, aiMatch: 88, verified: true, experience: 16, patientsCount: 2100, initials: 'AZ', badge: 'premium' },
  { slug: 'dr-jan-kowalczyk', name: 'Dr Jan Kowalczyk', age: 48, specialty: 'Chirurg plastyczny', procedures: ['Lifting twarzy', 'Rhinoplastyka'], city: 'Warszawa', rating: 4.8, reviewCount: 701, consultationPrice: 600, aiMatch: 93, verified: true, experience: 20, patientsCount: 2900, initials: 'JK', badge: 'medical-tourism' },
  { slug: 'dr-ewa-wisniewska', name: 'Dr Ewa Wiśniewska', age: 41, specialty: 'Medycyna estetyczna', procedures: ['Botoks', 'Kwas hialuronowy'], city: 'Łódź', rating: 4.9, reviewCount: 588, consultationPrice: 380, aiMatch: 91, verified: true, experience: 13, patientsCount: 3500, initials: 'EW', badge: 'premium' },
  { slug: 'dr-marek-kaminski', name: 'Dr Marek Kamiński', age: 52, specialty: 'Chirurg plastyczny', procedures: ['Korekta uszu', 'Lifting szyi'], city: 'Warszawa', rating: 4.7, reviewCount: 412, consultationPrice: 550, aiMatch: 90, verified: true, experience: 24, patientsCount: 3200, initials: 'MK', badge: 'board-certified' },
  { slug: 'dr-michal-kowalski', name: 'Dr Michał Kowalski', age: 46, specialty: 'Chirurg plastyczny', procedures: ['Rhinoplastyka ultrasonograficzna', 'Lifting twarzy'], city: 'Warszawa', rating: 4.9, reviewCount: 847, consultationPrice: 450, aiMatch: 96, verified: true, experience: 17, patientsCount: 2400, initials: 'MK', badge: 'premium' },
];

export type Procedure = {
  slug: string;
  name: string;
  category: string;
  duration: string;
  recovery: string;
  priceMin: number;
  priceMax: number;
  anesthesia: string;
  shortDescription: string;
};

export const procedures: Procedure[] = [
  { slug: 'rhinoplastyka-ultrasonograficzna', name: 'Rhinoplastyka ultrasonograficzna', category: 'Twarz', duration: '2-2.5h', recovery: '10-14 dni', priceMin: 18500, priceMax: 22000, anesthesia: 'ogólna', shortDescription: 'Korekta kształtu i funkcji nosa z użyciem technologii ultrasonograficznej.' },
  { slug: 'powiekszanie-piersi', name: 'Powiększanie piersi implantami', category: 'Ciało', duration: '1.5-2h', recovery: '14-21 dni', priceMin: 20000, priceMax: 26500, anesthesia: 'ogólna', shortDescription: 'Implanty anatomiczne najnowszej generacji z certyfikatem FDA.' },
  { slug: 'liposukcja-vaser', name: 'Liposukcja VASER Lipo', category: 'Ciało', duration: '2-3h', recovery: '10-14 dni', priceMin: 14000, priceMax: 18000, anesthesia: 'ogólna', shortDescription: 'Precyzyjne usuwanie tkanki tłuszczowej z technologią ultradźwiękową.' },
  { slug: 'facelift-smas', name: 'Facelift (SMAS)', category: 'Twarz', duration: '3-4h', recovery: '14-21 dni', priceMin: 28000, priceMax: 35000, anesthesia: 'ogólna', shortDescription: 'Głęboki lifting twarzy w technologii SMAS — efekt na 10-15 lat.' },
  { slug: 'blepharoplastyka-gornych', name: 'Blepharoplastyka powiek górnych', category: 'Twarz', duration: '1-1.5h', recovery: '7-10 dni', priceMin: 8000, priceMax: 12000, anesthesia: 'miejscowa', shortDescription: 'Korekta opadających powiek górnych — otwarcie spojrzenia.' },
  { slug: 'abdominoplastyka', name: 'Abdominoplastyka', category: 'Ciało', duration: '3-4h', recovery: '14-28 dni', priceMin: 22000, priceMax: 28000, anesthesia: 'ogólna', shortDescription: 'Plastyka brzucha — odzyskaj smukłą sylwetkę po ciąży lub redukcji wagi.' },
  { slug: 'lifting-szyi', name: 'Lifting szyi', category: 'Twarz', duration: '2-2.5h', recovery: '10-14 dni', priceMin: 16000, priceMax: 20000, anesthesia: 'ogólna', shortDescription: 'Odmłodzenie linii szyi i podbródka.' },
  { slug: 'korekta-uszu', name: 'Korekta uszu (otoplastyka)', category: 'Twarz', duration: '1h', recovery: '7-10 dni', priceMin: 6000, priceMax: 8000, anesthesia: 'miejscowa', shortDescription: 'Dyskretna korekta odstających uszu — w pełni naturalny efekt.' },
];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  author: string;
  date: string;
  readTime: string;
  premium?: boolean;
  imageSeed: string;
};

export const articles: Article[] = [
  { slug: 'rhinoplastyka-ultrasonograficzna-rewolucja', title: 'Dlaczego rhinoplastyka ultrasonograficzna zmienia rynek', excerpt: 'Pierwsza dekada XXI wieku należała do rhinoplastyki klasycznej. Dziś technologia ultrasonograficzna oferuje precyzję, której wcześniej nie znaliśmy.', eyebrow: 'ANALIZA · 12 MIN', author: 'Dr Maria Wiśniewska', date: '24 listopada 2026', readTime: '12 min', premium: true, imageSeed: 'beauty-portrait-1' },
  { slug: 'najlepsze-kliniki-premium-warszawa-2026', title: 'Najlepsze kliniki premium w Warszawie 2026', excerpt: 'Subiektywny ranking redakcji Aesthetic Insight — 12 klinik, w których architektura i medycyna spotykają się na najwyższym poziomie.', eyebrow: 'REPORTAŻ', author: 'Redakcja', date: '20 listopada 2026', readTime: '18 min', imageSeed: 'clinic-interior' },
  { slug: 'ai-w-medycynie-estetycznej-5-narzedzi', title: 'AI w medycynie estetycznej: 5 narzędzi, które warto znać', excerpt: 'Sztuczna inteligencja przestała być science-fiction. Dziś realnie wspiera konsultacje, analizę twarzy i planowanie zabiegów.', eyebrow: 'AI TREND REPORT', author: 'Tomasz Lewandowski', date: '18 listopada 2026', readTime: '10 min', imageSeed: 'ai-gold-silk' },
  { slug: 'co-czeka-medycyne-estetyczna-2026', title: 'Co czeka medycynę estetyczną w 2026?', excerpt: 'Trendy, technologie i społeczne oczekiwania — kompleksowa analiza nadchodzącego roku.', eyebrow: 'TRENDY 2026', author: 'Dr Maria Wiśniewska', date: '15 listopada 2026', readTime: '24 min', premium: true, imageSeed: 'aesthetic-medicine' },
  { slug: 'medical-tourism-polska-trend', title: 'Medical tourism w Polsce — dlaczego pacjentki z Europy wybierają Warszawę', excerpt: 'Polska stała się jednym z najgorętszych kierunków medical tourism w Europie. Co przyciąga pacjentki z Niemiec, UK i Skandynawii?', eyebrow: 'REPORTAŻ', author: 'Redakcja', date: '12 listopada 2026', readTime: '15 min', imageSeed: 'medical-tourism' },
  { slug: 'jak-rozpoznac-dobrego-chirurga', title: 'Jak rozpoznać naprawdę dobrego chirurga plastycznego', excerpt: 'Certyfikaty, doświadczenie, before/after — przewodnik redakcji po sztuce wyboru właściwego specjalisty.', eyebrow: 'PORADNIK', author: 'Anna Kwiatkowska', date: '8 listopada 2026', readTime: '14 min', imageSeed: 'surgeon-portrait' },
];

export const cities = [
  { name: 'Warszawa', count: 124 },
  { name: 'Kraków', count: 98 },
  { name: 'Wrocław', count: 76 },
  { name: 'Poznań', count: 62 },
  { name: 'Gdańsk', count: 45 },
  { name: 'Łódź', count: 38 },
  { name: 'Katowice', count: 31 },
];

export const procedureCategories = [
  { name: 'Twarz', count: 18, icon: '◐' },
  { name: 'Piersi', count: 8, icon: '◇' },
  { name: 'Ciało', count: 14, icon: '◯' },
  { name: 'Medycyna estetyczna', count: 22, icon: '◑' },
];

export const beforeAfterCases = [
  { id: '247', procedure: 'Rhinoplastyka ultrasonograficzna', surgeon: 'Dr Michał Kowalski', age: 32, timeAfter: '12 miesięcy', rating: 4.9, type: 'profile' },
  { id: '189', procedure: 'Lipotransfer dłoni', surgeon: 'Dr Maria Wiśniewska', age: 48, timeAfter: '6 miesięcy', rating: 4.9, type: 'hands' },
  { id: '156', procedure: 'Rhinoplastyka', surgeon: 'Dr Anna Malinowska', age: 28, timeAfter: '6 miesięcy', rating: 4.9, type: 'profile' },
  { id: '203', procedure: 'Powiększanie piersi', surgeon: 'Dr Krzysztof Nowak', age: 35, timeAfter: '6 miesięcy', rating: 4.9, type: 'silhouette' },
  { id: '178', procedure: 'Lifting twarzy', surgeon: 'Dr Tomasz Wiśniewski', age: 52, timeAfter: '9 miesięcy', rating: 4.8, type: 'profile' },
  { id: '301', procedure: 'Blepharoplastyka', surgeon: 'Dr Maria Nowak', age: 45, timeAfter: '3 miesiące', rating: 4.9, type: 'eyes' },
  { id: '267', procedure: 'Liposukcja', surgeon: 'Dr Piotr Kamiński', age: 38, timeAfter: '6 miesięcy', rating: 4.8, type: 'silhouette' },
  { id: '212', procedure: 'Korekta sylwetki', surgeon: 'Dr Agnieszka Zając', age: 41, timeAfter: '12 miesięcy', rating: 4.9, type: 'back' },
];

export const reviews = [
  { initials: 'MW', name: 'Maria W.', age: 41, procedure: 'Rhinoplastyka', timeAgo: '8 miesięcy temu', rating: 5, verified: true, hasPhoto: false, body: 'Profesjonalizm na najwyższym poziomie. Efekt przerósł moje oczekiwania. Opieka pooperacyjna była znakomita, a zespół zawsze dostępny. Czuję się jak nowa osoba, a powrót do zdrowia był szybszy niż się spodziewałam.' },
  { initials: 'KB', name: 'Mania K.', age: 36, procedure: 'Rhinoplastyka', timeAgo: '8 miesięcy temu', rating: 5, verified: true, hasPhoto: true, body: 'Profesjonalizm na najwyższym poziomie. Efekt przerósł moje oczekiwania. Opieka pooperacyjna była znakomita, a zespół zawsze dostępny. Czuję się jak nowa osoba, a powrót do zdrowia był szybszy niż się spodziewałam.' },
  { initials: 'PJ', name: 'Anna K.', age: 41, procedure: 'Rhinoplastyka', timeAgo: '8 miesięcy temu', rating: 5, verified: true, hasPhoto: false, body: 'Profesjonalizm na najwyższym poziomie. Efekt przerósł moje oczekiwania. Opieka pooperacyjna była znakomita, a zespół zawsze dostępny. Czuję się jak nowa osoba, a powrót do zdrowia był szybszy niż się spodziewałam.' },
];

export const aiMatcherSteps = [
  { id: 1, question: 'Jakie są Twoje główne oczekiwania?', options: ['Subtelna zmiana', 'Wyrazista metamorfoza', 'Korekta funkcji', 'Odmłodzenie'] },
  { id: 2, question: 'Jak wygląda Twój styl życia?', options: ['Praca w domu', 'Praca biurowa', 'Praca publiczna', 'Sport / aktywny'] },
  { id: 3, question: 'Co najbardziej chciałabyś zmienić?', options: ['Nos / Profil', 'Oczy / Powieki', 'Usta / Uśmiech', 'Żuchwa / Kontur', 'Piersi', 'Ciało / Kontur'] },
  { id: 4, question: 'Jaki jest Twój budżet?', options: ['5-10 tys. zł', '10-20 tys. zł', '20-35 tys. zł', '35+ tys. zł'] },
  { id: 5, question: 'Ile czasu możesz poświęcić na rekonwalescencję?', options: ['Do tygodnia', '2 tygodnie', '3-4 tygodnie', 'Bez ograniczeń'] },
  { id: 6, question: 'W jakim mieście planujesz zabieg?', options: ['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Inne / Medical tourism'] },
  { id: 7, question: 'Czy miałaś już wcześniej zabieg estetyczny?', options: ['Nie, to mój pierwszy', 'Tak, medycyna estetyczna', 'Tak, chirurgia plastyczna', 'Wolę nie odpowiadać'] },
];
