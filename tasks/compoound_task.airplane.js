import airplane from "airplane";

export default airplane.task(
  {
    slug: "compound_task",
    name: "Compound Task",
    description:
      "This task pulls the list of comments from the produciton database then pulls the list of moderators from Airtable and a assigns a moderator to each comment in the order they were received.",
    parameters: {
      selected_mod: {
        type: "shorttext",
        name: "Selected Mod",
        required: false,
      },
    },
  },

  async (params) => {
    console.log(params.selected_mod);
    try {
      const taskSlug = "list_comments";
      const run = await airplane.execute(taskSlug);

      const secondTaskSlug = "airtable_get_employees";
      const run2 = await airplane.execute(secondTaskSlug);

      // Adds a moderator to each comment
      const l = run2.output.length;
      run.output.Q1.forEach((e, i) => {
        i >= l ? (i = i % l) : null;
        e.mod = run2.output[i];
      });

      // console.log(run.output.Q1);
      // console.log(run2.output);

      if (typeof params.selected_mod !== "undefined") {
        return run.output.Q1.filter((comment) => comment.mod == params.selected_mod);
      }

      return run.output.Q1;
    } catch (err) {
      if (!(err instanceof RunTerminationError)) {
        throw err;
      }
      console.log(`This task failed with status=${err.run.status}`);
    }
  }
);
