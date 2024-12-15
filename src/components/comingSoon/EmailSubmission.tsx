import { useForm, ValidationError } from '@formspree/react';

function EmailSubmission() {
    const [state, handleSubmit] = useForm("xqakvkeb");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="py-2 px-4 bg-gray-800 text-white rounded-l-md focus:outline-none"
                required
            />
            <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
            />
            <button type="submit" disabled={state.submitting} className="bg-blue-500 py-2 px-4 text-white rounded-r-md hover:bg-blue-600 focus:outline-none">
                Submit
            </button>
        </form>
    );
}

export default EmailSubmission