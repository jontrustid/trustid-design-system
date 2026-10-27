import SectionTitle from '../../blocks/layout/SectionTitle';
import Button from '../../blocks/forms/Button';

export default function SectionTitleDemo() {
  return (
    <div className="w-full max-w-md">
      <SectionTitle actions={<Button size="xs" variant="ghost">Edit</Button>}>
        Personal details
      </SectionTitle>
      <p className="mt-2 text-sm text-base-content/70">
        Small uppercase heading used inside panels, with an optional
        right-aligned action slot.
      </p>
    </div>
  );
}
