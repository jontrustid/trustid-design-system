import Input from '../../blocks/forms/Input';

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-2">
      <Input aria-label="Inline value" placeholder="Inline value" />
      <Input type="number" size="xs" aria-label="Weight" className="w-24 text-center" defaultValue={10} />
      <Input aria-label="Invalid value" error defaultValue="invalid" />
    </div>
  );
}
