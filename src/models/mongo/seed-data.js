export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  counties: {
    _model:"County",
    dublin: {
      name: "Dublin",
      userId: "->users.homer"
    },
    cork: {
      name: "Cork",
      userId: "->users.homer"
    },
    wexford: {
      name: "Wexford",
      userId: "->users.homer"
    },
    galway: {
      name: "Galway",
      userId: "->users.marge"
    },
  },
  universities: {
    _model:"University",
    trinity: {
      name: "Trinity College Dublin",
      lat: 53.34397,
      lng: -6.25404,
      description: "sample text",
      countyId: "->counties.dublin"
    },
    dcu:{
      name: "Dublin City University",
      lat: 53.38566,
      lng: -6.25878,
      description: "sample text",
      countyId: "->counties.dublin"
    },
    ucd:{
      name: "University College Dublin",
      lat: 53.30834,
      lng: -6.22785,
      description: "sample text",
      countyId: "->counties.dublin"
    },
    tud:{
      name: "Technological University Dublin",
      lat: 53.33895,
      lng: -6.26678,
      description: "sample text",
      countyId: "->counties.dublin"
    },
    setu:{
      name: "South East Technological University",
      lat: 52.49898,
      lng: -6.52733,
      description: "sample text",
      countyId: "->counties.wexford"
    }

  }
};