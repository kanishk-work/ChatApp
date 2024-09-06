import React, { useState } from 'react';
import { authenticateUser } from '../Utils/logInUser';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [role, setRole] = useState<string>('');

    const userCredentials = {
        user_id: "2",
        client_email: "hr@wafer.ee",
        client_name: "Wafer",
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        profile_pic_url:
            "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-309.jpg",
    };

    const handleSubmit = () => {
        console.log("login page working")
        authenticateUser(userCredentials)
            .then(() => {
                console.log("User authenticated successfully.");
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
            });
        console.log({ email, firstName, lastName, role });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LoginPage;
