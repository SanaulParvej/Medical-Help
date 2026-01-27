# 🏥 Medical Help – Role-Based Workflow

```mermaid
flowchart TD
    A[Open Website] --> B[Home Page Public View]

    B --> C[Browse Services Read Only]
    B --> D[Login Register]

    D --> E[Authentication]
    E --> F{Role Check}

    F -->|User| G[User Dashboard]
    F -->|Admin| H[Admin Dashboard]

    %% USER FLOW
    G --> U1[View Doctors]
    G --> U2[View Medical Services]
    G --> U3[View Ambulance Services]
    G --> U4[View Offers and Health Tips]
    G --> U5[Submit Service Request]

    U5 --> R1[Request Saved]
    R1 --> R2[Status Pending]

    %% ADMIN FLOW
    H --> A1[Add Edit Delete Doctors]
    H --> A2[Manage Services and Pricing]
    H --> A3[Manage Ambulance Routes]
    H --> A4[Manage Hospitals and Diagnostics]
    H --> A5[Publish Offers and Health Tips]
    H --> A6[Review User Requests]

    A6 --> A7{Decision}
    A7 -->|Approve| R3[Request Approved]
    A7 -->|Reject| R4[Request Rejected]

    %% DATA FLOW
    A1 --> DB[(PHP Backend MySQL)]
    A2 --> DB
    A3 --> DB
    A4 --> DB
    A5 --> DB
    A6 --> DB
    DB --> G




🧠 Simple Data Flow

Admin Action → PHP Backend → MySQL Database → User View (Read Only)
