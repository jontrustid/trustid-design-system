import Icon, { ICON_NAMES } from '../../blocks/media/Icon';

export default function IconDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-6 gap-2 sm:grid-cols-8">
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-1 rounded-box border border-base-300 p-2"
          title={name}
        >
          <Icon name={name} className="h-4 w-4" />
          <span className="w-full truncate text-center text-[10px] text-base-content/60">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
