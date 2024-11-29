import Form from 'next/form';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { auth } from '@/auth';
import '@/app/styles/_topnavbar.scss';
import MobileNavbar from './MobileNavbar';

export default async function TopNavbar() {
  const session = await auth();
  return (
    <div className="rightside__content__topbar">
      <Form action="" className="search__field">
        <div className="submit__btn">
          <input name="query" />
          <button type="submit">
            <MagnifyingGlassIcon width={24} height={24} />
          </button>
        </div>
      </Form>
      <div className="right__section">
        <div className="user__info">
          <Image
            src={session?.user?.image || ''}
            alt=""
            width={45}
            height={45}
          />
          <p>{session?.user?.name}</p>
        </div>
        <MobileNavbar />
      </div>
    </div>
  );
}
