import InfoBanner from '../../blocks/feedback/InfoBanner';

export default function InfoBannerDemo() {
  return (
    <div className="w-full max-w-xl space-y-3">
      <InfoBanner title="This area is currently in development. Use the navigation menu to move around the app." />
      <InfoBanner
        title="Session details"
        items={[
          { name: 'Environment', value: 'Local mock' },
          { name: 'Signed in as', value: 'j.bloggs@trustid.co.uk' },
          { name: 'Permissions', value: 'Analyst, Supervisor' },
          { name: 'Session expires', value: '18:42' },
        ]}
      />
    </div>
  );
}
