CREATE TABLE
    customers (
        Id INTEGER PRIMARY KEY,
        Version INTEGER NOT NULL DEFAULT 1,
        Name TEXT NOT NULL,
        Email TEXT NOT NULL
    )
CREATE TABLE
    projects (
        Id INTEGER PRIMARY KEY,
        Version INTEGER NOT NULL DEFAULT 1,
        CustomerId INTEGER NOT NULL REFERENCES customers (Id),
        Name TEXT NOT NULL
    )
CREATE TABLE
    service_types (
        Id INTEGER PRIMARY KEY,
        Version INTEGER NOT NULL DEFAULT 1,
        Name TEXT NOT NULL,
        RateCentsPerHour INTEGER NOT NULL CHECK (RateCentsPerHour >= 0)
    )
CREATE TABLE
    invoices (
        Id INTEGER PRIMARY KEY,
        Version INTEGER NOT NULL DEFAULT 1,
        CustomerId INTEGER NOT NULL REFERENCES customers (Id),
        ProjectId INTEGER NOT NULL REFERENCES projects (Id),
        IssuedOn TEXT NOT NULL,
        Status TEXT NOT NULL
    )
CREATE TABLE
    time_entries (
        Id INTEGER PRIMARY KEY,
        Version INTEGER NOT NULL DEFAULT 1,
        ProjectId INTEGER NOT NULL REFERENCES projects (Id),
        ServiceTypeId INTEGER NOT NULL REFERENCES service_types (Id),
        WorkDate TEXT NOT NULL,
        Minutes INTEGER NOT NULL CHECK (Minutes >= 0),
        Note TEXT NOT NULL,
        RateCentsPerHour INTEGER NOT NULL CHECK (RateCentsPerHour >= 0),
        InvoiceId INTEGER REFERENCES invoices (Id) DEFAULT NULL
    )
CREATE TABLE
    invoice_lines (
        Id INTEGER PRIMARY KEY,
        Version INTEGER NOT NULL DEFAULT 1,
        InvoiceId INTEGER NOT NULL REFERENCES invoices (Id),
        TimeEntryId INTEGER NOT NULL UNIQUE REFERENCES time_entries (Id),
        Description TEXT NOT NULL,
        Minutes INTEGER NOT NULL CHECK (Minutes >= 0),
        RateCentsPerHour INTEGER NOT NULL CHECK (RateCentsPerHour >= 0),
        AmountCents INTEGER NOT NULL CHECK (AmountCents >= 0)
    ) CREATE INDEX unbilled_by_project ON time_entries (ProjectId, InvoiceId, Id)