export default async function (params) {
  const data = new Array();

  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: "keyHTBw85lJO6lxIy" }).base("apposaqkT54mKTSbv");

  const getRecords = async () => {
    const records = await base("Moderators")
      .select({
        fields: ["Name"],
        view: "Grid view",
      })
      .firstPage();

    records.forEach(function (record) {
      data.push(record.get("Name"));
    });
    // console.log(data);
    return data;
  };

  return getRecords().then((data) => {
    return data;
    // return data[Math.floor(Math.random() * data.length)];
  });
}
