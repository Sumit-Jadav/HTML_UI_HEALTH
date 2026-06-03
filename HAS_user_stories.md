# Hospital Appointment System (HAS) — User Stories

**Version:** 1.0 | **Based on:** SRS v1.0 (May 2026) | **Status:** Draft

---

## Table of Contents

1. [Patient Registration & Authentication](#1-patient-registration--authentication)
2. [Doctor & Specialty Management](#2-doctor--specialty-management)
3. [Appointment Booking](#3-appointment-booking)
4. [Appointment Management](#4-appointment-management)
5. [Notifications & Reminders](#5-notifications--reminders)
6. [Electronic Medical Records (EMR)](#6-electronic-medical-records-emr)
7. [Payments & Billing](#7-payments--billing)
8. [Telemedicine / Video Consultation](#8-telemedicine--video-consultation)
9. [Administration & Reporting](#9-administration--reporting)

---

## Story Format

Each story follows the standard template:

> **As a** [role], **I want to** [action], **so that** [benefit].

Acceptance criteria are listed under each story. Priority is mapped from the SRS: **High**, **Medium**, or **Low**.

---

## 1. Patient Registration & Authentication

---

### US-PAT-01 — Self-Registration
**Priority:** High | **Req Ref:** FR-PAT-01, FR-PAT-02

**As a** new patient, **I want to** register an account using my name, email, mobile number, date of birth, and gender, **so that** I can access the hospital appointment system.

**Acceptance Criteria:**
- Registration form collects: full name, email address, mobile number, date of birth, and gender.
- All fields are validated for correct format before submission (e.g., valid email format, numeric phone).
- Upon submission, the system sends an OTP to both the provided email and mobile number.
- Account is only activated after both OTP verifications are successfully completed.
- Duplicate email or mobile number results in a clear error message prompting the user to log in or recover their account.

---

### US-PAT-02 — Standard Login
**Priority:** High | **Req Ref:** FR-PAT-03

**As a** registered patient, **I want to** log in using my email/mobile number and password, **so that** I can securely access my account.

**Acceptance Criteria:**
- Login accepts either email address or mobile number combined with a password.
- Successful login redirects the user to their patient dashboard.
- Incorrect credentials display a user-friendly error without revealing which field is wrong.

---

### US-PAT-03 — Social Login
**Priority:** Medium | **Req Ref:** FR-PAT-04

**As a** patient, **I want to** log in using my Google or Apple account, **so that** I don't need to remember a separate password.

**Acceptance Criteria:**
- "Sign in with Google" (OAuth 2.0) and "Sign in with Apple" buttons are available on the login screen.
- First-time social login creates a new patient account and prompts for any missing required fields (e.g., mobile number).
- Returning users are logged in directly and redirected to the dashboard.

---

### US-PAT-04 — Password Reset
**Priority:** High | **Req Ref:** FR-PAT-05

**As a** patient who has forgotten my password, **I want to** reset it via a secure link sent to my email or SMS, **so that** I can regain access to my account.

**Acceptance Criteria:**
- "Forgot Password" option is visible on the login screen.
- User enters their registered email or mobile number and receives a reset link/OTP within 2 minutes.
- The reset link expires after 15 minutes and can only be used once.
- After successful reset, the user is prompted to log in with the new password.

---

### US-PAT-05 — Account Lockout Protection
**Priority:** High | **Req Ref:** FR-PAT-06

**As a** patient, **I want** my account to be locked after repeated failed login attempts, **so that** my account is protected from unauthorized brute-force access.

**Acceptance Criteria:**
- After 5 consecutive failed login attempts, the account is locked.
- A locked account displays a clear message explaining how to unlock (via OTP or admin intervention).
- Unlocking via OTP requires the patient to verify their registered email or mobile.
- Successful unlock resets the failed attempt counter.

---

### US-PAT-06 — Profile Management
**Priority:** Medium | **Req Ref:** FR-PAT-07

**As a** registered patient, **I want to** update my profile information including my address, emergency contact, and profile photo, **so that** my records are always current.

**Acceptance Criteria:**
- Profile page allows editing of: address, emergency contact name and number, and profile photo.
- Photo upload supports JPEG and PNG formats with a maximum file size of 5 MB.
- Changes are saved immediately and reflected across the system.
- Core identity fields (name, DOB, gender) require admin approval to change.

---

### US-PAT-07 — Family Member Profiles
**Priority:** Medium | **Req Ref:** FR-PAT-08

**As a** patient, **I want to** add family members (e.g., spouse, child) to my account, **so that** I can book and manage appointments on their behalf from a single login.

**Acceptance Criteria:**
- Patient can add one or more family member profiles with name, DOB, gender, and relationship.
- Bookings can be made under any family member profile from the main account.
- Appointment history is separately trackable per family member.
- Family member records appear distinctly in the patient dashboard.

---

## 2. Doctor & Specialty Management

---

### US-DOC-01 — Create Doctor Profile
**Priority:** High | **Req Ref:** FR-DOC-01

**As an** administrator, **I want to** create and manage doctor profiles including their name, specialty, qualifications, experience, and consultation fees, **so that** patients can find and book appointments with the right physicians.

**Acceptance Criteria:**
- Admin form includes fields for: full name, specialty (one or more), qualifications, years of experience, and consultation fee.
- All required fields must be filled before the profile can be saved.
- Newly created profiles are immediately visible to patients for booking.
- Consultation fee is stored in the system currency and displayed on the profile.

---

### US-DOC-02 — Enrich Doctor Profile
**Priority:** Medium | **Req Ref:** FR-DOC-02

**As an** administrator, **I want to** add a professional photo, bio, languages spoken, and hospital affiliation to a doctor's profile, **so that** patients can make informed choices about their care provider.

**Acceptance Criteria:**
- Profile supports upload of a professional photo (JPEG/PNG, max 5 MB).
- Bio field accepts up to 1,000 characters of free text.
- Languages spoken can be selected from a predefined list with a free-text option.
- Hospital affiliation is linked to an existing hospital entity in the system.

---

### US-DOC-03 — Multiple Specialties per Doctor
**Priority:** Medium | **Req Ref:** FR-DOC-03

**As an** administrator, **I want to** assign multiple specialties to a single doctor, **so that** patients searching for any of those specialties can find that doctor.

**Acceptance Criteria:**
- Admin can assign more than one specialty to a doctor profile.
- Doctor appears in search results for each assigned specialty.
- Specialty list is managed centrally and reused across all profiles.

---

### US-DOC-04 — Set Working Hours & Slot Duration
**Priority:** High | **Req Ref:** FR-DOC-04

**As a** doctor, **I want to** configure my working days, shift timings, and appointment slot duration, **so that** patients only see slots during times when I am actually available.

**Acceptance Criteria:**
- Doctor can select working days (e.g., Monday–Friday) and define start/end times per day.
- Slot duration can be set to 15, 30, or 45 minutes.
- The system automatically generates available slots based on these settings.
- Changes to working hours apply from the next calendar day and do not affect already-booked appointments.

---

### US-DOC-05 — Mark Dates as Unavailable
**Priority:** High | **Req Ref:** FR-DOC-05

**As a** doctor, **I want to** mark specific dates as unavailable (e.g., for leave or conferences), **so that** patients cannot book appointments on those days.

**Acceptance Criteria:**
- Doctor can select one or a range of dates to block.
- Blocked dates show no available slots to patients.
- Existing bookings on those dates trigger an automatic cancellation notification to affected patients.
- The blocked dates are visible in the doctor's scheduling dashboard.

---

### US-DOC-06 — Real-Time Availability Status
**Priority:** High | **Req Ref:** FR-DOC-06

**As a** patient, **I want to** see the real-time availability status of each doctor, **so that** I know immediately whether I can book an appointment today or need to choose a future date.

**Acceptance Criteria:**
- Doctor profile and search results display a live availability indicator (e.g., "Available Today", "Next Available: [date]").
- Status updates automatically when a slot is booked or released.
- Indicator reflects blocked dates and out-of-hours periods.

---

### US-DOC-07 — Deactivate Doctor Profile
**Priority:** Medium | **Req Ref:** FR-DOC-07

**As an** administrator, **I want to** deactivate or archive a doctor profile without deleting it, **so that** historical appointment and medical record data is preserved while the doctor is no longer bookable.

**Acceptance Criteria:**
- Admin can toggle a doctor profile between Active and Inactive.
- Inactive doctors do not appear in patient search results.
- All historical appointments and EMR records linked to the doctor remain accessible to authorized users.
- A clear "Archived" label is shown when admins view inactive profiles.

---

## 3. Appointment Booking

---

### US-APT-01 — Search for a Doctor
**Priority:** High | **Req Ref:** FR-APT-01

**As a** patient, **I want to** search for doctors by name, specialty, location, language, and gender, **so that** I can quickly find a suitable provider for my needs.

**Acceptance Criteria:**
- Search bar supports free-text input for doctor name.
- Filters are available for specialty, hospital location, language spoken, and doctor gender.
- Results are returned within 1.5 seconds.
- Search results display doctor name, specialty, rating, and next available slot.

---

### US-APT-02 — View Available Slots in Calendar View
**Priority:** High | **Req Ref:** FR-APT-02

**As a** patient, **I want to** view a doctor's available appointment slots in a calendar view filtered by date and time, **so that** I can choose a time that fits my schedule.

**Acceptance Criteria:**
- Calendar shows available (green) and unavailable (grey) slots at a glance.
- Patient can filter by date range and time of day (morning/afternoon/evening).
- Only future slots within the next 60 days are shown.
- Slots already booked or locked by another user in progress are not selectable.

---

### US-APT-03 — Book an Appointment
**Priority:** High | **Req Ref:** FR-APT-03, FR-APT-04, FR-APT-07, FR-APT-08

**As a** patient, **I want to** select an available slot and book an in-person or telemedicine appointment, **so that** I can confirm a consultation with my chosen doctor.

**Acceptance Criteria:**
- Patient selects appointment type: In-Person or Telemedicine.
- The chosen slot is locked in real time during the booking flow to prevent double-booking.
- Booking is not permitted for slots fewer than 2 hours in the future or more than 60 days away.
- Upon successful booking, a unique confirmation number is generated and displayed.
- Confirmation is also sent via email and SMS.

---

### US-APT-04 — Provide Chief Complaint
**Priority:** Medium | **Req Ref:** FR-APT-05

**As a** patient, **I want to** enter a brief description of my reason for visit during booking, **so that** the doctor can prepare for my consultation.

**Acceptance Criteria:**
- A free-text field for "Chief Complaint / Reason for Visit" is shown during the booking flow.
- Field accepts up to 500 characters with a character counter visible to the user.
- Field is optional; booking can proceed if left blank.
- The entered text is stored with the appointment record and visible to the doctor.

---

### US-APT-05 — Upload Documents at Booking
**Priority:** Medium | **Req Ref:** FR-APT-06

**As a** patient, **I want to** upload relevant documents (e.g., reports, prescriptions) when booking my appointment, **so that** the doctor has context before the consultation.

**Acceptance Criteria:**
- Document upload supports PDF, JPEG, and PNG formats up to 10 MB per file.
- Up to 5 documents can be uploaded per appointment.
- Uploaded files are linked to the appointment record and visible to the doctor prior to the consultation.
- Patient receives confirmation that files were successfully attached.

---

### US-APT-06 — Add Appointment to External Calendar
**Priority:** Low | **Req Ref:** FR-APT-10

**As a** patient, **I want to** add my booked appointment to my Google Calendar or Apple Calendar, **so that** I get a reminder within my existing calendar app.

**Acceptance Criteria:**
- Booking confirmation page displays "Add to Calendar" options for Google Calendar and Apple Calendar.
- Google Calendar opens a pre-filled event creation page.
- Apple Calendar / other ICS-compatible apps receive a downloadable `.ics` file.
- The calendar event includes appointment date, time, doctor name, location/video link, and confirmation number.

---

### US-APT-07 — Staff Books for Walk-in Patient
**Priority:** High | **Req Ref:** FR-APT-09

**As a** receptionist, **I want to** book an appointment on behalf of a walk-in patient, **so that** the patient is registered in the system even without self-service access.

**Acceptance Criteria:**
- Staff can search for an existing patient account or create a minimal new patient record.
- Staff can select a doctor, date, slot, and appointment type on the patient's behalf.
- The booking follows the same slot-locking and confirmation rules as a patient self-booking.
- The appointment is marked as "Staff-booked" in the audit log.

---

## 4. Appointment Management

---

### US-MGT-01 — View Appointment History
**Priority:** High | **Req Ref:** FR-MGT-01

**As a** patient, **I want to** view all my upcoming and past appointments in my dashboard, **so that** I can keep track of my care history.

**Acceptance Criteria:**
- Dashboard shows two tabs: "Upcoming" and "Past" appointments.
- Each appointment entry shows: doctor name, specialty, date/time, type, status, and confirmation number.
- Past appointments are listed in reverse chronological order.
- Upcoming appointments are listed in chronological order.

---

### US-MGT-02 — Reschedule an Appointment
**Priority:** High | **Req Ref:** FR-MGT-02

**As a** patient, **I want to** reschedule my appointment to a different available slot, **so that** I can adjust my booking if my plans change.

**Acceptance Criteria:**
- Rescheduling is available for appointments more than 4 hours away.
- Patient is presented with available future slots for the same doctor.
- The original slot is released immediately upon selection of a new slot.
- Both patient and doctor receive a rescheduling notification with the updated details.
- A rescheduling event is recorded in the appointment audit log.

---

### US-MGT-03 — Cancel an Appointment
**Priority:** High | **Req Ref:** FR-MGT-03

**As a** patient, **I want to** cancel an appointment I no longer need, **so that** the slot becomes available to other patients and any applicable refund is processed.

**Acceptance Criteria:**
- Cancel button is visible on any upcoming appointment detail view.
- Patient is prompted to confirm cancellation before it is finalized.
- Upon cancellation, a confirmation notification is sent to the patient.
- The doctor is also notified of the cancellation.
- The slot is released and becomes bookable by other patients.
- Refund eligibility is determined by the configured refund policy (see Payments section).

---

### US-MGT-04 — Update Appointment Status (Doctor/Staff)
**Priority:** High | **Req Ref:** FR-MGT-04

**As a** doctor or receptionist, **I want to** mark an appointment as Completed, No-Show, or Cancelled, **so that** the system accurately reflects the outcome of each consultation.

**Acceptance Criteria:**
- Appointment detail view shows a status dropdown with: Scheduled, In Progress, Completed, No-Show, Cancelled.
- Status can only be updated by the assigned doctor or authorized staff.
- Status changes trigger relevant notifications to the patient.
- Each status change is logged with the user's ID, timestamp, and new status.

---

### US-MGT-05 — Appointment Audit Log
**Priority:** High | **Req Ref:** FR-MGT-05

**As an** administrator, **I want** all appointment status changes to be recorded in an audit log with user, timestamp, and reason, **so that** I can investigate disputes and ensure accountability.

**Acceptance Criteria:**
- Every status change on an appointment creates an audit log entry.
- Each entry captures: appointment ID, previous status, new status, acting user ID, timestamp, and optional reason.
- Audit logs are read-only and cannot be deleted.
- Logs are accessible to admins via the admin panel with search and filter capability.

---

### US-MGT-06 — Admin View All Appointments
**Priority:** High | **Req Ref:** FR-MGT-06

**As an** administrator, **I want to** view all appointments across all doctors and filter them by date, doctor, and status, **so that** I can monitor overall system usage and identify operational issues.

**Acceptance Criteria:**
- Admin has a dedicated "All Appointments" view listing every appointment in the system.
- Filters are available for: date range, specific doctor, department, and status.
- Results can be sorted by date, doctor name, or patient name.
- View supports pagination for large result sets.

---

### US-MGT-07 — Bulk Appointment Cancellation
**Priority:** Medium | **Req Ref:** FR-MGT-07

**As an** administrator, **I want to** cancel all upcoming appointments for a specific doctor in bulk (e.g., due to emergency leave), **so that** affected patients are notified immediately and can rebook.

**Acceptance Criteria:**
- Admin can select a doctor and a date range to perform a bulk cancellation.
- A confirmation prompt shows the number of appointments to be cancelled before proceeding.
- All affected patients receive a cancellation notification within minutes of the action.
- Each individually cancelled appointment is logged in the audit trail with a note indicating bulk cancellation.
- Released slots become immediately available for rebooking.

---

## 5. Notifications & Reminders

---

### US-NOT-01 — Booking Confirmation Notification
**Priority:** High | **Req Ref:** FR-NOT-01

**As a** patient, **I want to** receive a booking confirmation via email and SMS immediately after successfully booking an appointment, **so that** I have a record of my scheduled visit.

**Acceptance Criteria:**
- Confirmation email and SMS are sent within 60 seconds of successful booking.
- Both messages include: doctor name, appointment date/time, type (In-Person/Telemedicine), location or video link, and unique confirmation number.
- Email includes a formatted HTML receipt; SMS contains a concise summary.

---

### US-NOT-02 — Appointment Reminders
**Priority:** High | **Req Ref:** FR-NOT-02

**As a** patient, **I want to** receive automated reminders 24 hours and 2 hours before my appointment, **so that** I don't forget my scheduled consultation.

**Acceptance Criteria:**
- A reminder is sent 24 hours before the appointment via email and SMS.
- A second reminder is sent 2 hours before via SMS and push notification.
- Reminders include: doctor name, appointment time, type, and location or telemedicine join link.
- No reminders are sent for already-cancelled or completed appointments.

---

### US-NOT-03 — Doctor Daily Schedule Summary
**Priority:** Medium | **Req Ref:** FR-NOT-03

**As a** doctor, **I want to** receive a daily schedule summary notification each morning, **so that** I can prepare for the day's consultations.

**Acceptance Criteria:**
- A summary notification is sent each morning at a time configurable by the doctor or admin.
- Summary includes: list of appointments for the day with patient name, time slot, type, and chief complaint.
- Summary is delivered via email (and optionally push notification).
- On days with no appointments, no notification is sent (or a brief "No appointments today" message).

---

### US-NOT-04 — Cancellation & Rescheduling Notifications
**Priority:** High | **Req Ref:** FR-NOT-04

**As a** patient or doctor, **I want to** be notified whenever an appointment I am involved in is cancelled or rescheduled, **so that** I can adjust my plans accordingly.

**Acceptance Criteria:**
- Both patient and doctor receive a notification for every cancellation and reschedule event.
- Notification includes: original appointment details, new details (if rescheduled), and reason (if provided).
- Delivery is via email, SMS, and push notification.
- Notifications are sent within 60 seconds of the status change.

---

### US-NOT-05 — Post-Appointment Review Request
**Priority:** Low | **Req Ref:** FR-NOT-05

**As a** patient, **I want to** receive a notification after my appointment with a link to rate and review my doctor, **so that** I can share feedback that helps other patients.

**Acceptance Criteria:**
- A notification is sent within 2 hours of an appointment being marked "Completed".
- Notification includes a direct link to the doctor review/rating page.
- The review link is valid for 7 days after the appointment.
- Patients who have already submitted a review do not receive duplicate prompts.

---

### US-NOT-06 — Configurable Notification Templates
**Priority:** Medium | **Req Ref:** FR-NOT-06

**As an** administrator, **I want to** configure notification templates for all event types, **so that** communications reflect our hospital's branding and preferred messaging.

**Acceptance Criteria:**
- Admin panel provides an editable template for each notification event (booking confirmation, reminder, cancellation, etc.).
- Templates support dynamic placeholders (e.g., `{{patient_name}}`, `{{appointment_time}}`).
- Changes to templates apply to all future notifications of that type.
- A preview function allows admin to see a rendered version of the template before saving.

---

### US-NOT-07 — Opt Out of Non-Critical Notifications
**Priority:** Medium | **Req Ref:** FR-NOT-07

**As a** patient, **I want to** opt out of non-critical notifications, **so that** I only receive communications that are essential to my care.

**Acceptance Criteria:**
- Patient settings page shows a list of notification types with on/off toggles.
- Critical notifications (booking confirmation, cancellation alerts) cannot be disabled.
- Non-critical notifications (reminders, review requests, promotional messages) can be disabled individually.
- Preferences are saved immediately and respected for all subsequent communications.

---

## 6. Electronic Medical Records (EMR)

---

### US-EMR-01 — Create Medical Record After Consultation
**Priority:** High | **Req Ref:** FR-EMR-01, FR-EMR-02

**As a** doctor, **I want to** create a structured medical record for each completed appointment including diagnosis, prescription, and follow-up notes, **so that** the patient's health history is accurately documented.

**Acceptance Criteria:**
- EMR creation form is accessible from the appointment detail view once status is "In Progress" or "Completed".
- Form includes structured fields for: chief complaint, examination findings, diagnosis (ICD-10 coded), prescribed medications (name, dosage, duration), lab orders, and follow-up date/notes.
- ICD-10 lookup is available via a searchable dropdown integrated with the ICD-10 database.
- Record is saved with a timestamp and the doctor's ID.
- Upon saving, the patient receives a notification that their record is available.

---

### US-EMR-02 — Attach Files to Medical Record
**Priority:** High | **Req Ref:** FR-EMR-03

**As a** doctor, **I want to** attach lab reports, imaging results, or scans to a patient's medical record, **so that** all relevant clinical documents are stored in one place.

**Acceptance Criteria:**
- Doctors can upload files (PDF, JPEG, PNG, DICOM) up to 20 MB each to any medical record.
- Up to 10 attachments can be added per record.
- Attachments are labelled with file name and upload date/time.
- Attachments are accessible to the patient and any authorized doctor within the network.

---

### US-EMR-03 — Patient Views Medical History
**Priority:** High | **Req Ref:** FR-EMR-04, FR-EMR-05

**As a** patient, **I want to** view my complete medical history from my portal and download records as a PDF, **so that** I have full visibility into and ownership of my health information.

**Acceptance Criteria:**
- Patient dashboard includes a "Medical Records" section listing all records chronologically.
- Each record shows: date, doctor name, diagnosis, prescriptions, and attachments.
- Patient can view the full detail of each record within the portal.
- A "Download PDF" button exports the selected record as a formatted, printable PDF.

---

### US-EMR-04 — Immutable Records with Amendment Tracking
**Priority:** High | **Req Ref:** FR-EMR-06

**As a** doctor, **I want** medical records to be locked once saved, with any corrections tracked as amendments, **so that** the integrity of clinical documentation is maintained for compliance purposes.

**Acceptance Criteria:**
- Once a medical record is saved, its original content cannot be edited or deleted.
- A doctor can submit an amendment that appears as a separate, timestamped entry linked to the original record.
- Each amendment records the author (doctor name), timestamp, and the nature of the change.
- Both the original record and all amendments are visible in the patient's history.

---

### US-EMR-05 — Share Records with Another Doctor
**Priority:** Medium | **Req Ref:** FR-EMR-07

**As a** patient, **I want to** grant specific doctors within the network access to selected medical records, **so that** I can receive coordinated care without repeatedly sharing physical documents.

**Acceptance Criteria:**
- Patient can browse their medical records and select which records to share.
- Sharing is restricted to doctors registered within the HAS network.
- Patient can revoke access to a shared record at any time.
- The receiving doctor is notified when access is granted and can view the record from their dashboard.

---

### US-EMR-06 — Medication History & Drug Interaction Flag
**Priority:** Medium | **Req Ref:** FR-EMR-08

**As a** doctor, **I want** the system to maintain a complete medication history for each patient and flag potential drug interactions, **so that** I can prescribe safely.

**Acceptance Criteria:**
- All medications prescribed across all records are compiled into a patient medication timeline.
- When a doctor enters a new prescription, the system checks for known interactions with active medications.
- Detected interactions display a warning with severity level (e.g., Major, Moderate, Minor) before the doctor saves the record.
- Doctor can acknowledge the warning and proceed, with the acknowledgment recorded.

---

## 7. Payments & Billing

---

### US-PAY-01 — Pay Consultation Fee at Booking
**Priority:** High | **Req Ref:** FR-PAY-01

**As a** patient, **I want to** pay the consultation fee at the time of booking using my preferred payment method, **so that** my appointment is confirmed and the payment is processed securely in one step.

**Acceptance Criteria:**
- Payment step is integrated into the booking flow after slot selection.
- Accepted methods: credit/debit card, UPI, net banking, and digital wallets.
- Payment is processed via the integrated gateway (Razorpay for India, Stripe for international).
- A failed payment returns the patient to the payment step with a clear error message; the slot remains locked for 5 minutes.
- Appointment is confirmed only after successful payment authorization.

---

### US-PAY-02 — Receive Invoice/Receipt
**Priority:** High | **Req Ref:** FR-PAY-02

**As a** patient, **I want to** receive an itemized invoice/receipt for every payment I make, **so that** I have a record for personal accounting or insurance reimbursement.

**Acceptance Criteria:**
- An invoice is generated automatically upon successful payment.
- Invoice includes: patient name, doctor name, appointment date/time, consultation fee, taxes (if applicable), payment method, gateway transaction ID, and timestamp.
- Invoice is sent via email and is also accessible from the "Payment History" section of the patient dashboard.

---

### US-PAY-03 — Automatic Refund on Cancellation
**Priority:** High | **Req Ref:** FR-PAY-03

**As a** patient, **I want to** receive an automatic refund when I cancel within the eligible window, **so that** I am not charged for appointments I could not attend.

**Acceptance Criteria:**
- Refund eligibility is determined by the refund policy configured for the doctor/department.
- If eligible, the refund is initiated automatically to the original payment method within 24 hours.
- Patient receives a refund confirmation notification with the expected settlement timeline.
- Ineligible cancellations display the policy reason to the patient before final confirmation.

---

### US-PAY-04 — Configure Refund Policies
**Priority:** Medium | **Req Ref:** FR-PAY-04

**As an** administrator, **I want to** configure refund policies by doctor or department, **so that** the system automatically applies the correct refund rules without manual intervention.

**Acceptance Criteria:**
- Admin can define refund rules per doctor or department: e.g., "Full refund if cancelled >24 hours before", "No refund within 2 hours".
- Policies apply automatically at the point of cancellation.
- Changing a policy does not affect already-booked appointments (applies to future bookings only).

---

### US-PAY-05 — View Payment History
**Priority:** Medium | **Req Ref:** FR-PAY-05

**As a** patient, **I want to** view my full payment history in my dashboard, **so that** I can track what I have paid and monitor any pending refunds.

**Acceptance Criteria:**
- "Payment History" section lists all transactions in reverse chronological order.
- Each entry shows: appointment details, amount paid, payment method, status (Paid/Refunded/Pending), and invoice download link.
- Refund status is updated in real time as it progresses.

---

### US-PAY-06 — Full Payment Audit Trail
**Priority:** High | **Req Ref:** FR-PAY-06

**As an** administrator, **I want** every payment transaction to be logged with the gateway transaction ID, amount, and timestamp, **so that** I can reconcile accounts and support financial audits.

**Acceptance Criteria:**
- Every payment, refund, and failed transaction is recorded in the system.
- Each log entry includes: payment ID, appointment ID, gateway transaction ID, amount, currency, status, and timestamp.
- Payment logs are accessible to admins and are read-only.
- Logs are retained for 7 years per the data retention policy.

---

## 8. Telemedicine / Video Consultation

---

### US-TEL-01 — Unique Secure Video Link
**Priority:** High | **Req Ref:** FR-TEL-01, FR-TEL-02

**As a** patient or doctor, **I want** the system to generate a unique, secure video call link for each telemedicine appointment that activates 10 minutes before the scheduled time, **so that** we can connect at the right moment without security risks.

**Acceptance Criteria:**
- A unique video link is generated automatically when a telemedicine appointment is confirmed.
- The link is inactive before the 10-minute activation window.
- Link is accessible from the appointment detail page and included in the reminder notification.
- Attempting to join before the activation window shows a "Session not yet open" message with a countdown.

---

### US-TEL-02 — Join Video Call In-App
**Priority:** High | **Req Ref:** FR-TEL-03

**As a** patient or doctor, **I want to** join the video consultation directly within the application, **so that** I don't need to install or set up any third-party software.

**Acceptance Criteria:**
- Video call opens within the HAS web or mobile application via the embedded Zoom SDK or Daily.co API.
- No separate app download or plugin installation is required.
- Patient and doctor must be authenticated HAS users to join the call.
- Disconnection from the call provides a prompt to rejoin.

---

### US-TEL-03 — Screen Sharing During Video Call
**Priority:** Medium | **Req Ref:** FR-TEL-04

**As a** doctor, **I want to** share my screen during a video consultation, **so that** I can display and explain reports, images, or diagrams to the patient.

**Acceptance Criteria:**
- A "Share Screen" button is available in the video call interface.
- Sharing works on both web and mobile platforms (mobile shares the device screen).
- The patient sees a notification when screen sharing starts and stops.
- Screen sharing can be stopped at any time by the doctor.

---

### US-TEL-04 — Video Session Logging
**Priority:** Medium | **Req Ref:** FR-TEL-05

**As an** administrator, **I want** video session metadata (duration and participants) to be recorded for each telemedicine call, **so that** we have data for compliance, billing verification, and dispute resolution.

**Acceptance Criteria:**
- System logs session start time, end time, duration, and participant IDs for every telemedicine call.
- Logs are linked to the corresponding appointment record.
- Session logs are accessible to admins only and are read-only.
- Logs are retained as part of the appointment record retention policy (5 years).

---

## 9. Administration & Reporting

---

### US-ADM-01 — User Account Management
**Priority:** High | **Req Ref:** FR-ADM-01

**As an** administrator, **I want to** create, edit, activate, and deactivate user accounts for patients, doctors, and staff, **so that** I can control access to the system efficiently.

**Acceptance Criteria:**
- Admin panel provides a unified User Management view listing all users by role.
- Admin can create new accounts for any role by entering required details.
- Admin can edit profile information, reset passwords, or change role assignments.
- Deactivating an account prevents login immediately without deleting historical data.
- All account management actions are recorded in the system audit log.

---

### US-ADM-02 — Real-Time Admin Dashboard
**Priority:** High | **Req Ref:** FR-ADM-02

**As an** administrator, **I want** a dashboard showing real-time metrics — appointments booked today, active patients, revenue, and cancellation rate — **so that** I can monitor operations at a glance.

**Acceptance Criteria:**
- Dashboard is the landing page after admin login.
- Key metrics displayed: total appointments today, number of active patients, today's revenue, and cancellation rate (current period).
- All metrics refresh automatically (maximum 60-second delay).
- Metrics are presented with clear visual charts/graphs and trend indicators.

---

### US-ADM-03 — Custom Report Generation
**Priority:** High | **Req Ref:** FR-ADM-03, FR-ADM-04

**As an** administrator, **I want to** generate custom reports filtered by date range, doctor, department, appointment type, and status, and export them as PDF, CSV, or Excel, **so that** I can analyze performance and share findings with hospital leadership.

**Acceptance Criteria:**
- Reports section allows selection of report type (e.g., Appointment Summary, Revenue Report, No-Show Analysis).
- All filter options are available: date range, doctor, department, appointment type, status.
- Reports render within 10 seconds for date ranges up to 1 year.
- Export formats available: PDF, CSV, and Excel (.xlsx).
- Each report download is logged with admin ID, report type, filters applied, and timestamp.

---

### US-ADM-04 — System Audit Log Access
**Priority:** High | **Req Ref:** FR-ADM-05

**As an** administrator, **I want to** view a comprehensive system audit log, **so that** I can investigate incidents, track data access, and demonstrate compliance to auditors.

**Acceptance Criteria:**
- Audit log is accessible only to users with the Administrator or Super Admin role.
- Log displays: user ID, action type, target entity, target ID, timestamp, and IP address.
- Log supports filtering by user, action type, date range, and entity type.
- Audit log entries cannot be edited or deleted.
- Logs are retained for a minimum of 2 years.

---

### US-ADM-05 — Hospital-Wide Settings Configuration
**Priority:** High | **Req Ref:** FR-ADM-06

**As an** administrator, **I want to** configure hospital-wide settings including working hours, public holidays, slot duration defaults, and notification templates, **so that** the system operates according to our specific operational needs.

**Acceptance Criteria:**
- Settings panel provides controls for: global working hours, public holiday calendar, default appointment slot duration, and notification template editor.
- Changes take effect from the next business day or as specified.
- Super Admin can override settings at the branch level.
- All settings changes are recorded in the audit log.

---

### US-ADM-06 — Multi-Branch Management
**Priority:** Medium | **Req Ref:** FR-ADM-07

**As a** super administrator, **I want to** manage multiple hospital branches with separate configurations, **so that** the system can serve a clinic network while each branch operates independently.

**Acceptance Criteria:**
- Super Admin can create, configure, and deactivate hospital branch entities.
- Each branch has its own working hours, doctor roster, and settings.
- Patients can search and book appointments at specific branches.
- Reports can be generated for individual branches or consolidated across the network.

---

## Summary Table

| Epic | # Stories | High Priority | Medium Priority | Low Priority |
|------|-----------|--------------|----------------|-------------|
| Patient Registration & Auth | 7 | 4 | 3 | 0 |
| Doctor & Specialty Mgmt | 7 | 4 | 3 | 0 |
| Appointment Booking | 7 | 5 | 2 | 1 |
| Appointment Management | 7 | 6 | 1 | 0 |
| Notifications & Reminders | 7 | 3 | 3 | 1 |
| EMR | 6 | 3 | 3 | 0 |
| Payments & Billing | 6 | 4 | 2 | 0 |
| Telemedicine | 4 | 2 | 2 | 0 |
| Administration & Reporting | 6 | 5 | 1 | 0 |
| **Total** | **57** | **36** | **20** | **1** |

---

*Generated from Hospital Appointment System SRS v1.0 — May 2026*
