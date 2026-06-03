-- ============================================================
-- Hospital Appointment System (HAS) — MySQL Database Schema
-- Version: 1.0 | Based on SRS v1.0 (May 2026)
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO';

-- ============================================================
-- 1. HOSPITALS / BRANCHES
-- ============================================================

CREATE TABLE hospitals (
    hospital_id     INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    name            VARCHAR(200)    NOT NULL,
    branch_code     VARCHAR(50)     NOT NULL UNIQUE,
    address         TEXT            NOT NULL,
    city            VARCHAR(100)    NOT NULL,
    state           VARCHAR(100)    NOT NULL,
    country         VARCHAR(100)    NOT NULL DEFAULT 'India',
    phone           VARCHAR(20),
    email           VARCHAR(255),
    timezone        VARCHAR(60)     NOT NULL DEFAULT 'Asia/Kolkata',
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (hospital_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 2. SPECIALTIES
-- ============================================================

CREATE TABLE specialties (
    specialty_id    INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    name            VARCHAR(150)    NOT NULL UNIQUE,
    description     TEXT,
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (specialty_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 3. USERS (unified auth table for all roles)
-- ============================================================

CREATE TABLE users (
    user_id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    phone           VARCHAR(20)     NOT NULL UNIQUE,
    password_hash   VARCHAR(255),                           -- NULL for OAuth-only accounts
    role            ENUM('patient','doctor','staff','admin','super_admin') NOT NULL,
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    is_verified     TINYINT(1)      NOT NULL DEFAULT 0,     -- email + phone OTP verified
    mfa_enabled     TINYINT(1)      NOT NULL DEFAULT 0,
    mfa_secret      VARCHAR(100),
    failed_logins   TINYINT         NOT NULL DEFAULT 0,
    locked_until    DATETIME,
    last_login_at   DATETIME,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    INDEX idx_users_role (role),
    INDEX idx_users_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- OAuth provider links (Google, Apple)
CREATE TABLE user_oauth_providers (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    user_id         INT UNSIGNED    NOT NULL,
    provider        ENUM('google','apple') NOT NULL,
    provider_uid    VARCHAR(255)    NOT NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_provider_uid (provider, provider_uid),
    CONSTRAINT fk_oauth_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 4. PATIENTS
-- ============================================================

CREATE TABLE patients (
    patient_id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    user_id             INT UNSIGNED    NOT NULL UNIQUE,
    full_name           VARCHAR(200)    NOT NULL,
    date_of_birth       DATE            NOT NULL,
    gender              ENUM('male','female','other','prefer_not_to_say') NOT NULL,
    blood_group         ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-','unknown') DEFAULT 'unknown',
    address             TEXT,
    city                VARCHAR(100),
    state               VARCHAR(100),
    country             VARCHAR(100),
    pincode             VARCHAR(20),
    profile_photo_url   VARCHAR(500),
    insurance_provider  VARCHAR(200),
    insurance_policy_no VARCHAR(100),
    emergency_contact_name  VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (patient_id),
    CONSTRAINT fk_patient_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Family member sub-profiles linked to a primary patient account
CREATE TABLE patient_family_members (
    member_id       INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    patient_id      INT UNSIGNED    NOT NULL,               -- primary account holder
    full_name       VARCHAR(200)    NOT NULL,
    relationship    VARCHAR(50)     NOT NULL,               -- spouse, child, parent, etc.
    date_of_birth   DATE,
    gender          ENUM('male','female','other','prefer_not_to_say'),
    blood_group     ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-','unknown') DEFAULT 'unknown',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (member_id),
    CONSTRAINT fk_family_patient FOREIGN KEY (patient_id) REFERENCES patients (patient_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 5. DOCTORS
-- ============================================================

CREATE TABLE doctors (
    doctor_id           INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    user_id             INT UNSIGNED    NOT NULL UNIQUE,
    hospital_id         INT UNSIGNED    NOT NULL,
    full_name           VARCHAR(200)    NOT NULL,
    profile_photo_url   VARCHAR(500),
    bio                 TEXT,
    experience_years    TINYINT UNSIGNED NOT NULL DEFAULT 0,
    consultation_fee    DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    rating              DECIMAL(3,2)    NOT NULL DEFAULT 0.00,
    rating_count        INT UNSIGNED    NOT NULL DEFAULT 0,
    slot_duration_mins  TINYINT UNSIGNED NOT NULL DEFAULT 15, -- 15 or 30 minutes
    is_active           TINYINT(1)      NOT NULL DEFAULT 1,
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (doctor_id),
    CONSTRAINT fk_doctor_user     FOREIGN KEY (user_id)     REFERENCES users (user_id)     ON DELETE CASCADE,
    CONSTRAINT fk_doctor_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals (hospital_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Doctor qualifications (one row per degree/certification)
CREATE TABLE doctor_qualifications (
    qualification_id    INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    doctor_id           INT UNSIGNED    NOT NULL,
    degree              VARCHAR(200)    NOT NULL,
    institution         VARCHAR(300),
    year_obtained       YEAR,
    PRIMARY KEY (qualification_id),
    CONSTRAINT fk_qual_doctor FOREIGN KEY (doctor_id) REFERENCES doctors (doctor_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Doctor ↔ Specialty (many-to-many)
CREATE TABLE doctor_specialties (
    doctor_id       INT UNSIGNED    NOT NULL,
    specialty_id    INT UNSIGNED    NOT NULL,
    is_primary      TINYINT(1)      NOT NULL DEFAULT 0,
    PRIMARY KEY (doctor_id, specialty_id),
    CONSTRAINT fk_ds_doctor    FOREIGN KEY (doctor_id)    REFERENCES doctors (doctor_id)    ON DELETE CASCADE,
    CONSTRAINT fk_ds_specialty FOREIGN KEY (specialty_id) REFERENCES specialties (specialty_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Languages spoken by a doctor
CREATE TABLE doctor_languages (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    doctor_id   INT UNSIGNED    NOT NULL,
    language    VARCHAR(80)     NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_lang_doctor FOREIGN KEY (doctor_id) REFERENCES doctors (doctor_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 6. DOCTOR AVAILABILITY
-- ============================================================

-- Weekly recurring availability schedule
CREATE TABLE doctor_schedules (
    schedule_id     INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    doctor_id       INT UNSIGNED    NOT NULL,
    day_of_week     TINYINT         NOT NULL,   -- 0=Sunday … 6=Saturday
    start_time      TIME            NOT NULL,
    end_time        TIME            NOT NULL,
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (schedule_id),
    CONSTRAINT fk_sched_doctor FOREIGN KEY (doctor_id) REFERENCES doctors (doctor_id) ON DELETE CASCADE,
    CHECK (end_time > start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Date-specific overrides (leave, conference, holiday)
CREATE TABLE doctor_unavailability (
    unavailability_id   INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    doctor_id           INT UNSIGNED    NOT NULL,
    unavailable_date    DATE            NOT NULL,
    reason              VARCHAR(300),
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (unavailability_id),
    UNIQUE KEY uq_doc_date (doctor_id, unavailable_date),
    CONSTRAINT fk_unavail_doctor FOREIGN KEY (doctor_id) REFERENCES doctors (doctor_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 7. APPOINTMENTS
-- ============================================================

CREATE TABLE appointments (
    appointment_id      INT UNSIGNED        NOT NULL AUTO_INCREMENT,
    confirmation_no     VARCHAR(20)         NOT NULL UNIQUE,    -- system-generated unique ref
    patient_id          INT UNSIGNED        NOT NULL,
    family_member_id    INT UNSIGNED,                           -- NULL = appointment for self
    doctor_id           INT UNSIGNED        NOT NULL,
    hospital_id         INT UNSIGNED        NOT NULL,
    slot_datetime       DATETIME            NOT NULL,           -- scheduled start (UTC)
    slot_end_datetime   DATETIME            NOT NULL,           -- scheduled end (UTC)
    type                ENUM('in_person','telemedicine') NOT NULL DEFAULT 'in_person',
    status              ENUM('pending','confirmed','in_progress','completed','cancelled','no_show') NOT NULL DEFAULT 'pending',
    chief_complaint     VARCHAR(500),
    booked_by_role      ENUM('patient','staff','admin') NOT NULL DEFAULT 'patient',
    booked_by_user_id   INT UNSIGNED,
    cancelled_by_role   ENUM('patient','doctor','staff','admin'),
    cancellation_reason VARCHAR(500),
    cancelled_at        DATETIME,
    created_at          DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (appointment_id),
    INDEX idx_apt_patient    (patient_id),
    INDEX idx_apt_doctor     (doctor_id),
    INDEX idx_apt_slot       (slot_datetime),
    INDEX idx_apt_status     (status),
    CONSTRAINT fk_apt_patient   FOREIGN KEY (patient_id)       REFERENCES patients (patient_id),
    CONSTRAINT fk_apt_family    FOREIGN KEY (family_member_id) REFERENCES patient_family_members (member_id),
    CONSTRAINT fk_apt_doctor    FOREIGN KEY (doctor_id)        REFERENCES doctors (doctor_id),
    CONSTRAINT fk_apt_hospital  FOREIGN KEY (hospital_id)      REFERENCES hospitals (hospital_id),
    CONSTRAINT fk_apt_booker    FOREIGN KEY (booked_by_user_id) REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Files attached at booking time (reports, prescriptions)
CREATE TABLE appointment_documents (
    document_id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    appointment_id      INT UNSIGNED    NOT NULL,
    file_name           VARCHAR(300)    NOT NULL,
    file_url            VARCHAR(500)    NOT NULL,
    file_size_bytes     INT UNSIGNED,
    mime_type           VARCHAR(100),
    uploaded_at         DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (document_id),
    CONSTRAINT fk_doc_appointment FOREIGN KEY (appointment_id) REFERENCES appointments (appointment_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tracks every status change for audit / compliance
CREATE TABLE appointment_status_log (
    log_id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    appointment_id  INT UNSIGNED    NOT NULL,
    old_status      VARCHAR(20),
    new_status      VARCHAR(20)     NOT NULL,
    changed_by      INT UNSIGNED    NOT NULL,
    reason          VARCHAR(500),
    changed_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (log_id),
    CONSTRAINT fk_statuslog_apt  FOREIGN KEY (appointment_id) REFERENCES appointments (appointment_id) ON DELETE CASCADE,
    CONSTRAINT fk_statuslog_user FOREIGN KEY (changed_by)     REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 8. TELEMEDICINE
-- ============================================================

CREATE TABLE telemedicine_sessions (
    session_id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    appointment_id      INT UNSIGNED    NOT NULL UNIQUE,
    video_link          VARCHAR(500)    NOT NULL,
    provider            ENUM('zoom','daily','other') NOT NULL DEFAULT 'zoom',
    external_session_id VARCHAR(255),
    link_active_from    DATETIME        NOT NULL,               -- slot_datetime - 10 minutes
    started_at          DATETIME,
    ended_at            DATETIME,
    duration_seconds    INT UNSIGNED,
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (session_id),
    CONSTRAINT fk_tel_appointment FOREIGN KEY (appointment_id) REFERENCES appointments (appointment_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 9. ELECTRONIC MEDICAL RECORDS (EMR)
-- ============================================================

CREATE TABLE medical_records (
    record_id           INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    appointment_id      INT UNSIGNED    NOT NULL UNIQUE,
    patient_id          INT UNSIGNED    NOT NULL,
    doctor_id           INT UNSIGNED    NOT NULL,
    chief_complaint     TEXT,
    examination_notes   TEXT,
    diagnosis_icd10     VARCHAR(10),                            -- ICD-10 code
    diagnosis_desc      VARCHAR(500),
    follow_up_date      DATE,
    follow_up_notes     VARCHAR(500),
    is_locked           TINYINT(1)      NOT NULL DEFAULT 1,     -- immutable once saved
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (record_id),
    INDEX idx_mr_patient (patient_id),
    CONSTRAINT fk_mr_appointment FOREIGN KEY (appointment_id) REFERENCES appointments (appointment_id),
    CONSTRAINT fk_mr_patient     FOREIGN KEY (patient_id)     REFERENCES patients (patient_id),
    CONSTRAINT fk_mr_doctor      FOREIGN KEY (doctor_id)      REFERENCES doctors (doctor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Prescriptions within a medical record
CREATE TABLE prescriptions (
    prescription_id     INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    record_id           INT UNSIGNED    NOT NULL,
    drug_name           VARCHAR(200)    NOT NULL,
    dosage              VARCHAR(100),
    frequency           VARCHAR(100),
    duration            VARCHAR(100),
    instructions        VARCHAR(500),
    PRIMARY KEY (prescription_id),
    CONSTRAINT fk_rx_record FOREIGN KEY (record_id) REFERENCES medical_records (record_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Lab/imaging orders
CREATE TABLE lab_orders (
    lab_order_id    INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    record_id       INT UNSIGNED    NOT NULL,
    test_name       VARCHAR(300)    NOT NULL,
    urgency         ENUM('routine','urgent','stat') NOT NULL DEFAULT 'routine',
    notes           VARCHAR(500),
    ordered_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (lab_order_id),
    CONSTRAINT fk_lab_record FOREIGN KEY (record_id) REFERENCES medical_records (record_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Attached files (scans, reports) on a medical record
CREATE TABLE medical_record_attachments (
    attachment_id   INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    record_id       INT UNSIGNED    NOT NULL,
    file_name       VARCHAR(300)    NOT NULL,
    file_url        VARCHAR(500)    NOT NULL,
    file_size_bytes INT UNSIGNED,
    mime_type       VARCHAR(100),
    uploaded_at     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (attachment_id),
    CONSTRAINT fk_attach_record FOREIGN KEY (record_id) REFERENCES medical_records (record_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Immutable amendments to a locked medical record
CREATE TABLE medical_record_amendments (
    amendment_id    INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    record_id       INT UNSIGNED    NOT NULL,
    amended_by      INT UNSIGNED    NOT NULL,               -- doctor user_id
    field_name      VARCHAR(100)    NOT NULL,
    old_value       TEXT,
    new_value       TEXT,
    reason          VARCHAR(500),
    amended_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (amendment_id),
    CONSTRAINT fk_amend_record FOREIGN KEY (record_id)   REFERENCES medical_records (record_id) ON DELETE CASCADE,
    CONSTRAINT fk_amend_doctor FOREIGN KEY (amended_by)  REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Patients granting other doctors access to specific records
CREATE TABLE medical_record_access_grants (
    grant_id        INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    record_id       INT UNSIGNED    NOT NULL,
    granted_by      INT UNSIGNED    NOT NULL,               -- patient user_id
    granted_to      INT UNSIGNED    NOT NULL,               -- doctor user_id
    expires_at      DATETIME,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (grant_id),
    CONSTRAINT fk_grant_record  FOREIGN KEY (record_id)   REFERENCES medical_records (record_id) ON DELETE CASCADE,
    CONSTRAINT fk_grant_patient FOREIGN KEY (granted_by)  REFERENCES users (user_id),
    CONSTRAINT fk_grant_doctor  FOREIGN KEY (granted_to)  REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 10. PAYMENTS & BILLING
-- ============================================================

CREATE TABLE payments (
    payment_id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    appointment_id          INT UNSIGNED    NOT NULL UNIQUE,
    patient_id              INT UNSIGNED    NOT NULL,
    amount                  DECIMAL(10,2)   NOT NULL,
    currency                CHAR(3)         NOT NULL DEFAULT 'INR',
    gateway                 ENUM('razorpay','stripe','other') NOT NULL,
    gateway_transaction_id  VARCHAR(255)    NOT NULL,
    gateway_order_id        VARCHAR(255),
    status                  ENUM('pending','success','failed','refunded','partial_refund') NOT NULL DEFAULT 'pending',
    refund_amount           DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    refund_status           ENUM('none','pending','processed') NOT NULL DEFAULT 'none',
    refund_initiated_at     DATETIME,
    refund_processed_at     DATETIME,
    paid_at                 DATETIME,
    created_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (payment_id),
    INDEX idx_pay_patient (patient_id),
    INDEX idx_pay_status  (status),
    CONSTRAINT fk_pay_appointment FOREIGN KEY (appointment_id) REFERENCES appointments (appointment_id),
    CONSTRAINT fk_pay_patient     FOREIGN KEY (patient_id)     REFERENCES patients (patient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Itemized invoice lines per payment
CREATE TABLE invoices (
    invoice_id      INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    payment_id      INT UNSIGNED    NOT NULL,
    line_item       VARCHAR(300)    NOT NULL,
    amount          DECIMAL(10,2)   NOT NULL,
    PRIMARY KEY (invoice_id),
    CONSTRAINT fk_inv_payment FOREIGN KEY (payment_id) REFERENCES payments (payment_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Refund policies (per doctor / department level)
CREATE TABLE refund_policies (
    policy_id               INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    hospital_id             INT UNSIGNED    NOT NULL,
    doctor_id               INT UNSIGNED,                   -- NULL = hospital-wide policy
    cancel_hours_threshold  TINYINT UNSIGNED NOT NULL,      -- cancellation must be X hours before slot
    refund_percentage       TINYINT UNSIGNED NOT NULL,      -- 0–100
    created_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (policy_id),
    CONSTRAINT fk_policy_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals (hospital_id),
    CONSTRAINT fk_policy_doctor   FOREIGN KEY (doctor_id)   REFERENCES doctors (doctor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 11. NOTIFICATIONS
-- ============================================================

CREATE TABLE notification_templates (
    template_id     INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    hospital_id     INT UNSIGNED    NOT NULL,
    event_type      VARCHAR(80)     NOT NULL,   -- booking_confirmed, reminder_24h, cancelled, etc.
    channel         ENUM('email','sms','push') NOT NULL,
    subject         VARCHAR(300),               -- email only
    body            TEXT            NOT NULL,
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (template_id),
    CONSTRAINT fk_tmpl_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals (hospital_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE notification_logs (
    notification_id INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    recipient_id    INT UNSIGNED    NOT NULL,               -- user_id
    appointment_id  INT UNSIGNED,
    channel         ENUM('email','sms','push') NOT NULL,
    event_type      VARCHAR(80)     NOT NULL,
    status          ENUM('sent','failed','pending') NOT NULL DEFAULT 'pending',
    sent_at         DATETIME,
    error_message   VARCHAR(500),
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (notification_id),
    INDEX idx_notif_recipient (recipient_id),
    CONSTRAINT fk_notif_user        FOREIGN KEY (recipient_id)  REFERENCES users (user_id),
    CONSTRAINT fk_notif_appointment FOREIGN KEY (appointment_id) REFERENCES appointments (appointment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- User notification opt-out preferences
CREATE TABLE notification_preferences (
    pref_id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    user_id         INT UNSIGNED    NOT NULL,
    event_type      VARCHAR(80)     NOT NULL,
    channel         ENUM('email','sms','push') NOT NULL,
    is_enabled      TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (pref_id),
    UNIQUE KEY uq_pref (user_id, event_type, channel),
    CONSTRAINT fk_pref_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 12. REVIEWS & RATINGS
-- ============================================================

CREATE TABLE doctor_reviews (
    review_id       INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    appointment_id  INT UNSIGNED    NOT NULL UNIQUE,
    patient_id      INT UNSIGNED    NOT NULL,
    doctor_id       INT UNSIGNED    NOT NULL,
    rating          TINYINT UNSIGNED NOT NULL,              -- 1–5
    comment         TEXT,
    is_visible      TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (review_id),
    CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT fk_rev_appointment FOREIGN KEY (appointment_id) REFERENCES appointments (appointment_id),
    CONSTRAINT fk_rev_patient     FOREIGN KEY (patient_id)     REFERENCES patients (patient_id),
    CONSTRAINT fk_rev_doctor      FOREIGN KEY (doctor_id)      REFERENCES doctors (doctor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 13. WAITLIST
-- ============================================================

CREATE TABLE waitlist (
    waitlist_id     INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    patient_id      INT UNSIGNED    NOT NULL,
    doctor_id       INT UNSIGNED    NOT NULL,
    preferred_date  DATE            NOT NULL,
    preferred_type  ENUM('in_person','telemedicine','any') NOT NULL DEFAULT 'any',
    status          ENUM('waiting','converted','expired','cancelled') NOT NULL DEFAULT 'waiting',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (waitlist_id),
    CONSTRAINT fk_wl_patient FOREIGN KEY (patient_id) REFERENCES patients (patient_id),
    CONSTRAINT fk_wl_doctor  FOREIGN KEY (doctor_id)  REFERENCES doctors (doctor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 14. OTP VERIFICATION
-- ============================================================

CREATE TABLE otp_tokens (
    otp_id      INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    user_id     INT UNSIGNED    NOT NULL,
    purpose     ENUM('email_verify','phone_verify','password_reset','account_unlock','login_mfa') NOT NULL,
    channel     ENUM('email','sms') NOT NULL,
    token_hash  VARCHAR(255)    NOT NULL,
    expires_at  DATETIME        NOT NULL,
    used_at     DATETIME,
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (otp_id),
    INDEX idx_otp_user (user_id),
    CONSTRAINT fk_otp_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 15. HOSPITAL SETTINGS
-- ============================================================

CREATE TABLE hospital_settings (
    setting_id      INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    hospital_id     INT UNSIGNED    NOT NULL,
    setting_key     VARCHAR(100)    NOT NULL,
    setting_value   VARCHAR(500)    NOT NULL,
    updated_by      INT UNSIGNED    NOT NULL,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (setting_id),
    UNIQUE KEY uq_hospital_setting (hospital_id, setting_key),
    CONSTRAINT fk_setting_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals (hospital_id),
    CONSTRAINT fk_setting_user     FOREIGN KEY (updated_by)  REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Hospital public holidays
CREATE TABLE hospital_holidays (
    holiday_id      INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    hospital_id     INT UNSIGNED    NOT NULL,
    holiday_date    DATE            NOT NULL,
    description     VARCHAR(200),
    PRIMARY KEY (holiday_id),
    UNIQUE KEY uq_holiday (hospital_id, holiday_date),
    CONSTRAINT fk_holiday_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals (hospital_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 16. AUDIT LOG
-- ============================================================

CREATE TABLE audit_logs (
    log_id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id         INT UNSIGNED,
    role            VARCHAR(20),
    action          VARCHAR(100)    NOT NULL,
    target_entity   VARCHAR(80)     NOT NULL,
    target_id       VARCHAR(40),
    ip_address      VARCHAR(45),                            -- supports IPv6
    user_agent      VARCHAR(500),
    extra_data      JSON,
    logged_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (log_id),
    INDEX idx_audit_user   (user_id),
    INDEX idx_audit_entity (target_entity, target_id),
    INDEX idx_audit_time   (logged_at),
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- End of Schema
-- Tables: 28
-- Covers: FR-PAT, FR-DOC, FR-APT, FR-MGT, FR-NOT,
--         FR-EMR, FR-PAY, FR-TEL, FR-ADM + all NFRs
-- ============================================================
