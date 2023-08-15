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
    },
    vinod: {
      firstName: "Vinod",
      lastName: "Yadav",
      email: "vinod@yadav.com",
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
    waterford: {
      name: "Waterford",
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
      description: "sample description",
      countyId: "->counties.dublin"
    },
    dcu:{
      name: "Dublin City University",
      lat: 53.38566,
      lng: -6.25878,
      description: "sample description",
      countyId: "->counties.dublin"
    },
    ucd:{
      name: "University College Dublin",
      lat: 53.30834,
      lng: -6.22785,
      description: "sample description",
      countyId: "->counties.dublin"
    },
    tud:{
      name: "Technological University Dublin",
      lat: 53.33895,
      lng: -6.26678,
      description: "sample description",
      countyId: "->counties.dublin"
    },
    setu:{
      name: "South East Technological University",
      lat: 52.33566,
      lng: -6.47190,
      description: "sample description",
      countyId: "->counties.wexford"
    }

  }
};