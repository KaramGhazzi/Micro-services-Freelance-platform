'use client';

import BaseChatSidebar from '@/app/_components/BaseChatSidebar';

export default function Page() {
  const assignment = {
    id: 1,
    title: 'Senior Netwerkengineer IP',
    user: {
      name: 'Klaudia Topa',
    },
    createdAt: '2023-07-20T12:34:56Z',
    views: 20,
    comments: 20,
    status: 'open',
    externalCode: 'PH2023061453440',
    applicationDeadlineDate: '2023-07-20T12:34:56Z',
    onLocation: 'yes',
    place: 'Amsterdam',
    startDate: '2023-07-20T12:34:56Z',
    duration: 6,
    durationType: 'maanden',
    durationExtendable: true,
    hoursFrom: 32,
    hoursTo: 40,
    rateType: 'hour',
    rateFrom: 75,
    rateTo: 100,
    description:
      '<p>Een paragraaf tekst ziet er zo uit. Lorem ipsum dolor sit amet consectetuer adisciping elit consectetuer adisciping elit.</p><h3>Heading 3</h3><ul><li>List item</li><li>List item</li></ul>',
    application: {
      id: 1,
      user: {
        name: 'Gerald Zuiderwijk',
        image: {
          url: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        availability: '40 uur',
        readilyAvailable: true,
        rate: 115,
        city: 'Amsterdam',
        email: 'hello@geraldzuiderwijk.com',
        phone: '+31612345678',
        linkedIn: 'https://www.linkedin.com',
        website: '',
        expertise: [
          { name: 'Java' },
          { name: 'React' },
          { name: 'MongoDB' },
          { name: 'GraphQL' },
          { name: 'NodeJS' },
        ],
        qualities: [
          { name: 'Motivator' },
          { name: 'Zelfstandig' },
          { name: 'Assertief' },
        ],
      },
      notes: [
        {
          createdAt: '2023-07-20T12:34:56Z',
          updatedAt: '2023-07-20T12:34:56Z',
          createdBy: {
            name: 'Lorem ipsum',
          },
          title: 'Notitie 1',
          note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo, leo vitae pharetra dignissim, justo arcu ornare neque, non volutpat justo velit et diam. Etiam sodales est venenatis ipsum consequat ultrices vel in elit. Etiam finibus accumsan augue ac pulvinar',
        },
        {
          createdAt: '2023-07-20T12:34:56Z',
          updatedAt: '2023-07-20T12:34:56Z',
          createdBy: {
            name: 'Jou',
          },
          title: 'Notitie 2',
          note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo, leo vitae pharetra dignissim, justo arcu ornare neque, non volutpat justo velit et diam. Etiam sodales est venenatis ipsum consequat ultrices vel in elit. Etiam finibus accumsan augue ac pulvinar',
        },
      ],
      status: 'new',
      signedUpDate: '2023-07-20T12:34:56Z',
      lastStatusChange: '2023-07-20T12:34:56Z',
      dataShared: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo, leo vitae pharetra dignissim, justo arcu ornare neque, non volutpat justo velit et diam. Etiam sodales est venenatis ipsum consequat ultrices vel in elit. Etiam finibus accumsan augue ac pulvinar. Donec sit amet enim quis velit vehicula egestas sit amet nec purus. Sed mattis maximus dignissim. Nullam finibus velit vel nisi condimentum ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem orci, molestie in dignissim ac, pellentesque quis augue. Duis eu pellentesque elit. Vivamus ligula elit, placerat quis tempus sit amet, facilisis eu sem. Morbi id sapien nec massa volutpat sodales. In hac habitasse platea dictumst. Integer eleifend dignissim elementum. Maecenas et auctor eros. Aliquam at porta ligula, sed posuere nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Nullam massa orci, iaculis non lectus vitae, tempus porttitor ante. Phasellus a velit quis tellus pharetra condimentum. Duis interdum aliquam mauris. Nullam id erat et nunc egestas dignissim et vel leo.Ut tempor blandit metus id fringilla. Fusce quis orci vel dolor tempor pharetra. Sed ultrices est sapien, sed tincidunt tortor semper in. Nunc at elit magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed aliquam id sapien sed placerat. Nunc hendrerit felis a elementum maximus. Praesent non leo nibh. Integer sodales sed arcu quis pellentesque. Donec auctor faucibus nisi ac aliquam. Donec dapibus ante nec ullamcorper accumsan. Phasellus eu rhoncus augue, et ornare elit.Quisque nulla diam, sagittis at sagittis sed, tincidunt vel libero. Proin tristique magna ut libero aliquet, eget tempor eros finibus. Nulla eget suscipit felis. Phasellus et arcu sapien. Duis lobortis justo non erat congue placerat. Morbi porta feugiat mattis. Duis eget auctor mauris. Mauris pulvinar nulla vestibulum iaculis iaculis. Suspendisse venenatis nulla vel elit vulputate scelerisque. Quisque arcu nulla, maximus in semper id, ultrices ut mauris. In non odio id magna tempus rutrum a in nunc. Nullam nec ante ut eros facilisis aliquam et a lorem.Quisque lobortis turpis a tortor lacinia placerat. Vestibulum viverra tellus quam, sed semper nisi luctus ut. Mauris dignissim tempus neque. Duis consectetur accumsan pellentesque. Vestibulum ac commodo est, non consectetur nunc. Pellentesque eu placerat erat. Sed sit amet ultrices ipsum, interdum facilisis odio. Morbi non quam vitae nulla semper pretium. Maecenas bibendum, orci sed eleifend placerat, velit risus gravida turpis, quis gravida ante libero vitae ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur pulvinar tortor nisi, vel tincidunt nisl fringilla sit amet. Curabitur sodales fermentum nulla sit amet condimentum.',
    },
  };

  return (
    <>
      <div className="flex-grow xl:flex">
        <div className="flex-grow border-neutral-100 bg-white px-5 pb-5 pt-4 md:px-10 md:pb-10 xl:border-r ">
          <div className="grid-rows grid max-w-4xl divide-y divide-neutral-100">
            {assignment?.application?.notes.map((n: any, index: number) => (
              <div key={index} className="grid gap-1 py-6">
                <div className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
                  <div>Notitie van</div>
                  <div>
                    {new Intl.DateTimeFormat('nl-NL', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }).format(new Date(n.createdAt))}
                  </div>
                  <div>door</div>
                  <div>{n.createdBy.name}</div>
                </div>
                <div className="text-sm text-neutral-700">{n.note}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className=" w-full max-w-sm 2xl:max-w-md">
          <BaseChatSidebar assignment={assignment} />
        </aside>
      </div>
    </>
  );
}
