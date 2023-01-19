export default async function (params) {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: "keyHTBw85lJO6lxIy" }).base("apposaqkT54mKTSbv");

  const postRecords = async () => {
    const records = await base("Assigned Comments").create(
      [
        // prettier-ignore
        {
          fields: {
            "Comment ID": params.id,
            "Approved": params.approved,
            "Comment Text": params.comment_text,
            "Username": params.username,
            "Posted": params.inserted_at,
            "Moderators": params.mod,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
      }
    );
  };

  console.log(params);

  postRecords();
}
