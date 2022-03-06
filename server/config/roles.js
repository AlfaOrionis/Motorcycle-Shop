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
    brand: allRights,
    product: allRights,
    site: allRights,
  },

  user: {
    profile: {
      "read:own": ["*", "!_id", "!password"],
      "update:own": ["*"],
    },
    brand: {
      "read:any": ["*"],
    },
    product: { "read:any": ["*"] },
    site: { "read:any": ["*"] },
  },
};

const roles = new ac(grantsObject);

module.exports = roles;
