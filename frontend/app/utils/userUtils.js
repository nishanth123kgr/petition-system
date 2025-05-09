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