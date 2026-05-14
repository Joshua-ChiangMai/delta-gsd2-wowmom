# Workflow State Transitions

## Context Status

These state machines formalize the Step 1 workflows. They are intentionally simple and designed to prevent ambiguous prototype behavior.

## Naming Conventions

- State names use lowercase words separated by underscores.
- API fields use `status`.
- Transition names use verbs.

## Invitation Status

States:

- `pending`
- `accepted`
- `declined`
- `expired`
- `revoked`

Transitions:

| From | Action | To | Actor |
| --- | --- | --- | --- |
| pending | accept | accepted | invitee |
| pending | decline | declined | invitee |
| pending | expire | expired | system |
| pending | revoke | revoked | primary caregiver |

Rules:

- accepted invitations create one `HouseholdMembership`.
- terminal states are `accepted`, `declined`, `expired`, and `revoked`.
- expired or revoked invitations cannot be accepted.

## Household Membership Status

States:

- `invited`
- `active`
- `suspended`
- `removed`

Transitions:

| From | Action | To | Actor |
| --- | --- | --- | --- |
| invited | activate | active | system |
| active | suspend | suspended | primary caregiver |
| suspended | reactivate | active | primary caregiver |
| active | remove | removed | primary caregiver |
| suspended | remove | removed | primary caregiver |

Rules:

- removed memberships do not grant access.
- suspended memberships cannot act but may remain visible to admins.
- temporary caregiver access expires when `expiresAt` is in the past.

## Task Status

States:

- `draft`
- `open`
- `assigned`
- `in_progress`
- `completed`
- `canceled`

Transitions:

| From | Action | To | Actor |
| --- | --- | --- | --- |
| draft | publish | open | creator |
| open | assign | assigned | authorized household member |
| assigned | start | in_progress | assignee |
| assigned | complete | completed | assignee or primary caregiver |
| in_progress | complete | completed | assignee or primary caregiver |
| open | cancel | canceled | creator or primary caregiver |
| assigned | cancel | canceled | creator or primary caregiver |
| in_progress | cancel | canceled | creator or primary caregiver |

Rules:

- a task with `assignedToUserId` should normally be `assigned` or `in_progress`.
- completed and canceled tasks are terminal for the prototype.
- generated routine tasks keep a `routineId`.

## Routine Active Status

States:

- `active`
- `paused`
- `archived`

Transitions:

| From | Action | To | Actor |
| --- | --- | --- | --- |
| active | pause | paused | primary caregiver or co-parent |
| paused | resume | active | primary caregiver or co-parent |
| active | archive | archived | primary caregiver |
| paused | archive | archived | primary caregiver |

Rules:

- active routines can generate reminders or tasks.
- paused routines do not generate new reminders or tasks.
- archived routines are read-only.

## Event Status

States:

- `scheduled`
- `canceled`
- `completed`

Transitions:

| From | Action | To | Actor |
| --- | --- | --- | --- |
| scheduled | cancel | canceled | creator, primary caregiver, or co-parent |
| scheduled | complete | completed | system or authorized household member |

Rules:

- canceled events notify participants.
- completed may be automatic after end time if needed.

## Event Participant Response Status

States:

- `invited`
- `accepted`
- `declined`

Transitions:

| From | Action | To | Actor |
| --- | --- | --- | --- |
| invited | accept | accepted | participant |
| invited | decline | declined | participant |
| declined | accept | accepted | participant |
| accepted | decline | declined | participant |

## Support Request Status

States:

- `draft`
- `open`
- `accepted`
- `fulfilled`
- `canceled`
- `expired`

Transitions:

| From | Action | To | Actor |
| --- | --- | --- | --- |
| draft | publish | open | requester |
| open | accept | accepted | eligible support member |
| open | cancel | canceled | requester or primary caregiver |
| open | expire | expired | system |
| accepted | fulfill | fulfilled | requester or accepted responder |
| accepted | cancel | canceled | requester or primary caregiver |

Rules:

- accepted requests set `acceptedByUserId`.
- fulfilled, canceled, and expired are terminal states.
- accepted requests may create a task or event.

## Note Visibility

Visibility values:

- `private`
- `caregivers`
- `household`
- `selected`

Rules:

- `private` notes are visible only to the author unless the formal specification requires admin override.
- `caregivers` includes primary caregiver, co-parent, and explicitly authorized external caregivers.
- `household` includes active household members.
- `selected` requires an explicit recipient list in a later schema revision.

## Notification Read State

Derived state:

- unread when `readAt` is null
- read when `readAt` is set

Rules:

- notifications should reference only resources the recipient can access.
- payloads should contain minimal display information.

