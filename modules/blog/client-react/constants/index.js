export const status = ['draft', 'published', 'disabled'];

export const statusForm = [
  { key: status[0], text: 'Save it as draft for further edits' },
  { key: status[1], text: 'The blog will be published on submit' },
  { key: status[2], text: 'Keep it disabled for now and publish later' }
];

export const Name = profile => {
  if (profile && (profile.firstName || profile.lastName)) {
    if (profile.firstName && profile.lastName) return `${profile.firstName} ${profile.lastName}`;
    else if (profile.firstName) return profile.firstName;
    else return profile.lastName;
  } else return 'Name not provided ';
};
