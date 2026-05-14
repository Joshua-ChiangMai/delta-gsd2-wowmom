# Architecture Notes

## Context Status

These notes define a lightweight architecture for the prototype evaluation. They avoid infrastructure choices that are not required by the current domain model.

## Architecture Goals

- keep the model traceable to specification artifacts
- preserve consistent naming across data, API, and UI
- keep household-scoped authorization easy to reason about
- support incremental implementation without committing to large platform architecture

## Proposed Shape

```text
frontend web app
  -> backend REST API
    -> relational database
```

No message broker, search engine, analytics pipeline, or separate microservices are required for this prototype.

## Backend Layers

Suggested layers:

- route handlers: HTTP parsing and response formatting
- services: business rules and state transitions
- repositories: database access
- authorization helpers: household membership and role checks
- notification helpers: create in-app notifications from domain actions

Keep state transition validation in services so UI and API behavior stay consistent.

## Frontend Layers

Suggested layers:

- screens: route-level views
- components: reusable UI pieces
- api client: typed API calls
- state hooks: resource loading and mutation flows
- role guards: hide or disable unavailable actions

Role guards are a usability aid only. Backend authorization remains required.

## Data Ownership

| Resource | Owner Scope |
| --- | --- |
| User | global account |
| Household | household |
| HouseholdMembership | household |
| MomProfile | household plus user |
| ChildProfile | household |
| Task | household |
| Routine | household |
| Event | household |
| SupportRequest | household |
| Note | household plus visibility |
| Invitation | household |
| Notification | recipient user |

## Authorization Strategy

For every household-scoped request:

1. authenticate the user
2. load active membership for `householdId`
3. check role and membership status
4. check resource-specific scope
5. apply visibility constraints

Special cases:

- `administrator` access should be support-scoped and audited if later implemented
- invitation acceptance can happen before membership exists
- notifications are recipient-scoped but referenced resources still require authorization

## Workflow Strategy

Use explicit state transition functions:

- `transitionTask(task, actor, nextStatus)`
- `transitionInvitation(invitation, actor, action)`
- `transitionSupportRequest(request, actor, action)`
- `transitionRoutine(routine, actor, action)`
- `transitionEvent(event, actor, action)`

This prevents route handlers from duplicating business rules.

## Notification Strategy

For the prototype, notifications can be stored synchronously after a successful domain action.

Examples:

- task assigned -> notify assignee
- event updated -> notify participants
- support request opened -> notify eligible support members
- invitation created -> notify invitee
- routine reminder generated -> notify assigned user

Avoid external push, email, or SMS integration until required.

## Privacy Notes

- Treat child profile details and care notes as sensitive.
- Store only minimal information in notification payloads.
- Default note visibility should be `private` or explicit.
- Avoid broad administrator access in early prototypes.

## Deferred Decisions

- production auth provider
- real-time updates
- recurring schedule engine
- audit log table
- file attachments
- payments or subscriptions
- public community or marketplace model

## Prototype Risks

- The formal app specification is missing, so the domain may drift.
- `permissions` as JSON is flexible but can become inconsistent if not constrained later.
- Recurring routines can become complex; keep first implementation simple.
- Assignment-scoped access must be tested carefully.

