ASSIGNMENT -
 
Features
Vehicle Management
Add Vehicle Using VIN:

Allows the addition of vehicles to the system by providing a valid VIN.
Integrates with an external VIN decoder (e.g., NHTSA API) to retrieve and store vehicle details.
Retrieve Vehicle Details:

Fetch detailed information about a vehicle using its VIN.
Organization Management
Create and Update Organizations:
Manage organizations with configurable policies, such as fuel reimbursement and speed limits.
Supports hierarchical management with policy propagation to child organizations.
Validation and Error Handling
Validation:

Ensures proper validation for VINs, organization details, and policies.
Error Handling:

Implements meaningful HTTP status codes and error messages to handle issues like invalid inputs or resource not found.

Database
MongoDB:
Utilizes MongoDB as the database for storing vehicle and organization data.
