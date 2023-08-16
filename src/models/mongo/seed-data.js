export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$8ZUaRnfDvx5JFrKeA3LV5e44HJRxrvPZKz8gYKgrJQ1mLIHA5y03i"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$8ZUaRnfDvx5JFrKeA3LV5e44HJRxrvPZKz8gYKgrJQ1mLIHA5y03i"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$8ZUaRnfDvx5JFrKeA3LV5e44HJRxrvPZKz8gYKgrJQ1mLIHA5y03i"
    },
    vinod: {
      firstName: "Vinod",
      lastName: "Yadav",
      email: "vinod@yadav.com",
      password: "$2a$10$8ZUaRnfDvx5JFrKeA3LV5e44HJRxrvPZKz8gYKgrJQ1mLIHA5y03i"
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
    limerick: {
      name: "Limerick",
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
      countyId: "->counties.waterford"
    },
    ucc:{
      name: "University College Cork",
      lat: 51.89587,
      lng: -8.49173,
      description: "sample description",
      countyId: "->counties.cork"
    },
    mtu:{
      name: "Munster Technological University",
      lat: 51.88854,
      lng: -8.53323,
      description: "sample description",
      countyId: "->counties.cork"
    },
    ug:{
      name: "University of Galway",
      lat: 53.27948,
      lng: -9.06178,
      description: "sample description",
      countyId: "->counties.galway"
    },
    ul:{
      name: "University of Limerick",
      lat: 52.85628,
      lng: -8.5742,
      description: "sample description",
      countyId: "->counties.limerick"
    }

  }
};