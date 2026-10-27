import Avatar from '../../blocks/media/Avatar';
import { docImage } from './fixtures';

const PHOTO = docImage('Avatar', '#dbeafe', '#1e40af', '#3b82f6');

export default function AvatarDemo() {
  return (
    <div className="flex items-end gap-4">
      <Avatar src={PHOTO} size="xs" status="online" />
      <Avatar src={PHOTO} size="sm" status="offline" />
      <Avatar src={PHOTO} size="md" status="online" />
      <Avatar src={PHOTO} size="lg" />
      <Avatar src={PHOTO} size="xl" status="offline" />
    </div>
  );
}
