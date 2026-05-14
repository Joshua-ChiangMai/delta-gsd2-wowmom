# Frontend Screen Structure

## Context Status

This screen structure is generated from the provisional entities and workflows. It describes a prototype app shell, not a finished product design.

## Assumptions

- Mobile-first responsive web app.
- Auth screens are minimal because authentication details are out of scope.
- The primary navigation is household-centered.
- Screens use the same resource names as the backend API.

## Top-Level Navigation

Primary tabs:

- Today
- Calendar
- Tasks
- Support
- Family

Secondary access:

- Notifications
- Household Settings
- Profile

## Screen Map

### Auth

Screens:

- Sign In
- Create Account
- Accept Invitation

Primary data:

- `User`
- `Invitation`

Notes:

- auth provider details are deferred
- invitation acceptance should guide the user into the correct household

### Onboarding

Screens:

- Create Household
- Add Child Profiles
- Set Preferences
- Invite Caregivers

Primary data:

- `Household`
- `HouseholdMembership`
- `MomProfile`
- `ChildProfile`
- `Invitation`

Completion state:

- user has at least one active household membership

### Today

Purpose:

Show the current household day at a glance.

Sections:

- upcoming events
- due tasks
- active support requests
- routine reminders
- recent notes

Primary data:

- `Task`
- `Event`
- `Routine`
- `SupportRequest`
- `Notification`

Actions:

- complete task
- create task
- create support request
- add note
- view event

### Calendar

Purpose:

Manage scheduled household activities.

Screens:

- Calendar List
- Event Detail
- Create Event
- Edit Event

Primary data:

- `Event`
- `EventParticipant`
- `ChildProfile`

Actions:

- create event
- update event
- cancel event
- respond to event

### Tasks

Purpose:

Coordinate household responsibilities.

Screens:

- Task List
- Task Detail
- Create Task
- Assign Task

Primary data:

- `Task`
- `ChildProfile`
- `HouseholdMembership`
- `Routine`
- `SupportRequest`

Actions:

- create task
- assign task
- start task
- complete task
- cancel task

### Routines

Purpose:

Manage repeated care activities.

Screens:

- Routine List
- Routine Detail
- Create Routine
- Edit Routine

Primary data:

- `Routine`
- generated `Task`
- `ChildProfile`

Actions:

- create routine
- pause routine
- resume routine
- archive routine

Placement:

- can be a sub-section of Tasks in the prototype to avoid overbuilding navigation.

### Support

Purpose:

Request and coordinate help.

Screens:

- Support Request List
- Support Request Detail
- Create Support Request
- Respond To Support Request

Primary data:

- `SupportRequest`
- `SupportRequestResponse`
- `HouseholdMembership`

Actions:

- create request
- accept request
- decline request
- ask question
- fulfill request
- cancel request

### Family

Purpose:

Manage household members and child profiles.

Screens:

- Family Overview
- Child Profile Detail
- Add Child Profile
- Member List
- Invite Member
- Member Detail

Primary data:

- `Household`
- `HouseholdMembership`
- `ChildProfile`
- `Invitation`

Actions:

- add or update child profile
- invite member
- update member role
- suspend or remove member

### Notes

Purpose:

Capture care context and observations.

Screens:

- Note List
- Note Detail
- Create Note
- Edit Note

Primary data:

- `Note`
- `ChildProfile`
- optional linked `Task`, `Event`, or `SupportRequest`

Actions:

- create note
- update own note
- choose visibility
- filter notes by child or tag

Placement:

- accessible from Today, Family, Task Detail, Event Detail, and Support Request Detail.

### Notifications

Purpose:

Show user-specific updates.

Screens:

- Notification List

Primary data:

- `Notification`

Actions:

- mark read
- mark all read
- open referenced resource

### Household Settings

Purpose:

Manage household-level configuration.

Screens:

- Household Profile
- Notification Preferences
- Access Settings

Primary data:

- `Household`
- `HouseholdMembership`

Actions:

- update household name and timezone
- configure preferences
- review access

## Role-Based Screen Access

| Screen Area | Primary Caregiver | Co-Parent | Support Member | External Caregiver |
| --- | --- | --- | --- | --- |
| Today | full | full | limited | assignment-scoped |
| Calendar | full | full | limited | assignment-scoped |
| Tasks | full | full | limited | assignment-scoped |
| Routines | full | edit | read limited | no default |
| Support | full | full | respond limited | respond assigned |
| Family | full | read/edit child | limited member view | assigned child info only |
| Notes | full by visibility | by visibility | by visibility | assignment-scoped |
| Settings | full | limited | none | none |

## Prototype UI Principles

- Prefer one household workspace before adding multi-household switching complexity.
- Keep forms short and progressive.
- Use empty states that invite the next workflow action.
- Avoid dashboards with metrics unless the formal specification asks for them.
- Use consistent resource labels from the backend and schema.

