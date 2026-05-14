# Backend API Structure

## Context Status

This API structure is generated from the provisional Step 1 model. It describes route shape and resource ownership only; it is not an implementation contract yet.

## Assumptions

- REST is sufficient for the prototype.
- API responses use JSON.
- Resource fields use `camelCase`.
- Database tables use `snake_case`.
- Authentication is represented as `currentUser`; auth provider details are deferred.
- Most resources are scoped by `householdId`.

## API Conventions

Base path:

```text
/api/v1
```

Common response envelope:

```json
{
  "data": {},
  "meta": {},
  "errors": []
}
```

Common errors:

| Status | Meaning |
| --- | --- |
| 400 | invalid request |
| 401 | not authenticated |
| 403 | not authorized for household or resource |
| 404 | resource not found |
| 409 | invalid state transition or duplicate |
| 422 | validation failed |

## Route Groups

### Auth And Current User

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/me` | get current user profile and memberships |
| PATCH | `/me` | update current user profile |

Deferred:

- sign up
- sign in
- password reset
- OAuth callbacks

### Households

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/households` | list households for current user |
| POST | `/households` | create household |
| GET | `/households/{householdId}` | get household summary |
| PATCH | `/households/{householdId}` | update household |
| GET | `/households/{householdId}/memberships` | list household members |
| PATCH | `/households/{householdId}/memberships/{membershipId}` | update member role, status, or expiration |

Authorization:

- list requires authentication
- create requires authentication
- update household requires `primary_caregiver`
- update membership requires `primary_caregiver`

### Invitations

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/households/{householdId}/invitations` | invite caregiver or support member |
| GET | `/households/{householdId}/invitations` | list invitations |
| POST | `/invitations/{invitationId}/accept` | accept invitation |
| POST | `/invitations/{invitationId}/decline` | decline invitation |
| POST | `/invitations/{invitationId}/revoke` | revoke invitation |

Authorization:

- create, list, and revoke require `primary_caregiver`
- accept and decline require the invitee or matching contact identity

### Child Profiles

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/households/{householdId}/children` | list child profiles |
| POST | `/households/{householdId}/children` | create child profile |
| GET | `/households/{householdId}/children/{childId}` | get child profile |
| PATCH | `/households/{householdId}/children/{childId}` | update child profile |
| DELETE | `/households/{householdId}/children/{childId}` | archive child profile |

Authorization:

- create, update, and archive require `primary_caregiver` or `co_parent`
- support members and external caregivers can only read child data allowed by their access scope

### Tasks

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/households/{householdId}/tasks` | list tasks |
| POST | `/households/{householdId}/tasks` | create task |
| GET | `/households/{householdId}/tasks/{taskId}` | get task |
| PATCH | `/households/{householdId}/tasks/{taskId}` | update task details |
| POST | `/households/{householdId}/tasks/{taskId}/assign` | assign task |
| POST | `/households/{householdId}/tasks/{taskId}/transition` | update task state |

State transition payload:

```json
{
  "nextStatus": "completed",
  "note": "Done after school pickup"
}
```

### Routines

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/households/{householdId}/routines` | list routines |
| POST | `/households/{householdId}/routines` | create routine |
| GET | `/households/{householdId}/routines/{routineId}` | get routine |
| PATCH | `/households/{householdId}/routines/{routineId}` | update routine |
| POST | `/households/{householdId}/routines/{routineId}/pause` | pause routine |
| POST | `/households/{householdId}/routines/{routineId}/resume` | resume routine |
| POST | `/households/{householdId}/routines/{routineId}/archive` | archive routine |

### Events

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/households/{householdId}/events` | list calendar events |
| POST | `/households/{householdId}/events` | create event |
| GET | `/households/{householdId}/events/{eventId}` | get event |
| PATCH | `/households/{householdId}/events/{eventId}` | update event |
| POST | `/households/{householdId}/events/{eventId}/cancel` | cancel event |
| POST | `/households/{householdId}/events/{eventId}/participants/{userId}/respond` | accept or decline |

### Support Requests

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/households/{householdId}/support-requests` | list support requests |
| POST | `/households/{householdId}/support-requests` | create support request |
| GET | `/households/{householdId}/support-requests/{supportRequestId}` | get support request |
| PATCH | `/households/{householdId}/support-requests/{supportRequestId}` | update draft or open request |
| POST | `/households/{householdId}/support-requests/{supportRequestId}/respond` | accept, decline, or ask question |
| POST | `/households/{householdId}/support-requests/{supportRequestId}/transition` | cancel, fulfill, or expire |

### Notes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/households/{householdId}/notes` | list visible notes |
| POST | `/households/{householdId}/notes` | create note |
| GET | `/households/{householdId}/notes/{noteId}` | get note |
| PATCH | `/households/{householdId}/notes/{noteId}` | update own note or admin-managed note |
| DELETE | `/households/{householdId}/notes/{noteId}` | delete or archive note |

### Notifications

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/notifications` | list current user's notifications |
| POST | `/notifications/{notificationId}/read` | mark one notification read |
| POST | `/notifications/read-all` | mark all notifications read |

## Suggested Backend Modules

```text
backend/
  modules/
    users/
    households/
    invitations/
    children/
    tasks/
    routines/
    events/
    support-requests/
    notes/
    notifications/
  shared/
    auth/
    authorization/
    validation/
    errors/
```

## Service Boundaries

- Keep household authorization in a shared authorization service.
- Keep state transition checks in domain services, not route handlers.
- Keep notification creation as a side effect of domain events.
- Avoid introducing queues or event buses until async requirements are proven.

