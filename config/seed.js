const names = ["staff1", "staff2", "staff3", "staff4", "staff5"];

module.exports = names.map((name) => ({
  name: name,
  email: `${name}@pipeline.com`,
  password: "123",
}));
