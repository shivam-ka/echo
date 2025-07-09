import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
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
                    {/* Header with Text Logo */}
                    <Section style={header}>
                        <Text style={brandName}>ECHO</Text>
                        <Text style={tagline}>Where connections resonate</Text>
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        <Heading style={h1}>Hi {username},</Heading>
                        <Text style={text}>
                           {` Welcome to Echo! We're excited to have you on board. To complete your 
                            account setup, please verify your email address using this code:`}
                        </Text>

                        {/* Verification Code Box */}
                        <Section style={codeContainer}>
                            <Text style={code}>{verificationCode}</Text>
                            <Text style={expiryText}>This code expires in 60 minutes</Text>
                        </Section>

                        <Text style={text}>
                            Simply enter this code in the verification screen of the Echo app.
                        </Text>

                        <Text style={textLight}>
                           {` If you didn't request this code, please ignore this email or contact 
                            our support team if you have any concerns.`}
                        </Text>

                        <Hr style={hr} />

                        {/* Support Section */}
                        <Section style={supportSection}>
                            <Text style={supportText}>Need help or have questions?</Text>
                            <Link href={`mailto:${supportEmail}`} style={supportLink}>
                                Contact our support team
                            </Link>
                            <Text style={supportTextSmall}>{`We're here to help!`}</Text>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Hr style={footerHr} />
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
                        <Text style={footerText}>
                            © {new Date().getFullYear()} Echo, Inc.<br />
                            All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: "#f9f9f9",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: 0,
};

const container = {
    margin: "30px auto",
    padding: "40px",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
};

const header = {
    textAlign: "center" as const,
    padding: "0 0 24px",
    marginBottom: "24px",
};

const brandName = {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0 0 8px",
    letterSpacing: "1px",
};

const tagline = {
    fontSize: "16px",
    color: "#666",
    margin: "0",
    fontWeight: "400",
};

const content = {
    padding: "0",
};

const h1 = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0 0 24px",
};

const text = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#333",
    margin: "0 0 24px",
};

const textLight = {
    ...text,
    color: "#666",
    fontSize: "15px",
};

const codeContainer = {
    background: "#f5f7ff",
    borderRadius: "8px",
    margin: "32px 0",
    padding: "32px 24px",
    textAlign: "center" as const,
    border: "1px solid #e0e5ff",
};

const code = {
    fontSize: "42px",
    fontWeight: "700",
    letterSpacing: "6px",
    color: "#3a5eff",
    margin: "0 0 12px",
    fontFamily: "'Courier New', Courier, monospace",
};

const expiryText = {
    fontSize: "14px",
    color: "#666",
    margin: 0,
    fontStyle: "italic",
};

const hr = {
    borderColor: "#eaeaea",
    borderWidth: "1px",
    margin: "32px 0",
};

const supportSection = {
    textAlign: "center" as const,
    margin: "32px 0 0",
};

const supportText = {
    ...text,
    margin: "0 0 12px",
    fontWeight: "500",
};

const supportTextSmall = {
    ...supportText,
    fontSize: "14px",
    margin: "12px 0 0",
};

const supportLink = {
    color: "#3a5eff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
};

const footer = {
    padding: "24px 0 0",
    textAlign: "center" as const,
};

const footerHr = {
    ...hr,
    margin: "0 0 24px",
};

const footerLinks = {
    display: "flex",
    margin: "0 0 20px",
};

const footerLink = {
    color: "#3a5eff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
};

const footerSeparator = {
    color: "#ccc",
    margin: "0 12px",
};

const footerText = {
    fontSize: "13px",
    color: "#999",
    margin: "8px 0 0",
    lineHeight: "20px",
};

export default EchoVerifyEmail;