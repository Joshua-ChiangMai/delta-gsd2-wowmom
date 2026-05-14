# Role Permissions Matrix

## Context Status

Permissions are inferred from the Step 1 roles. This matrix should be treated as a baseline for prototype authorization tests.

## Role Names

Canonical role values:

- `primary_caregiver`
- `co_parent`
- `support_member`
- `external_caregiver`
- `administrator`

`administrator` is platform-scoped and should not automatically bypass household privacy rules in the prototype.

## Permission Levels

| Level | Meaning |
| --- | --- |
| full | create, read, update, delete, and manage access |
| edit | create, read, and update within household |
| respond | act on requests or assignments |
| read | view within authorized scope |
| own | only items created by or assigned to the user |
| none | no access |

## Household Permissions

| Capability | Primary Caregiver | Co-Parent | Support Member | External Caregiver | Administrator |
| --- | --- | --- | --- | --- | --- |
| View household | full | read | read limited | read limited | support only |
| Update household | full | edit limited | none | none | none by default |
| Archive household | full | none | none | none | none by default |
| View members | full | read | read limited | read limited | support only |
| Invite members | full | optional edit | none | none | none by default |
| Change member role | full | none | none | none | none by default |
| Suspend or remove member | full | none | none | none | none by default |

## Child Profile Permissions

| Capability | Primary Caregiver | Co-Parent | Support Member | External Caregiver | Administrator |
| --- | --- | --- | --- | --- | --- |
| View child profile | full | full | read limited | assignment-scoped | support only |
| Create child profile | full | edit | none | none | none |
| Update child profile | full | edit | none | none | none |
| Archive child profile | full | none | none | none | none |
| View sensitive care notes | full | full | explicit only | assignment-scoped | support only |

## Task Permissions

| Capability | Primary Caregiver | Co-Parent | Support Member | External Caregiver | Administrator |
| --- | --- | --- | --- | --- | --- |
| View tasks | full | full | assigned or shared | assigned | support only |
| Create task | full | edit | none by default | none | none |
| Assign task | full | edit | none | none | none |
| Start assigned task | full | full | own | own | none |
| Complete assigned task | full | full | own | own | none |
| Cancel task | full | creator or assigned | own created only | none | none |

## Routine Permissions

| Capability | Primary Caregiver | Co-Parent | Support Member | External Caregiver | Administrator |
| --- | --- | --- | --- | --- | --- |
| View routines | full | full | read limited | none by default | support only |
| Create routine | full | edit | none | none | none |
| Update routine | full | edit | none | none | none |
| Pause or resume routine | full | edit | none | none | none |
| Archive routine | full | none | none | none | none |

## Event Permissions

| Capability | Primary Caregiver | Co-Parent | Support Member | External Caregiver | Administrator |
| --- | --- | --- | --- | --- | --- |
| View events | full | full | shared only | assigned only | support only |
| Create event | full | edit | none by default | none | none |
| Update event | full | creator or edit | own created only | none | none |
| Cancel event | full | creator or edit | own created only | none | none |
| Respond to event | own | own | own | own | none |

## Support Request Permissions

| Capability | Primary Caregiver | Co-Parent | Support Member | External Caregiver | Administrator |
| --- | --- | --- | --- | --- | --- |
| View support requests | full | full | visible requests | assigned or visible requests | support only |
| Create support request | full | edit | none by default | none | none |
| Respond to request | full | full | respond | respond if visible | none |
| Accept request | full | full | respond | respond if visible | none |
| Fulfill request | full | full | accepted only | accepted only | none |
| Cancel request | full | requester only | requester only | none | none |

## Note Permissions

| Capability | Primary Caregiver | Co-Parent | Support Member | External Caregiver | Administrator |
| --- | --- | --- | --- | --- | --- |
| View private notes | own | own | own | own | none by default |
| View caregiver notes | full | full | explicit only | assignment-scoped | support only |
| View household notes | full | full | read | assignment-scoped | support only |
| Create note | full | edit | own | assignment-scoped | none |
| Update note | own and managed | own | own | own | none |
| Delete note | own and managed | own | own | own | none |

## Notification Permissions

| Capability | Primary Caregiver | Co-Parent | Support Member | External Caregiver | Administrator |
| --- | --- | --- | --- | --- | --- |
| View own notifications | own | own | own | own | none |
| Mark own notifications read | own | own | own | own | none |
| Send system notifications | none | none | none | none | operational only |

## Authorization Rules To Test

- users cannot access resources outside their active household memberships
- removed or expired memberships grant no access
- support members cannot read private notes by default
- external caregivers see only assignment-scoped child and schedule information
- notification payloads must not reveal inaccessible resource details
- role changes require `primary_caregiver`

