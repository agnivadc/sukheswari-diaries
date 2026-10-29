import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import {
  birthdayEditions,
  currentEdition,
  getEditionHref,
  type BirthdayEdition,
} from "@/lib/birthday-editions";

function EditionSwitcher({ activeYear }: { activeYear: BirthdayEdition["year"] }) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = () => {
      if (menu.current) menu.current.open = false;
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("blur", close);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("blur", close);
    };
  }, []);

  return (
    <details
      className="diary-editions"
      ref={menu}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu.current?.open) {
          menu.current.open = false;
          menu.current.querySelector("summary")?.focus();
          event.preventDefault();
        }
      }}
    >
      <summary aria-label="Choose a birthday year">
        <span>{activeYear}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </summary>
      <nav className="diary-editions__menu" aria-label="Birthday chapters">
        <p>The chapters, so far</p>
        {birthdayEditions.map((edition) => {
          const active = edition.year === activeYear;
          const content = (
            <>
              <strong>{edition.year}</strong>
              <span>{edition.title}</span>
              {active
                ? <span className="diary-editions__dot" aria-label="Current chapter" />
                : <ArrowUpRight size={16} aria-hidden="true" />}
            </>
          );
          return active ? (
            <span className="diary-editions__item" aria-current="page" key={edition.year}>{content}</span>
          ) : (
            <a
              className="diary-editions__item"
              href={getEditionHref(edition, import.meta.env.BASE_URL)}
              target="_top"
              key={edition.year}
            >
              {content}
            </a>
          );
        })}
        <small>Each year, just as it was.</small>
      </nav>
    </details>
  );
}

export default function DiaryHeader({ edition = currentEdition }: { edition?: BirthdayEdition }) {
  const isArchive = edition.kind === "archive";

  return (
    <header className="diary-header">
      <div className="diary-header__inner diary-shell">
        <a
          className="diary-wordmark"
          href={getEditionHref(currentEdition, import.meta.env.BASE_URL)}
          target="_top"
          aria-label={isArchive ? `Back to ${currentEdition.year}` : "Sukheswari Diaries, current birthday"}
        >
          <span className="diary-wordmark__symbol" aria-hidden="true">s<span>.</span></span>
          {isArchive ? (
            <span className="diary-wordmark__return"><ArrowLeft size={14} aria-hidden="true" />Back to {currentEdition.year}</span>
          ) : (
            <span>Sukheswari <span>Diaries</span></span>
          )}
        </a>
        <span className="diary-header__dedication">
          {isArchive ? `The ${edition.year} birthday, just as it was.` : "One birthday. Another chapter."}
        </span>
        <EditionSwitcher activeYear={edition.year} />
      </div>
    </header>
  );
}
