# SAKIM Digital Seva Kendra - Security Specification

## 1. Data Invariants
1. A user cannot access or read another user's profile, PII, or contact numbers (`users/{userId}`).
2. A normal user cannot assign themselves the 'admin' role upon registration.
3. Applications (`applications/{appId}`) must always link to the creator's UID (`userId == request.auth.uid`).
4. Only administrators (`isAdmin()`) or the bootstrapped verified administrator (`sakimhossaink@gmail.com`) can view all applications, approve statuses, or update application workflow states.
5. All document IDs must conform to `isValidId` patterns (`^[a-zA-Z0-9_-]+$`) to prevent path injection.

## 2. The Dirty Dozen Attack Payloads
1. **Self-Escalation Attack**: Customer sends payload `{ role: "admin" }` to `/users/{uid}` on register -> REJECTED.
2. **Impersonation Read**: User B requests `/users/UserA` -> REJECTED.
3. **Application Hijack**: User B queries all applications without filtering `userId == UserB` -> REJECTED.
4. **Forged Application Author**: User B creates application with `userId: UserA` -> REJECTED.
5. **Admin Whitelist Injection**: User B tries to write to `/admins/{uid}` -> REJECTED.
6. **Path Injection**: User requests document with ID `../../passwords` -> REJECTED.
7. **Unauthenticated Read**: Anonymous visitor queries `/applications` -> REJECTED.
8. **Malicious Role Update**: Customer updates profile and changes `role: "admin"` -> REJECTED.
9. **Notification Snooping**: User B queries User A's notifications -> REJECTED.
10. **Application Tampering**: Non-admin user attempts to set `status: "approved"` on completed record -> REJECTED.
11. **Excessive String Payload**: Attacker posts 1MB description payload -> REJECTED by schema length guard.
12. **Delete Attack**: Normal user attempts to delete an active application document -> REJECTED.
