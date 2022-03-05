const ac = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

let grantsObject = {
  admin: {
    profile: allRights,
  },

  user: {
    profile: {
      "read:own": ["*", "!_id", "!password"],
      "update:own": ["*"],
    },
  },
};

const roles = new ac(grantsObject);

module.exports = roles;
