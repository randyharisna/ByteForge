import * as React from 'react';

interface EmailTemplateProps {
  confirmationLink: string;
}

export const EmailTemplateVerification: React.FC<Readonly<EmailTemplateProps>> = ({
  confirmationLink,
}) => (
  <div>
    <p>Click, <a href={confirmationLink}>here</a> to verify your email</p>
  </div>
);
