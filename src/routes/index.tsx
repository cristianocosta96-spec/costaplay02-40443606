import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Flame,
  Star,
  Sparkles,
  Heart,
  LayoutGrid,
  Tv,
  MonitorPlay,
  Smartphone,
  MessageCircle,
  Film,
  Smile,
  Trophy,
  Radio,
  Check,
  BadgeCheck,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Costa Play — Filmes, Séries e Canais ao Vivo" },
      {
        name: "description",
        content:
          "Assista filmes, séries, doramas, futebol e +1.000 canais ao vivo na sua TV, TV Box, Fire Stick e celular.",
      },
      { property: "og:title", content: "Costa Play — Filmes, Séries e Canais ao Vivo" },
      {
        property: "og:description",
        content: "Mais de 130 mil conteúdos em SD/HD/FHD/4K. Assine já!",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BRAND = "MULTIPLAYER";
const WA = "https://wa.me/5519989559619?text=";
const waLink = (msg: string) => WA + encodeURIComponent(msg);
const CONTACT = waLink("Olá, tenho interesse e gostaria de mais informações.");
const HEADER_CTA = waLink("Olá, gostaria de mais informações por favor.");

const posterModules = import.meta.glob<{ default: { url: string } }>(
  "@/assets/posters/*.asset.json",
  { eager: true },
);
const posters = (prefix: string) =>
  Array.from({ length: 10 }, (_, i) => {
    const k = Object.keys(posterModules).find((p) =>
      p.endsWith(`/${prefix}-${i + 1}.png.asset.json`),
    );
    return k ? (posterModules[k]?.default.url ?? "") : "";
  });

const trending = [
  "x8lAJde9fcXBFv5M2cOEv4YpIs5",
  "l8tUMXgpEtSHuHjipX3rrOtCfe1",
  "a1pgQeEge47xrS4jGlDwIHiieVK",
  "wUc6IDf5ChjM1UyQye21qFBeJY0",
  "1z9haN6yiYsuv9D93H8n5yaCk8I",
  "1TzKDW1Sxm1EiUu0QUQfx8oZiJ5",
  "rCYQGHdoz7qwYsb6wXETJfUfDLX",
  "pmff1wjKrgJi92PPr346lAifzlg",
  "enAg3vCYWNO2pNpmededpdmrWD6",
  "nMUcWDevmYy4gM0L5ZAt2OBFACC",
  "dueFqKLvjftnELZaGYwY7xinfaI",
  "ftPFJBGbldoWiiPrmesW96zBzdH",
  "iILiJSRViTEcF23MHhGCbVm3mfW",
  "slxZZUvx861VpGvI8ugBXp2nTiz",
  "7pIgFNoX07z7alHt73TSsKRtYye",
  "b3WeTp42eJSRuE4UZfyPCOJW4c",
].map((id) => `https://image.tmdb.org/t/p/w500/${id}.jpg`);

type Plan = {
  name: string;
  price: string;
  period: string;
  cta: string;
  gold?: boolean;
  badge?: string;
};
const plans: Plan[] = [
  { name: "Plano Mensal", price: "34,90", period: "/mês", cta: "ASSINAR MENSAL" },
  {
    name: "Plano Trimestral",
    price: "89,90",
    period: "/trimestre",
    cta: "ASSINAR TRIMESTRAL",
    gold: true,
    badge: "Mais economia para você!",
  },
  {
    name: "Plano Semestral",
    price: "169,90",
    period: "/semestre",
    cta: "QUERO ASSINAR AGORA!",
    badge: "Melhor custo benefício!",
  },
];
const planLink = (p: Plan) =>
  waLink(
    `Olá! 👋 Tenho interesse no *${p.name}* (R$ ${p.price}${p.period}) da Costa Play. 🎬\n\nPodem me passar as informações para assinar? 😊`,
  );

const features = [
  "+130 mil conteúdos",
  "Canais adultos (opcional)",
  "Qualidade SD/HD/FHD/4K",
  "Lançamentos em primeira mão",
  "Suporte VIP 24h prioritário",
];
const reviews: [string, string, number, string][] = [
  [
    "Carlos Henrique",
    "@carloshs",
    12,
    "O melhor aplicativo que já usei! Imagem em FHD e nunca trava. Recomendo demais.",
  ],
  [
    "Mariana Souza",
    "@mari.souza",
    47,
    "Aplicativo bem completo, tem tudo que eu procurava. Filmes, séries e canais ao vivo num só lugar.",
  ],
  [
    "Rafael Almeida",
    "@rafa.almeida",
    33,
    "Os lançamentos vêm rápido demais! Saiu no cinema, em poucos dias já tá lá pra assistir.",
  ],
  [
    "Juliana Costa",
    "@ju.costa",
    45,
    "Os jogos ao vivo rodam liso, sem travar e em qualidade FHD. Assisto Brasileirão todo fim de semana.",
  ],
  [
    "Pedro Martins",
    "@pedrinhomtz",
    15,
    "Suporte rápido no WhatsApp e funcionou de primeira na minha TV Box. Vale cada centavo.",
  ],
  [
    "Aline Ribeiro",
    "@aline.rib",
    49,
    "Meus filhos amaram os canais infantis e eu economizei muito cancelando outras assinaturas.",
  ],
];
const toasts: [string, string, string, number][] = [
  ["Lucas Ferreira", "Plano Premium", "BA", 11],
  ["Fernanda Lima", "Plano Trimestral", "SP", 44],
  ["Bruno Carvalho", "Plano Semestral", "RJ", 13],
  ["Patrícia Gomes", "Plano Mensal", "MG", 41],
  ["Diego Rocha", "Plano Trimestral", "PR", 52],
  ["Camila Alves", "Plano Kids", "RS", 25],
];

function GlowButton({
  children,
  className = "",
  glow = true,
  href,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  href: string;
}) {
  return (
    <Button
      asChild
      variant="costa"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold uppercase text-primary-foreground shadow-glow transition-transform hover:scale-105 ${glow ? "animate-pulse-glow" : ""} ${className}`}
    >
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    </Button>
  );
}

function Row({
  icon,
  title,
  text,
  images,
  reverse,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  images: string[];
  reverse?: boolean;
}) {
  return (
    <section className="py-6">
      <div className="px-6">
        <h2 className="flex items-center gap-3 text-4xl font-extrabold">
          <span className="flex gap-2 text-primary">{icon}</span>
          {title}
        </h2>
        <p className="mt-2 text-muted-foreground">{text}</p>
      </div>
      <div className="mt-6 overflow-hidden">
        <div
          className={`flex w-max gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        >
          {[...images, ...images].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="h-80 w-56 rounded-xl border border-border object-cover transition-transform hover:scale-105"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Toast() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % toasts.length), 6000);
    return () => clearInterval(t);
  }, []);
  const toast = toasts[i] ?? toasts[0];
  if (!toast) return null;
  const [name, plan, uf, img] = toast;
  return (
    <div
      key={i}
      className="subscription-toast fixed bottom-4 left-4 z-50 flex animate-toast-in items-center gap-3 rounded-2xl border border-primary/60 bg-card px-4 py-3 shadow-glow"
    >
      <img src={`https://i.pravatar.cc/120?img=${img}`} alt="" className="h-10 w-10 rounded-full" />
      <div className="text-xs">
        <p className="flex items-center gap-1 text-sm font-bold">
          {name} <BadgeCheck className="h-4 w-4 text-primary" />
        </p>
        <p className="text-muted-foreground">
          acabou de assinar o {plan} • {uf}
        </p>
        <p className="text-muted-foreground/70">há instantes</p>
      </div>
    </div>
  );
}

