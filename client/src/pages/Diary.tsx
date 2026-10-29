import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Expand, X } from "lucide-react";
import DiaryHeader from "@/components/DiaryHeader";
import PasswordGate from "@/components/PasswordGate";
import { archivedEditions, getEditionHref } from "@/lib/birthday-editions";
import { getWeddingCountdown } from "@/lib/wedding-countdown";
import ahmedabad from "@/assets/2026/january-ahmedabad.webp";
import hyderabad from "@/assets/2026/january-hyderabad.webp";
import february from "@/assets/2026/february-together.webp";
import mayLights from "@/assets/2026/may-in-the-lights.webp";
import mayEvening from "@/assets/2026/may-evening.webp";
import augustMirror from "@/assets/2026/august-mirror.webp";
import augustTogether from "@/assets/2026/august-together.webp";
import ashirvad from "@/assets/2026/october-ashirvad.webp";
import engagement from "@/assets/2026/october-engagement.webp";
import promise from "@/assets/2026/october-a-promise.webp";

interface Photo {
  src: string;
  alt: string;
  caption: string;
  landscape?: boolean;
}

interface Memory {
  id: string;
  date: string;
  isoDate: string;
  location?: string;
  title: string;
  story: string;
  photos: Photo[];
  milestone?: boolean;
}

const ashirvadPhoto: Photo = {
  src: ashirvad,
  alt: "Looking at each other at our Ashirvad ceremony in Alipurduar",
  caption: "02 October 2026 / Our Ashirvad",
  landscape: true,
};

const memories: Memory[] = [
  {
    id: "ahmedabad",
    date: "01 January 2026",
    isoDate: "2026-01-01",
    location: "Ahmedabad",
    title: "Finally, the same time zone.",
    story: "Last birthday, we were counting down to my coming home. On the first day of this year, I was finally visiting you in Ahmedabad. Seeing you after so long felt different this time: I was back in India for good. Different cities, perhaps. But from now on, the same clock.",
    photos: [{
      src: ahmedabad,
      alt: "Together beneath a tree lit with warm lights in Ahmedabad",
      caption: "January / The beginning of a closer year",
    }],
    milestone: true,
  },
  {
    id: "hyderabad",
    date: "26 January 2026",
    isoDate: "2026-01-26",
    location: "Hyderabad",
    title: "A little piece of my world, with you in it.",
    story: "Then it was your turn to come to Hyderabad. I got to show you a city that was still new to me, my office, and a little of the life I was building here. The High Fields flat, all that good food, and getting to stay together. The ordinary things I had missed so much while I was away.",
    photos: [{
      src: hyderabad,
      alt: "Sukheswari visiting my office in Hyderabad",
      caption: "January / Showing you around",
    }],
  },
  {
    id: "february",
    date: "February 2026",
    isoDate: "2026-02",
    title: "The best kind of ordinary.",
    story: "Not every memory needs a milestone. Sometimes it is just being in the same room, leaning into each other, and taking a picture because we can. After so much time apart, that was never a small thing.",
    photos: [{
      src: february,
      alt: "A playful mirror photograph together in February",
      caption: "February / No occasion needed",
    }],
  },
  {
    id: "may",
    date: "May 2026",
    isoDate: "2026-05",
    title: "More days on the same side of the screen.",
    story: "Your place, my place, one more visit to look forward to. Somewhere between the good food and the photographs, we were collecting the kind of everyday happiness that used to feel so far away.",
    photos: [
      {
        src: mayLights,
        alt: "Standing together surrounded by reflected lights in May",
        caption: "May / A little light, a little us",
      },
      {
        src: mayEvening,
        alt: "Together, dressed up for an outing on 22 May",
        caption: "22 May / One more photograph worth keeping",
      },
    ],
  },
  {
    id: "august",
    date: "August 2026",
    isoDate: "2026-08",
    title: "The visits. The meals. The being there.",
    story: "More trips to each other. More time together, sometimes just us, sometimes with company. Nothing that needed a grand title. Just the little moments that made this year feel more like a life we were sharing.",
    photos: [
      {
        src: augustMirror,
        alt: "A mirror photograph together during an August visit",
        caption: "08 August / Another day, together",
      },
      {
        src: augustTogether,
        alt: "An evening out together with company in August",
        caption: "August / Good company, good memories",
      },
    ],
  },
  {
    id: "october",
    date: "02 October 2026",
    isoDate: "2026-10-02",
    location: "Alipurduar",
    title: "And then, a promise with our people around us.",
    story: "Our Ashirvad. Our engagement. Both our extended families coming together in Alipurduar. Good food, so many photographs, and the promise at the heart of it all: we were choosing the days ahead, together. A future we had talked about was becoming something we could hold.",
    photos: [
      ashirvadPhoto,
      {
        src: engagement,
        alt: "Cutting our engagement cake together on 2 October",
        caption: "02 October / Our engagement",
      },
    ],
    milestone: true,
  },
  {
    id: "a-promise",
    date: "October 2026",
    isoDate: "2026-10",
    title: "A little glimpse of forever.",
    story: "Some promises do not need many words. Just your hand in mine, a ring, and all the days we have yet to fill.",
    photos: [{
      src: promise,
      alt: "Holding hands across a table, with her engagement ring in focus",
      caption: "October / All the days still to come",
    }],
  },
];

