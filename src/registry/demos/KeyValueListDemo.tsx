import KeyValueList from '../../blocks/data/KeyValueList';

export default function KeyValueListDemo() {
  return (
    <KeyValueList
      className="w-full max-w-sm"
      items={[
        { label: 'Reference', value: '1042' },
        { label: 'Document type', value: 'Passport' },
        { label: 'Submitted', value: '12 Mar 2025, 14:32' },
        { label: 'Reviewed by', value: 'Alice Smith' },
      ]}
    />
  );
}
