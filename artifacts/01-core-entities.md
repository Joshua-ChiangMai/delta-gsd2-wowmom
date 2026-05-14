# Core Entities

## Context Status

The formal WOW Mom App specification was not present in the workspace. The entities below are a provisional domain model and should be reconciled with the source specification before any schema, API, or UI implementation begins.

## Primary Entities

### User

Represents an authenticated person using the app.

Likely attributes:

- id
- name
- email or phone
- authentication provider
- role
- status
- createdAt
- updatedAt

Relationships:

- can own or participate in one or more family profiles
- can create child profiles, tasks, routines, notes, or requests depending on role
- can receive notifications

### Mom Profile

Assumption: WOW Mom centers on mothers or maternal caregivers as the primary persona.

Likely attributes:

- id
- userId
- displayName
- householdId
- preferences
- supportNeeds
- availability

Relationships:

- belongs to a user account
- may manage children, household routines, support requests, and caregiver coordination

### Household / Family

Represents the family unit or shared care context.

Likely attributes:

- id
- name
- primaryOwnerId
- inviteCode
- timezone
- status

Relationships:

- has many users or members
- has many child profiles
- has many routines, tasks, events, and notes

### Child Profile

Represents a child connected to a household.

Likely attributes:

- id
- householdId
- name
- birthDate or age range
- careNotes
- allergies
- schedulePreferences

Relationships:

- belongs to a household
- may be associated with tasks, routines, events, milestones, and caregiver notes

### Caregiver / Support Member

Represents another adult who participates in care, such as partner, relative, babysitter, helper, coach, or community supporter.

Likely attributes:

- id
- userId
- householdId
- relationshipToFamily
- permissions
- availability

Relationships:

- belongs to a household by invitation or assignment
- can be assigned tasks, events, or requests

### Task

Represents an actionable responsibility.

Likely attributes:

- id
- householdId
- title
- description
- status
- priority
- dueAt
- assignedToUserId
- createdByUserId
- relatedChildId

Relationships:

- belongs to a household
- may be assigned to a caregiver
- may reference a child, routine, event, or support request

### Routine

Represents repeated care or household activities.

Likely attributes:

- id
- householdId
- title
- schedulePattern
- steps
- activeStatus
- ownerUserId

Relationships:

- belongs to a household
- can generate tasks or reminders
- may apply to one or more children

### Event

Represents a scheduled appointment, activity, reminder, or family calendar item.

Likely attributes:

- id
- householdId
- title
- startsAt
- endsAt
- location
- participants
- relatedChildId

Relationships:

- belongs to a household
- may include caregivers and children
- may trigger notifications

### Support Request

Assumption: The app may help mothers request help from family, friends, or community members.

Likely attributes:

- id
- requesterUserId
- householdId
- title
- description
- requestType
- status
- neededAt
- acceptedByUserId

Relationships:

- created by a mom or household member
- can be accepted or fulfilled by a caregiver or support member
- may create a task or event after acceptance

### Note / Journal Entry

Represents observations, care notes, emotional reflections, or child-related updates.

Likely attributes:

- id
- authorUserId
- householdId
- relatedChildId
- content
- visibility
- tags
- createdAt

Relationships:

- belongs to a household
- may be linked to a child, event, task, or milestone

### Notification

Represents a reminder, invitation, assignment update, or system message.

Likely attributes:

- id
- recipientUserId
- type
- channel
- payload
- readAt
- sentAt

Relationships:

- belongs to a user
- may reference tasks, routines, events, invitations, or support requests

### Invitation

Represents an invitation to join a household or support network.

Likely attributes:

- id
- householdId
- invitedByUserId
- inviteeEmailOrPhone
- intendedRole
- status
- expiresAt

Relationships:

- created by an authorized household member
- accepted by a user
- creates a household membership or caregiver relationship

## Secondary Entities To Validate

- Subscription or plan
- Payment method
- Community group
- Marketplace listing
- Expert / coach profile
- Milestone
- Recommendation
- Content resource
- Emergency contact
- Device or notification token

## Open Questions

- Is WOW Mom primarily a family coordination app, a parenting support app, a wellness app, a commerce app, or a community platform?
- Are children first-class entities in the specification?
- Does the app include professional providers, coaches, or marketplace partners?
- Are payments, subscriptions, or bookings in scope?
- Are roles household-scoped, organization-scoped, or global?

