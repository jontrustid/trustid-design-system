import DropdownMenu from '../../blocks/overlay/DropdownMenu';

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu
      label="Actions ▾"
      buttonClassName="btn-sm"
      items={[
        {
          label: 'Settings',
          items: [
            { label: 'Dark Mode', onClick: () => {} },
            { label: 'Experimental', onClick: () => {} },
          ],
        },
        {
          items: [
            { label: 'Rename', onClick: () => {} },
            { label: 'Delete', danger: true, onClick: () => {} },
          ],
        },
      ]}
    />
  );
}
