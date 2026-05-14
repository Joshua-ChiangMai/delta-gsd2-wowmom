# User Roles

## Context Status

The formal specification was not present in the workspace. The roles below are provisional and should be confirmed against the source specification.

## Primary Roles

### Mom / Primary Caregiver

Assumption: The main app user and decision maker.

Responsibilities:

- creates and manages the household or family profile
- manages child profiles
- creates routines, tasks, events, notes, and support requests
- invites caregivers or support members
- controls visibility and permissions for household information

Likely permissions:

- full access to household data they own or administer
- assign tasks and manage schedules
- approve or revoke household membership
- configure notifications and preferences

### Partner / Co-Parent

Assumption: A trusted caregiver with broad household access.

Responsibilities:

- participates in child care coordination
- accepts or manages assigned tasks
- creates events, notes, and routine updates
- helps fulfill support requests

Likely permissions:

- read and write access to shared household information
- manage assigned responsibilities
- may invite others if granted admin rights

### Family Support Member

Assumption: Relative, friend, or trusted helper.

Responsibilities:

- views relevant tasks, events, and requests
- accepts assignments or support requests
- receives notifications

Likely permissions:

- limited access scoped to assigned or shared items
- no default access to private notes or sensitive child information

### Babysitter / External Caregiver

Assumption: Temporary or recurring care provider.

Responsibilities:

- views assigned schedules, care notes, and child-specific instructions
- updates task completion or care status
- may add care notes after an assignment

Likely permissions:

- time-bounded or assignment-scoped access
- limited visibility into household history

### Child

Assumption: Children are represented as profiles rather than normal app operators unless the specification includes child-facing experiences.

Responsibilities:

- none by default

Likely permissions:

- no login by default
- may have a limited child account if the specification includes age-appropriate participation

### Administrator

Represents an internal operational user for support, moderation, or configuration.

Responsibilities:

- manage app configuration
- support users
- review abuse reports or problematic content if community features exist
- monitor platform health

Likely permissions:

- limited operational access
- should avoid unrestricted access to private household data unless explicitly required and audited

## Possible Extended Roles

### Professional Provider

Assumption: Only relevant if the app includes coaching, expert advice, classes, or services.

Examples:

- parenting coach
- lactation consultant
- therapist
- pediatric specialist
- educator

### Community Moderator

Assumption: Only relevant if the app includes groups, forums, or public content.

### Vendor / Marketplace Partner

Assumption: Only relevant if the app includes shopping, bookings, or partner services.

## Role Model Considerations

- Roles should likely be scoped to a household, not just global accounts.
- A single user may have different roles in different households.
- Permissions should be explicit for sensitive child and family data.
- Invitations should define intended role before the invite is accepted.
- Temporary caregivers may need expiration dates and limited access.

## Open Questions

- Is "mom" a fixed role, a profile type, or just the target persona?
- Can one household have multiple primary caregivers?
- Are professional providers part of the first release?
- Does the specification require child accounts?
- What privacy restrictions apply to support members and temporary caregivers?

