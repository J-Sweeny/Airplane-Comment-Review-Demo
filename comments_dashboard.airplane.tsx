import { Stack, Table, Text, Title, Avatar, Button, useComponentState, Tabs, Card, Select } from "@airplane/views";
import { useEffect } from "react";
import airplane from "airplane";

const commentView = () => {
  const commentState = useComponentState("comments");
  const selectedComment = commentState.selectedRow;

  const commentByModState = useComponentState("comments_mods");
  const selectedModComment = commentByModState.selectedRow;

  const modState = useComponentState("selectMod");
  const selectedMod = modState.value;

  return (
    <Tabs defaultValue="all_comments">
      <Tabs.Tab value="all_comments" label="All Comments">
        <Stack>
          <Title>Comments panel</Title>
          <Text>Please review each comment assigned to you and commit your changes.</Text>
          <Stack spacing="lg">
            <Table
              id="comments"
              title="Comments"
              columns={[
                { accessor: "id", label: "ID" },
                { accessor: "comment_text", label: "Comment Text", type: "string" },
                { accessor: "username", label: "Username", type: "string" },
                { accessor: "inserted_at", label: "Posted", type: "datetime" },
                { accessor: "approved", label: "Approved", type: "boolean" },
                { accessor: "mod", label: "Moderator", type: "string" },
              ]}
              rowSelection="single"
              task={{ slug: "compound_task" }}
              hiddenColumns={["id"]}
              isDefaultSelectedRow={(row, index) => index === 0}
            />
          </Stack>

          {selectedComment && (
            <Card>
              <Stack>
                <Stack direction="row" justify="space-between">
                  <Title order={4}>Approve Comment</Title>
                </Stack>
                <Stack direction="row" justify="start">
                  <Text color="secondary">{selectedComment.username}'s Comment:</Text>
                  <Title color="dark" order={5}>
                    {selectedComment.comment_text}
                  </Title>
                  <Button
                    id="approveButton"
                    preset="secondary"
                    compact
                    task={{
                      slug: "approve",
                      params: { id: selectedComment.id },
                      refetchTasks: "compound_task",
                    }}>
                    Approve
                  </Button>
                  <Button
                    id="denyButton"
                    preset="danger"
                    compact
                    task={{
                      slug: "deny_approval",
                      params: { id: selectedComment.id },
                      refetchTasks: "compound_task",
                    }}>
                    Deny
                  </Button>
                </Stack>
                <Stack direction="row">
                  <Button
                    id="commitButton"
                    task={{
                      slug: "airtable_push_comments",
                      params: {
                        id: selectedComment.id,
                        comment_text: selectedComment.comment_text,
                        username: selectedComment.username,
                        inserted_at: selectedComment.inserted_at,
                        approved: selectedComment.approved,
                        mod: selectedComment.mod,
                      },
                      onSuccess: () => alert("Your comments have been pushed. Great job!"),
                    }}>
                    Commit Comments
                  </Button>
                </Stack>
              </Stack>
            </Card>
          )}
        </Stack>
      </Tabs.Tab>
      <Tabs.Tab value="comments_mod" label="Comments By Moderator">
        <Stack>
          <Text>Please review each comment assigned to you and commit your changes.</Text>
          <Select id="selectMod" task="airtable_get_employees" placeholder="Select Moderator" />

          {selectedMod && (
            <Stack spacing="lg">
              <Table
                id="comments_mods"
                title="Comments by Moderator"
                columns={[
                  { accessor: "id", label: "ID" },
                  { accessor: "comment_text", label: "Comment Text", type: "string" },
                  { accessor: "username", label: "Username", type: "string" },
                  { accessor: "inserted_at", label: "Posted", type: "datetime" },
                  { accessor: "approved", label: "Approved", type: "boolean" },
                  { accessor: "mod", label: "Moderator", type: "string" },
                ]}
                rowSelection="single"
                task={{ slug: "compound_task", params: { selected_mod: selectedMod } }}
                hiddenColumns={["id"]}
                isDefaultSelectedRow={(row, index) => index === 0}
              />

              {selectedModComment && (
                <Card>
                  <Stack>
                    <Stack direction="row" justify="space-between">
                      <Title order={4}>Approve Comment</Title>
                    </Stack>
                    <Stack direction="row" justify="start">
                      <Text color="secondary">{selectedModComment.username}'s Comment:</Text>
                      <Title color="dark" order={5}>
                        {selectedModComment.comment_text}
                      </Title>
                      <Button
                        id="approveButton"
                        preset="secondary"
                        compact
                        task={{
                          slug: "approve",
                          params: { id: selectedModComment.id },
                          refetchTasks: "compound_task",
                        }}>
                        Approve
                      </Button>
                      <Button
                        id="denyButton"
                        preset="danger"
                        compact
                        task={{
                          slug: "deny_approval",
                          params: { id: selectedModComment.id },
                          refetchTasks: "compound_task",
                        }}>
                        Deny
                      </Button>
                    </Stack>
                    <Stack direction="row">
                      <Button
                        id="commitButton"
                        task={{
                          slug: "airtable_push_comments",
                          params: {
                            id: selectedModComment.id,
                            comment_text: selectedModComment.comment_text,
                            username: selectedModComment.username,
                            inserted_at: selectedModComment.inserted_at,
                            approved: selectedModComment.approved,
                            mod: selectedModComment.mod,
                          },
                          onSuccess: () => alert("Your comments have been pushed. Great job!"),
                        }}>
                        Commit Comments
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              )}
            </Stack>
          )}
        </Stack>
      </Tabs.Tab>
    </Tabs>
  );
};

export default airplane.view(
  {
    slug: "comments_dashboard",
    name: "comments_dashboard",
  },
  commentView
);
