export function getUserRoleWithID(id)
{
    switch(id)
    {
        case 1:
            return "staff";
        case 2:
            return "department-admin";
        case 3:
            return "super-admin";
        default:
            return "user";
    }
}

export function getUserRoleForSuperAdmin(id)
{
    switch(id)
    {
        case 1:
            return "Staff";
        case 2:
            return "Department Admin";
        case 3:
            return "Super Admin";
        default:
            return "Citizen";
    }
}