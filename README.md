# Airplane-Comment-Review-Demo

This Airplane project creates a simple dashboard to review comments posted on a blog. It pulls comments data from the production database on Supabase, pushes approval status to the production database, and pushes comment and reviewer data to Airtable.

The app will automatically assign a moderator for each comment. Moderators are assigned in rotation. The list of employee moderators can be modified in Airtable.

There are 6 Tasks and 1 View:

- The list_comments SQL task pulls comment data from the production database. There is a resource set up for the Supabase instance named blog_comments.

- The approve and deny SQL set the ‘Approved’ field in the production database

- The airtable_get_employees task pulls a list of moderators from Airtable via the Airtable API.

- This compound_task task executes list_task then airtable_get_employees and assigns a moderator to each comment.

- The airtable_push_comments task pushes comment data and reviewer data to Airtable.

- The comments_dashboard view creates a dashboard of all comments, highlights the selected comment for review, and allows the user to approve or deny each comment and push the comment data to Airtable. The main Comments table is backed by the compound_task to include both production data and moderator data pulled from Airtable. There is also a second tab where users can filter the comments by moderator.
