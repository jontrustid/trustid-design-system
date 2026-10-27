import EventList from '../../blocks/data/EventList';
import Icon from '../../blocks/media/Icon';

export default function EventListDemo() {
  return (
    <div className="max-w-md rounded-box border border-base-300 p-2">
      <EventList
        items={[
          {
            icon: <Icon name="shield" className="h-4 w-4" />,
            iconColour: 'firebrick',
            title: 'Penetration Testing by URM',
            subtitle: 'Matt Green-Armytage',
            meta: 'Feb 24 - Mar 1',
          },
          {
            icon: <Icon name="clipboard" className="h-4 w-4" />,
            iconColour: 'darkblue',
            title: 'ISO 27001 Internal Audit',
            subtitle: 'Omon Ilaboya',
            meta: 'Mar 10',
          },
        ]}
      />
    </div>
  );
}
