# Developer Documentation

## Purpose

This document gives developers a compact orientation for implementing the WOW Mom App prototype from the generated specification artifacts.

## Source Of Truth

Current artifact chain:

1. `01-core-entities.md`
2. `02-user-roles.md`
3. `03-workflows.md`
4. `04-business-relationships.md`
5. `05-database-schema.md`
6. `06-backend-api-structure.md`
7. `07-workflow-state-transitions.md`
8. `08-frontend-screen-structure.md`
9. `09-role-permissions-matrix.md`
10. `10-architecture-notes.md`

Because no formal WOW Mom specification file was found, all implementation work should preserve visible assumptions and avoid product expansion beyond these artifacts.

## Canonical Domain Names

Use these names consistently in code, API docs, tests, and UI copy:

| Concept | Code Name | Database Table |
| --- | --- | --- |
| User | `User` | `users` |
| Household | `Household` | `households` |
| Household Membership | `HouseholdMembership` | `household_memberships` |
| Mom Profile | `MomProfile` | `mom_profiles` |
| Child Profile | `ChildProfile` | `child_profiles` |
| Task | `Task` | `tasks` |
| Routine | `Routine` | `routines` |
| Event | `Event` | `events` |
| Event Participant | `EventParticipant` | `event_participants` |
| Support Request | `SupportRequest` | `support_requests` |
| Support Request Response | `SupportRequestResponse` | `support_request_responses` |
| Note | `Note` | `notes` |
| Invitation | `Invitation` | `invitations` |
| Notification | `Notification` | `notifications` |

## Naming Conventions

- TypeScript types and classes: `PascalCase`
- variables and API fields: `camelCase`
- database tables and columns: `snake_case`
- URL paths: kebab-case plural nouns where useful, such as `support-requests`
- status values: lowercase `snake_case`

## Implementation Order

Recommended build sequence:

1. create shared domain types and enums
2. implement users, households, and memberships
3. implement authorization checks
4. implement invitations
5. implement child profiles
6. implement tasks and task transitions
7. implement events and support requests
8. implement routines as simple definitions
9. implement notes with visibility checks
10. implement notifications as synchronous database records
11. build frontend screens around Today, Tasks, Calendar, Support, and Family

## Minimum Prototype Acceptance Criteria

The prototype is coherent when:

- a user can belong to a household through `HouseholdMembership`
- a primary caregiver can invite another user
- a household can have child profiles
- authorized users can create, assign, and complete tasks
- users can create events and support requests
- note visibility is respected
- notification records are created for key workflow actions
- unauthorized household access returns `403`
- invalid state transitions return `409`

## Suggested Test Coverage

Backend tests:

- household membership authorization
- role permission checks
- invitation acceptance and expiration
- task state transitions
- support request acceptance and fulfillment
- note visibility
- notification payload scoping

Frontend tests:

- primary caregiver sees management actions
- support member sees limited household data
- external caregiver sees assignment-scoped views
- task completion flow
- support request response flow
- invitation acceptance flow

## Example API Payloads

Create task:

```json
{
  "title": "Pack school bag",
  "description": "Include lunch box and water bottle",
  "priority": "normal",
  "dueAt": "2026-05-13T00:30:00Z",
  "assignedToUserId": "user-id",
  "relatedChildId": "child-id"
}
```

Create support request:

```json
{
  "title": "Need pickup help",
  "description": "Can someone pick up after art class?",
  "requestType": "transport",
  "neededAt": "2026-05-13T09:00:00Z",
  "expiresAt": "2026-05-13T06:00:00Z"
}
```

Create note:

```json
{
  "relatedChildId": "child-id",
  "content": "Had a good nap after lunch.",
  "visibility": "caregivers",
  "tags": ["sleep", "daily-care"]
}
```

## Developer Guardrails

- Do not add subscriptions, payments, marketplace, or community features yet.
- Do not add child login accounts unless the formal specification requires it.
- Do not treat platform administrators as all-powerful household users.
- Do not place authorization only in the frontend.
- Do not expose private note content in notifications.
- Do not create extra role names without updating the permissions matrix.

## Open Specification Questions

- What is the formal product focus of WOW Mom?
- Which onboarding path is primary: household setup, child setup, support network setup, or wellness setup?
- Are professional providers in scope?
- Are there legal or compliance requirements for child data?
- Should routines generate tasks, reminders, or both?

