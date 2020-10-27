const musicalTypes = ['funk', 'elethronic', 'samba', 'mpb', 'pagode', 'rock'];

const events = [
    {
        name: 'Timbaland',
        tickets: 100,
        eventImage: 'url',
        musicalType: 'elethronic',
        date: '2020-09-25',
    },
    {
        name: 'Timbaland',
        tickets: 100,
        eventImage: 'url',
        musicalType: 'rock',
        date: '2020-09-25',
    },
    {
        name: 'Timbaland',
        tickets: 100,
        eventImage: 'url',
        musicalType: 'funk',
        date: '2020-09-25',
    },
    {
        name: 'Timbaland',
        tickets: 100,
        eventImage: 'url',
        musicalType: 'funk',
        date: '2020-09-25',
    },
    {
        name: 'Timbaland',
        tickets: 100,
        eventImage: 'url',
        musicalType: 'mpb',
        date: '2020-09-25',
    },
    {
        name: 'Timbaland',
        tickets: 100,
        eventImage: 'url',
        musicalType: 'samba',
        date: '2020-09-25',
    },
];

const users = [
    {
        id: 1,
        name: 'Henrique Pires',
        musicalType: ['funk', 'pagode', 'rock'],
    },
    {
        id: 2,
        name: 'Letícia Pires',
        musicalType: ['funk', 'mpb', 'samba'],
    },
    {
        id: 3,
        name: 'Vanderlei Parça',
        musicalType: ['elethronic', 'pagode', 'samba'],
    },
];

const filterEventsByUserInterest = id => {
    const user = users.find(userInUsers => userInUsers.id === id);

    const findEventWithUserMusicalType = user.musicalType.map(musicalType => {
        const eventsWithUserInterest = events.filter(event => {
            if (event.musicalType === musicalType) {
                return event;
            }

            throw new Error(
                'unfortanely the user has not a valid interest musical type',
            );
        });

        return eventsWithUserInterest;
    });
    console.log(findEventWithUserMusicalType);
    return findEventWithUserMusicalType;
};

filterEventsByUserInterest(2);
