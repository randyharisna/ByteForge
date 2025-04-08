"use client"
import { newVerification } from "@/action/new-verification";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { EmailTemplateVerification } from "../email/email-verification";

const VerifyEmailForm = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [isClient, setIsClient] = useState(false);  // To track if we are in the client
    const SearchParams = useSearchParams();
    const token = SearchParams.get("token");

    const onSubmit = useCallback(() => {
        if(success || error){
            return;
        }
        if(!token){
            setError("No token provided");
            return;
        }
        newVerification(token).then((data) => {
            if(data.success){
                setSuccess(data.success);
            }else{
                setError(data.error);
            }
        }).catch((error) => {
            console.error(error)
            setError("An unexpected error occurred. Please try again later.")
        })
    }, [token, success, error]);

    useEffect(() => {
        setIsClient(true); // Set isClient to true when component is mounted on the client
    }, []);

    useEffect(() => {
        if (token && isClient) {
            onSubmit()
        }
    }, [token, isClient]);

    // Check if we are in the client before accessing window
    const confirmationLink = isClient && token ? `${window.location.origin}/verify-email?token=${token}` : '';

    // If success, display success message
    if (success) {
        return <div>{success}</div>;
    }
    
    // If error, display error message
    if (error) {
        return <div>{error}</div>;
    }

    return(
        <div>
            {/* Use the EmailTemplateVerification component to display the confirmation link */}
            {token && (
                <EmailTemplateVerification confirmationLink={confirmationLink} />
            )}
            <div className="flex items-center w-full justify-center">
                {!success && !error && <p>Loading</p>}
                {!success && !error && <p>Loading</p>}
            </div>
        </div>
    );
};

export default VerifyEmailForm;
