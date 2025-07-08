import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface VerifyEmailProps {
    verificationCode?: string;
    username?: string;
    supportEmail?: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://echo.example.com";

export const EchoVerifyEmail = ({
    verificationCode,
    username,
    supportEmail = "support@echo.com",
}: VerifyEmailProps) => {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>Complete your Echo account verification</Preview>
                <Container style={container}>
                    {/* Header with Logo */}
                    <Section style={header}>
                        <Img
                            src={`${baseUrl}/static/echo-logo.png`}
                            width="80"
                            height="80"
                            alt="Echo"
                            style={logo}
                        />
                        <Text style={brandName}>ECHO</Text>
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        <Heading style={h1}>Hi {username},</Heading>
                        <Text style={text}>
                            Thank you for joining Echo! To complete your account setup, please
                            verify your email address by entering this code in the app:
                        </Text>

                        {/* Verification Code Box */}
                        <Section style={codeContainer}>
                            <Text style={code}>{verificationCode}</Text>
                            <Text style={expiryText}>Expires in 10 minutes</Text>
                        </Section>

                        <Text style={text}>
                            {`If you didn't request this code, you can safely ignore this email.`}
                        </Text>

                        <Hr style={hr} />

                        {/* Support Section */}
                        <Section style={supportSection}>
                            <Text style={supportText}>Need help?</Text>
                            <Link href={`mailto:${supportEmail}`} style={supportLink}>
                                Contact our support team
                            </Link>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            © {new Date().getFullYear()} Echo Technologies, Inc.
                        </Text>
                        <Section style={footerLinks}>
                            <Link href={`${baseUrl}/privacy`} style={footerLink}>
                                Privacy Policy
                            </Link>
                            <Text style={footerSeparator}>•</Text>
                            <Link href={`${baseUrl}/terms`} style={footerLink}>
                                Terms of Service
                            </Link>
                            <Text style={footerSeparator}>•</Text>
                            <Link href={baseUrl} style={footerLink}>
                                Our Website
                            </Link>
                        </Section>
                        <Text style={footerAddress}>
                            123 Communication Way, San Francisco, CA 94107
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    margin: 0,
    padding: 0,
};

const container = {
    margin: "0 auto",
    padding: "20px",
    maxWidth: "600px",
};

const header = {
    textAlign: "center" as const,
    padding: "32px 0 24px",
};

const logo = {
    margin: "0 auto",
};

const brandName = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#3b82f6",
    margin: "16px 0 0",
    textAlign: "center" as const,
};

const content = {
    padding: "0 24px 24px",
};

const h1 = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1e293b",
    margin: "0 0 20px",
};

const text = {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#334155",
    margin: "0 0 20px",
};

const codeContainer = {
    background: "#f8fafc",
    borderRadius: "8px",
    margin: "24px 0",
    padding: "24px",
    textAlign: "center" as const,
};

const code = {
    fontSize: "42px",
    fontWeight: "bold",
    letterSpacing: "4px",
    color: "#3b82f6",
    margin: "0 0 8px",
};

const expiryText = {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
};

const hr = {
    borderColor: "#e2e8f0",
    margin: "24px 0",
};

const supportSection = {
    textAlign: "center" as const,
};

const supportText = {
    ...text,
    margin: "0 0 8px",
};

const supportLink = {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "bold",
};

const footer = {
    padding: "24px 0",
    textAlign: "center" as const,
};

const footerText = {
    fontSize: "14px",
    color: "#64748b",
    margin: "0 0 8px",
};

const footerLinks = {
    display: "flex",
    justifyContent: "center",
    margin: "0 0 8px",
};

const footerLink = {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "14px",
};

const footerSeparator = {
    color: "#cbd5e1",
    margin: "0 8px",
};

const footerAddress = {
    fontSize: "12px",
    color: "#94a3b8",
    margin: 0,
};

export default EchoVerifyEmail;