const previousEdition = archivedEditions[0];

function SharedClocks() {
  return (
    <div className="diary-clocks" role="img" aria-label="Two clocks, finally in sync">
      {["then", "now"].map((clock) => (
        <svg key={clock} className={`diary-clock diary-clock--${clock}`} viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="29" />
          {[0, 90, 180, 270].map((angle) => (
            <line key={angle} x1="32" y1="7" x2="32" y2="10" transform={`rotate(${angle} 32 32)`} />
          ))}
          <line className="diary-clock__hour" x1="32" y1="32" x2="32" y2="20" />
          <line className="diary-clock__minute" x1="32" y1="32" x2="32" y2="13" />
          <circle className="diary-clock__centre" cx="32" cy="32" r="2" />
        </svg>
      ))}
    </div>
  );
}

function PhotoFigure({ photo, onSelect }: { photo: Photo; onSelect: (photo: Photo) => void }) {
  return (
    <figure className={`diary-photo${photo.landscape ? " diary-photo--landscape" : ""}`} data-reveal>
      <button className="diary-photo__open" onClick={() => onSelect(photo)} aria-label={`View photo: ${photo.alt}`}>
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        <span className="diary-photo__expand"><Expand size={18} aria-hidden="true" /></span>
      </button>
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

function WeddingCountdown() {
  const [countdown, setCountdown] = useState(getWeddingCountdown);

  useEffect(() => {
    if (countdown.hasArrived) return;
    const interval = window.setInterval(() => setCountdown(getWeddingCountdown()), 1000);
    return () => window.clearInterval(interval);
  }, [countdown.hasArrived]);

  return (
    <section className="diary-future diary-shell" aria-labelledby="diary-future-title" data-reveal>
      <div className="diary-future__rings" aria-hidden="true"><span /><span /></div>
      <p className="diary-eyebrow">And this time, we are counting down to...</p>
      <h2 id="diary-future-title">Next chapter,<br /><em>forever.</em></h2>
      <p className="diary-future__date"><time dateTime="2027-02-11">11 February 2027</time> <span>/</span> Our wedding</p>
      {countdown.hasArrived ? (
        <p className="diary-future__arrived">Our forever has begun.</p>
      ) : (
        <div className="diary-countdown" role="timer" aria-label="Time until our wedding, at midnight India time">
          {([
            ["days", countdown.days],
            ["hours", countdown.hours],
            ["minutes", countdown.minutes],
            ["seconds", countdown.seconds],
          ] as const).map(([label, value]) => (
            <div key={label}>
              <span className="diary-countdown__number">{String(value).padStart(2, "0")}</span>
              <span className="diary-countdown__label">{label}</span>
            </div>
          ))}
        </div>
      )}
      <p className="diary-future__note">Last year, a countdown to coming home. This year, a countdown to making one.</p>
    </section>
  );
}

export default function Diary({
  isAuthenticated,
  onAuthenticated,
}: {
  isAuthenticated: boolean;
  onAuthenticated: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const lightbox = useRef<HTMLDialogElement>(null);
  const scrollOnUnlock = useRef(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const isEmbeddedEdition = window.self !== window.top;

  useEffect(() => {
    if (!isAuthenticated || !scrollOnUnlock.current) return;
    scrollOnUnlock.current = false;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("birthday-letter")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
      document.getElementById("diary-letter-title")?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isAuthenticated]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    root.current?.setAttribute("data-animate", "true");
    root.current?.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!selectedPhoto || !lightbox.current) return;
    const dialog = lightbox.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  return (
    <div className={`diary${isEmbeddedEdition ? " diary--embedded" : ""}`} ref={root}>
      <a className="diary-skip" href={isAuthenticated ? "#birthday-letter" : "#diary-password"}>Skip to content</a>
      {!isEmbeddedEdition && <DiaryHeader />}

      <main>
        <section className="diary-hero diary-shell" aria-labelledby="diary-title">
          <div className="diary-hero__copy">
            <p className="diary-eyebrow diary-hero__greeting">02 November 2026 <span>/</span> Just for you</p>
            <h1 id="diary-title">Happy{" "}<br />birthday,{" "}<br /><em>Sukheswari.</em></h1>
            <p className="diary-hero__intro">Today is for you.<br />I made you a little something to keep.</p>
            {isAuthenticated ? (
              <a className="diary-enter" href="#birthday-letter">A little note for you <ArrowDownRight size={21} aria-hidden="true" /></a>
            ) : (
              <PasswordGate
                variant="inline"
                onAuthenticated={() => {
                  scrollOnUnlock.current = true;
                  onAuthenticated();
                }}
              />
            )}
          </div>
          <div className="diary-hero__visual">
            <div className="diary-hero__annotation">
              <SharedClocks />
              <span>Different clocks, once.<br /><strong>A shared future, always.</strong></span>
            </div>
            <figure className="diary-hero__photo">
              <button onClick={() => setSelectedPhoto(ashirvadPhoto)} aria-label="View our Ashirvad portrait">
                <img
                  src={ashirvad}
                  alt={ashirvadPhoto.alt}
                  width={1280}
                  height={853}
                  fetchPriority="high"
                />
                <span className="diary-photo__expand"><Expand size={18} aria-hidden="true" /></span>
              </button>
              <figcaption><span>Us, a little closer to forever.</span><time dateTime="2026-10-02">02.10.26</time></figcaption>
            </figure>
            <div className="diary-hero__footnote"><span>THE 2026 CHAPTER</span><span>The year we got closer.</span></div>
          </div>
          <div className="diary-hero__bottom">
            <span>One year closer. A lifetime still to come.</span>
            {isAuthenticated ? <a href="#birthday-letter" aria-label="Read your birthday letter"><ArrowDown size={17} /></a> : <span>Made for one very special person.</span>}
          </div>
        </section>

        {isAuthenticated && (
          <>
            <section
              className="diary-letter diary-shell"
              id="birthday-letter"
              aria-labelledby="diary-letter-title"
              data-reveal
            >
              <p className="diary-eyebrow">Before anything else, a birthday wish for you.</p>
              <h2 id="diary-letter-title" tabIndex={-1}>Hobu <em>Bou,</em></h2>
              <div className="diary-letter__body">
                <p>Happy birthday, my favourite person.</p>
                <p>There is so much I love about you: the way you notice every little detail,
                  the care I can see in your eyes, and how much your family and friends mean to you.
                  You think things through, keep your feet on the ground, and still know how to
                  laugh, enjoy life, and keep an open heart. You care more about people than
                  things. That combination is one of my favourite things about you.</p>
                <p>I know that detailed mind of yours can sometimes think a little too much.
                  I hope this year gives it more reasons to feel at ease. And I hope you know
                  what your smile does to me: no matter how tired I am, it makes me forget
                  all my fatigue. You make the day feel lighter.</p>
                <p>This year, I wish you good health, and the same for everyone you love,
                  including both our sets of parents now. I hope you do wonderfully in your
                  career, get the work-life balance you deserve, and have plenty of time for
                  the fun-loving part of you, too. I hope the new city gives you all the
                  calm you have wanted.</p>
                <p>Most of all, I hope we make a home that feels like us: peaceful, full of
                  laughter, and happy in all the ways that matter. I cannot wait to get
                  married to my favourite person. Until then, and for all the birthdays after,
                  I hope you feel as loved as you make me feel.</p>
                <p className="diary-letter__signature">Tomar ekmatro porano</p>
              </div>
              <div className="diary-letter__next">
                <p>And now, a few moments I want us to keep.</p>
                <a className="diary-enter" href="#the-year">Our year, together <ArrowDown size={18} aria-hidden="true" /></a>
              </div>
            </section>

            <section className="diary-story diary-shell" id="the-year" aria-labelledby="diary-story-title">
              <div className="diary-story__intro" data-reveal>
                <p className="diary-eyebrow">January &mdash; October / A collection of us</p>
                <h2 id="diary-story-title">The big days.<br />And all the <em>little ones.</em></h2>
                <p>Two moments changed our story. Everything in between made it ours.</p>
                <nav className="diary-months" aria-label="Jump to a moment">
                  <a href="#ahmedabad">Jan <span>01</span></a>
                  <a href="#february">Feb</a>
                  <a href="#may">May</a>
                  <a href="#august">Aug</a>
                  <a href="#october">Oct <span>02</span></a>
                </nav>
              </div>

              <div className="diary-timeline">
                {memories.map((memory, index) => (
                  <article
                    className={[
                      "diary-memory",
                      index % 2 ? "diary-memory--reverse" : "",
                      memory.milestone ? "diary-memory--milestone" : "",
                      memory.photos.length > 1 ? "diary-memory--pair" : "",
                    ].join(" ")}
                    id={memory.id}
                    key={memory.id}
                  >
                    <div className="diary-memory__copy" data-reveal>
                      <p className="diary-eyebrow">
                        <time dateTime={memory.isoDate}>{memory.date}</time>
                        {memory.location && <><span>/</span>{memory.location}</>}
                      </p>
                      {memory.milestone && <span className="diary-memory__milestone">A day that changed things</span>}
                      <h3>{memory.title}</h3>
                      <p className="diary-memory__story">{memory.story}</p>
                      <span className="diary-memory__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="diary-memory__photos">
                      {memory.photos.map((photo) => <PhotoFigure key={photo.src} photo={photo} onSelect={setSelectedPhoto} />)}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <WeddingCountdown />
          </>
        )}
      </main>

      <footer className="diary-footer diary-shell">
        <span>A little diary. A lifetime to fill.</span>
        <a href={getEditionHref(previousEdition, import.meta.env.BASE_URL)} target="_top">
          Revisit {previousEdition.year} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <span>Made with love, always.</span>
      </footer>

      <dialog
        ref={lightbox}
        className="diary-lightbox"
        aria-label={selectedPhoto?.alt ?? "Photograph"}
        onClose={() => setSelectedPhoto(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) lightbox.current?.close();
        }}
      >
        <button className="diary-lightbox__close" onClick={() => lightbox.current?.close()} aria-label="Close photograph"><X size={24} /></button>
        {selectedPhoto && (
          <figure>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            <figcaption>{selectedPhoto.caption}</figcaption>
          </figure>
        )}
      </dialog>
    </div>
  );
}
