import DiaryHeader from "@/components/DiaryHeader";
import { getArchiveSource, type ArchivedEdition } from "@/lib/birthday-editions";

export default function ArchivedBirthday({ edition }: { edition: ArchivedEdition }) {
  return (
    <div className="diary diary-archive">
      <a className="diary-skip" href="#archived-birthday">Skip to birthday chapter</a>
      <DiaryHeader edition={edition} />
      <main className="diary-archive__content">
        <iframe
          id="archived-birthday"
          title={`The ${edition.year} birthday, original edition`}
          src={getArchiveSource(edition, import.meta.env.BASE_URL)}
        />
      </main>
    </div>
  );
}
