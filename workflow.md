# 🏥 Medical Help – Role-Based Workflow

```mermaid
flowchart TD
    A[Open Website] --> B[Home Page<br/>(Public View)]

    B --> C[Browse Services<br/>(Read Only)]
    B --> D[Login / Register]

    D --> E[Authentication]
    E --> F{Role Check}

    F -->|User| G[User Dashboard]
    F -->|Admin| H[Admin Dashboard]

    %% USER FLOW
    G --> U1[View Doctors]
    G --> U2[View Medical Services]
    G --> U3[View Ambulance Services]
    G --> U4[View Offers & Health Tips]
    G --> U5[Submit Service Request]

    U5 --> R1[Request Saved]
    R1 --> R2[Status: Pending]

    %% ADMIN FLOW
    H --> A1[Add / Edit / Delete Doctors]
    H --> A2[Manage Services & Pricing]
    H --> A3[Manage Ambulance Routes]
    H --> A4[Manage Hospitals & Diagnostics]
    H --> A5[Publish Offers & Health Tips]
    H --> A6[Review User Requests]

    A6 --> A7{Decision}
    A7 -->|Approve| R3[Request Approved]
    A7 -->|Reject| R4[Request Rejected]

    %% DATA FLOW
    A1 & A2 & A3 & A4 & A5 & A6 --> DB[(PHP Backend<br/>MySQL Database)]
    DB --> G




🔐 Access Control Logic

IF role == USER
 → View only
 → Submit request
 → No edit permission

IF role == ADMIN
 → Full CRUD access
 → Control all content


🧠 Simple Data Flow

Admin Action → PHP Backend → MySQL Database → User View (Read Only)
