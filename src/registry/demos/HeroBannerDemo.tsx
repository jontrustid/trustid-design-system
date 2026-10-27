import HeroBanner from '../../blocks/layout/HeroBanner';
import Icon from '../../blocks/media/Icon';

export default function HeroBannerDemo() {
  return (
    <HeroBanner
      title="Acme Corp"
      subtitle="Identity verification client since 2021"
      icon={<Icon name="clients" className="h-7 w-7" />}
      actions={
        <button type="button" className="btn btn-outline btn-sm">
          Edit
        </button>
      }
    />
  );
}
