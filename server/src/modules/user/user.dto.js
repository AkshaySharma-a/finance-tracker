const z = require("zod");

const updateUserDto = z.object({
  name: z.string().min(2).optional(),
});

module.exports = { updateUserDto };
