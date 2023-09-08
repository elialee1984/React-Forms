import { useState } from "react";

const SignUpForm = ({ setToken }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        error: null,
    });

    const handleSetFormData = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type as JSON
                },
                body: JSON.stringify({ // Convert the data to JSON format
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to sign up. Please try again."); // Handle non-successful responses
            }

            // If successful, you can reset the form and handle the successful signup as needed
            setFormData({
                username: '',
                password: '',
                error: null,
            });
            const result = await response.json()
            
            setToken(result.token);
            
            // You might also want to redirect the user or perform other actions on successful signup
            console.log(result)
        } catch (error) {
            // Handle network request errors or unsuccessful responses by setting the error message in state
            setFormData({
                ...formData,
                ["error"]: error.message,
            });
        }
    }

    return (
        <div>
            <h2>Sign Up!</h2>
            {formData.error && <p>{formData.error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Username: <input value={formData.username} onChange={handleSetFormData} type="text" id="username" name="username" /></label>
                <br></br>
                <label>Password: <input value={formData.password} onChange={handleSetFormData} type="text" id="password" name="password" /></label>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default SignUpForm;