function Index() {
  const plan = plans[0];
  if (!plan) return null;
  const firstPlan = planLink(plan);
  const half = Math.floor(trending.length / 2);
  const rowB = [...trending.slice(4), ...trending.slice(0, 4)];
  const rowC = [...trending.slice(half), ...trending.slice(0, half)];

  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-primary/60 bg-background/90 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-2">
          <a href="#top">
            <img
              src="/favicon.png"
              alt="Costa Play"
              className="h-14 w-14 rounded-full object-cover"
            />
          </a>
          <GlowButton href={HEADER_CTA} glow={false} className="animate-zoom px-6 py-2">
            ASSINAR AGORA
          </GlowButton>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pb-24 pt-16 text-center">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 opacity-30">
          {[trending, rowB, rowC].map((row, r) => (
            <div
              key={r}
              className={`flex w-max gap-6 ${r === 1 ? "animate-marquee-reverse" : "animate-marquee"}`}
            >
              {[...row, ...row].map((src, i) => (
                <img key={i} src={src} alt="" className="h-96 w-64 rounded-2xl object-cover" />
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto max-w-4xl">
          <img
            src="/favicon.png"
            alt="Costa Play"
            className="mx-auto mb-6 h-40 w-40 rounded-full object-cover shadow-glow md:h-52 md:w-52"
          />
          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
            ASSISTA <span className="text-gradient">FILMES</span>
            <br />E <span className="text-gradient">SÉRIES</span>
          </h1>
          <p className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            ASSISTA SEUS FILMES AGORA <Flame className="h-4 w-4 text-primary" />
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <GlowButton href={firstPlan}>
              <Tv className="h-4 w-4" />
              ASSISTA NA SUA TV SMART
            </GlowButton>
            <GlowButton href={firstPlan}>
              <MonitorPlay className="h-4 w-4" />
              ASSISTA NA TV BOX
            </GlowButton>
            <GlowButton href={firstPlan}>
              <Flame className="h-4 w-4" />
              ASSISTA NO FIRE STICK
            </GlowButton>
            <GlowButton href={firstPlan}>
              <Smartphone className="h-4 w-4" />
              ASSISTA NO ANDROID E IPHONE
            </GlowButton>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            3.124 downloads hoje
          </div>
          <div className="mt-4">
            <a
              href={CONTACT}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/60 px-6 py-3 font-bold transition-colors hover:bg-primary/10"
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              Fale conosco
            </a>
          </div>
        </div>
      </section>

      <Row
        icon={
          <>
            <Flame className="h-6 w-6" />
            <Star className="h-6 w-6" />
          </>
        }
        title="EM ALTA"
        text={`Os filmes mais assistidos da semana — passando agora na ${BRAND}.`}
        images={trending}
      />
      <Row
        icon={<Sparkles className="h-6 w-6" />}
        title="LANÇAMENTOS"
        text={`As novidades que acabaram de chegar na ${BRAND}.`}
        images={posters("lanc")}
        reverse
      />
      <Row
        icon={<Heart className="h-6 w-6" />}
        title="DORAMAS"
        text="Os melhores doramas asiáticos para maratonar agora."
        images={posters("dor")}
      />
      <Row
        icon={<LayoutGrid className="h-6 w-6" />}
        title="DIVERSOS"
        text="Aqui você encontra diversas outras categorias como Terror, Desenhos, Animes e muito mais."
        images={posters("div")}
        reverse
      />

      <section className="px-6 py-20">
        <h2 className="text-center text-5xl font-extrabold">
          Categorias <span className="text-gradient">Disponíveis</span>
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          Descubra todo o conteúdo disponível na {BRAND}.
        </p>
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {(
            [
              [
                Film,
                "Filmes e Séries",
                "Temporadas completas, lançamentos e episódios sempre atualizados.",
              ],
              [
                Smile,
                "Canais Infantis",
                "Diversão garantida com desenhos e programação educativa.",
              ],
              [
                Trophy,
                "Esportes ao vivo",
                "Futebol, basquete, lutas e muito mais direto na sua TV.",
              ],
              [Sparkles, "Animes", "Títulos populares e novidades em qualidade HD."],
              [Radio, "Canais ao vivo", "Mais de 1.000 canais nacionais e internacionais."],
            ] as const
          ).map(([Icon, t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-card text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">
              <Trophy className="h-3 w-3" />
              AO VIVO 24/7
            </span>
            <h2 className="mt-6 text-5xl font-extrabold leading-tight">
              ASSISTA TAMBÉM O <span className="text-gradient">FUTEBOL DO SEU CORAÇÃO</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Acompanhe todos os lances do seu time favorito ao vivo — em HD direto na sua TV,
              celular ou TV Box.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                "Brasileirão Série A e B",
                "Libertadores e Sul-Americana",
                "Champions League",
                "Premier League e La Liga",
                "Copa do Mundo e Eliminatórias",
                "Canais SporTV, Premiere, ESPN",
              ].map((e) => (
                <li key={e} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  {e}
                </li>
              ))}
            </ul>
            <GlowButton href={firstPlan} className="mt-8">
              QUERO ASSISTIR FUTEBOL AGORA
            </GlowButton>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {["SporTV", "Premiere", "ESPN", "CazéTV", "Disney+", "HBO Max"].map((c) => (
              <div
                key={c}
                className="flex h-36 items-center justify-center rounded-2xl border border-border bg-card text-lg font-bold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="px-6 py-24">
        <h2 className="text-center text-5xl font-extrabold">
          Escolha seu plano e <span className="text-gradient">assine já!</span>
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          Milhares de conteúdos, sem fidelidade. Comece agora.
        </p>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          A experiência completa {BRAND}: 4K, todos os canais e prioridade no suporte.
        </p>
        <div className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border bg-card p-6 ${p.gold ? "border-star/60 shadow-glow-gold" : "border-primary/50 shadow-glow"}`}
            >
              {p.badge &&
                (p.gold ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 animate-blink whitespace-nowrap rounded-full bg-star px-4 py-1 text-sm font-bold uppercase text-background shadow-glow-gold">
                    {p.badge}
                  </span>
                ) : (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary bg-background px-4 py-1 text-sm font-bold text-primary">
                    {p.badge}
                  </span>
                ))}
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${p.gold ? "border-star text-star" : "border-primary text-primary"}`}
              >
                <Crown className="h-3 w-3" />
                PREMIUM
              </span>
              <h3 className="mt-3 text-xl font-bold">{p.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-sm opacity-70">R$</span>
                <span className="text-5xl font-extrabold">{p.price}</span>
                <span className="text-sm opacity-70">{p.period}</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={planLink(p)}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 flex w-full items-center justify-center rounded-full py-3 text-sm font-bold uppercase ${p.gold ? "bg-gradient-gold text-background animate-zoom-glow-gold" : "bg-gradient-primary text-primary-foreground animate-zoom-glow"}`}
              >
                {p.cta}
              </a>
              <p className="mt-3 text-center text-xs opacity-70">
                Pix e Cartão • Entrega imediata • Suporte 24h
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <h2 className="text-center text-5xl font-extrabold">
          O que dizem nossos <span className="text-gradient">clientes</span>
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          Mais de 50 mil assinantes satisfeitos em todo o Brasil.
        </p>
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map(([n, h, img, t]) => (
            <div key={n} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <img
                  src={`https://i.pravatar.cc/120?img=${img}`}
                  alt={n}
                  className="h-12 w-12 rounded-full border-2 border-primary"
                />
                <div>
                  <p className="font-bold">{n}</p>
                  <p className="text-xs text-muted-foreground">{h}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-star text-star" />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">"{t}"</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 text-center">
        <img
          src="/favicon.png"
          alt="Costa Play"
          className="mx-auto h-28 w-28 rounded-full object-cover"
        />
        <div className="mx-auto my-6 h-px w-40 bg-border" />
        <p className="text-sm text-muted-foreground">
          © 2026 {BRAND} IPTV. Todos os direitos reservados.
        </p>
      </footer>
      <Toast />
    </div>
  );
}
