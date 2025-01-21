import { useAuth } from "../auth/userAuth";
const UserProfile = () => {
    const {isAuthenticated, user} = useAuth();
    
    if(!isAuthenticated) {
        return <div>You are not logged in</div>;
    }
    return (
        <>
            <div>Welcome, {user?.email}</div>
        </>
    )
}
export default UserProfile;