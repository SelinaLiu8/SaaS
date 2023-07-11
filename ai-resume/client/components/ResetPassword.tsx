import { auth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function ResetPasswordButton({ user }) {
    // Function to send password reset email
    const resetPassword = async () => {
        if (user && user.email && user.providerData[0]?.providerId === 'password') {
            try {
                await sendPasswordResetEmail(auth, user.email);
                toast.success("Password reset email sent!");
            } catch (error) {
                toast.error("Error sending password reset email: " + error.message);
            }
        }
    }

    return (
        <>
            <button onClick={resetPassword}>Send Password Reset Email</button>
        </>
    );
}
